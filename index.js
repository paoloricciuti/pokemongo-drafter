const express = require("express");
const mysql = require("mysql");
const path = require('path');
const dotenv = require("dotenv");
const crypto = require("crypto");
const httpServer = require("http");
const socketio = require("socket.io");
const { DH_UNABLE_TO_CHECK_GENERATOR } = require("constants");
dotenv.config();

let db;
const app = express();
const http = httpServer.createServer(app);
const io = socketio(http);

const port = process.env.PORT || 3000;
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
const handleDisconnect = () => {
    db = mysql.createConnection(dbConfig);
    db.connect((err) => {
        if (err) {
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log("Mysql connected...");
        }
    });
    db.on('error', (err) => {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();





const getById = (id, res) => {
    db.query(`SELECT * FROM rooms WHERE id=?`, id, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length == 1) {
            res.json(result.pop());
        } else {
            res.sendStatus(404);
        }
    });
}

const getByLink = (link, res) => {
    db.query(`SELECT * FROM rooms WHERE link=?`, link, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length == 1) {
            res.json(result.pop());
        } else {
            res.sendStatus(404);
        }
    });
}

const sha256 = (value) => {
    return crypto.createHash('sha256').update(value).digest('base64')
}

const formatName = (name) => {
    return name.toLowerCase().replace(/\s/g, "-");
}

const emitRoom = (room_link) => {
    db.query(`SELECT rooms.name, joined.username, joined.online FROM rooms LEFT JOIN joined ON rooms.link=joined.room_link WHERE link=?`, room_link, (err, result) => {
        if (err) {
            throw err;
        }
        let room = {
            name: result[0].name,
            link: room_link,
            players: []
        };
        for (let joined of result) {
            room.players.push({
                username: joined.username,
                online: joined.online
            })
        }
        io.to(room_link).emit("updateRoom", room);
    });
}

let connectedClients=[];

io.on("connection", (socket) => {
    connectedClients.push(socket);
    socket.on("joinRoom", (joinData) => {
        let joined = {
            username: joinData.username,
            password: sha256(joinData.password),
            room_link: joinData.room,
            online: true
        }
        db.query("SELECT * FROM joined WHERE room_link=? AND username=?", [joined.room_link, joined.username], (err, result) => {
            if (!err) {
                if (result.length == 1) {
                    if (result[0].password == joined.password) {
                        db.query("UPDATE joined SET online=1 WHERE room_link=? AND username=?", [joined.room_link, joined.username], (err, results) => {
                            if (!err) {
                                socket.room_link=joined.room_link;
                                socket.username=joined.username;
                                socket.join(joinData.room);
                                emitRoom(joinData.room);
                            }
                        });
                    } else {
                        socket.emit("wrongPassword", true);
                    }
                } else {
                    db.query("INSERT INTO joined SET ?", joined, (err, results) => {
                        if (!err) {
                            socket.room_link=joined.room_link;
                            socket.username=joined.username;        
                            socket.join(joinData.room);
                            emitRoom(joinData.room);
                        }
                    });
                }
            }
        });

    });
    socket.on('disconnect', () => {
        let room=socket.room_link;
        db.query("UPDATE joined SET online=0 WHERE room_link=? AND username=?", [socket.room_link, socket.username], (err, results) => {
            if (!err) {
                let i= connectedClients.indexOf(socket);
                connectedClients.splice(i, 1);
                emitRoom(room);
            }
        });
    });
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.get("/api/rooms", (req, res) => {
    db.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
//GET a specific room
app.get("/api/rooms/:name", (req, res) => {
    getByLink(formatName(req.params.name), res);
});
//POST to validate a room password
app.post("/api/validate", (req, res) => {
    let { name, password } = req.body;
    db.query(`SELECT * FROM rooms WHERE name='${formatName(name)}' AND password='${sha256(password)}'`, (err, result) => {
        if (err) {
            res.json({
                ok: false,
                error: "Duplicate entry"
            });
            return;
        }
        if (result.length == 1) {
            res.json(result[0]);
        }
    })
});
//POST to create a room
app.post("/api/rooms", (req, res) => {
    let { name, password } = req.body;
    if (name && password) {
        let newRoom = {
            name,
            link: formatName(name),
            password: sha256(password)
        };
        db.query("INSERT INTO rooms SET ?", newRoom, (err, result) => {
            if (err) {
                res.json({
                    ok: false,
                    error: "Duplicate entry"
                });
                return;
            }
            getById(result.insertId, res);
        });
    } else {
        res.sendStatus(400)
    }
});
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
http.listen(port, () => console.log("Server is running..."));