const express = require("express");
const fetch = require('node-fetch');
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
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            console.error(err);
        }
    });
}

handleDisconnect();





const getById = (id, res) => {
    db.query(`SELECT * FROM rooms WHERE id=?`, id, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(400);
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
            console.error(err);
            res.sendStatus(400);
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
    console.log("Emitting " + room_link);
    if (!room_link) {
        return;
    }
    db.query(`SELECT rooms.name, rooms.choosing, rooms.started, joined.username, joined.online, joined.pick_order, pick.pick, pick.pick_id  FROM rooms LEFT JOIN joined ON rooms.link=joined.room_link LEFT JOIN pick ON pick.room_link=rooms.link AND pick.username=joined.username WHERE link=?`, room_link, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        let room = {
            name: result[0].name,
            link: room_link,
            choosing: result[0].choosing,
            started: result[0].started,
            players: []
        };
        for (let picks of result) {
            let player = room.players.find(elem => elem.username == picks.username);
            if (player) {
                player.team.push({
                    pick: picks.pick,
                    pick_id: picks.pick_id
                });
            } else {
                let baseTeam = [];
                if (picks.pick) {
                    baseTeam.push({
                        pick: picks.pick,
                        pick_id: picks.pick_id
                    });
                }
                room.players.push({
                    username: picks.username,
                    online: picks.online,
                    pick_order: picks.pick_order,
                    team: baseTeam
                })
            }
        }
        room.choosed_list=room.players.flatMap(elem=>elem.team).map(elem=>elem.pick_id);
        room.players.sort((a,b) => a.pick_order-b.pick_order);
        io.to(room_link).emit("updateRoom", room);
    });
}

let connectedClients = [];

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
                                socket.room_link = joined.room_link;
                                socket.username = joined.username;
                                socket.join(joinData.room);
                                emitRoom(joinData.room);
                            }
                        });
                    } else {
                        socket.emit("error", "Wrong password");
                    }
                } else {
                    db.query("SELECT started, registered FROM rooms WHERE link=?", joined.room_link, (errStarted, resultStarted) => {
                        if (!err) {
                            if (resultStarted.length == 1) {
                                if (resultStarted[0].started == 0) {
                                    db.query("UPDATE rooms SET registered=registered+1 WHERE link=?", joined.room_link, (updateErr, _) => {
                                        if(!updateErr){
                                            db.query("INSERT INTO joined SET ?", joined, (err, results) => {
                                                if (!err) {
                                                    socket.room_link = joined.room_link;
                                                    socket.username = joined.username;
                                                    socket.join(joinData.room);
                                                    emitRoom(joinData.room);
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    socket.emit("error", "The draft is already started");
                                }
                            }
                        }
                    });
                }
            }
        });

    });
    socket.on("pick", (pickMsg)=>{
        db.query("SELECT rooms.name, rooms.choosing, rooms.registered, rooms.flow, joined.username, joined.online, joined.pick_order, pick.pick, pick.pick_id  FROM rooms LEFT JOIN joined ON rooms.link=joined.room_link LEFT JOIN pick ON pick.room_link=rooms.link AND pick.username=joined.username WHERE link=?", pickMsg.room_link, (err, results)=>{
            if(!err){
                if(results.length>0){
                    if(results[0].choosing==pickMsg.chooser.pick_order){
                        let already_taken=results.map(row => row.pick_id);
                        if(already_taken.indexOf(pickMsg.pick_id)==-1){
                            let newPick={
                                room_link: pickMsg.room_link,
                                username: pickMsg.chooser.username,
                                pick: pickMsg.pick,
                                pick_id: pickMsg.pick_id
                            };
                            db.query("INSERT INTO pick SET ?", newPick, (insertErr, _)=>{
                                if(!insertErr){
                                    let flow=results[0].flow;
                                    let next=results[0].choosing+flow;
                                    let registered=results[0].registered;
                                    if(flow==1){
                                        if(next>=registered){
                                            next=next-1;
                                            flow=-1;
                                        }
                                    }else{
                                        if(next<0){
                                            next=0;
                                            flow=1;
                                        }
                                    }
                                    db.query(`UPDATE rooms SET flow=?, choosing=? WHERE link=?`,[flow, next, pickMsg.room_link],(updateErr, __)=>{
                                        if(!updateErr){
                                            emitRoom(pickMsg.room_link);
                                        }else{
                                            //sendmessage error update
                                        }
                                    });
                                }else{
                                    //send message error insert
                                }
                            });
                        }else{
                            //send error pick already taken
                        }
                    }else{
                        //send error not your turn
                    }
                }
            }
        })
    });
    socket.on("startDraft", (room_link)=>{
        db.query("SELECT * FROM joined WHERE room_link=?", room_link, (err, result)=>{
            if(!err){
                if(result){
                    result.sort((a,b) => Math.random());
                    let i=0;
                    let promises=[];
                    for(let user of result){
                        promises.push(new Promise((resolve, reject)=>{
                            db.query("UPDATE joined SET pick_order=? WHERE id=?",[i, user.id],(errUp, _)=>{
                                if(err){
                                    reject(errUp);
                                }else{
                                    resolve(_);
                                }
                            })
                        }));
                        i++;
                    }
                    Promise.all(promises).then(()=>{
                        db.query("UPDATE rooms SET started=1 WHERE link=?", room_link, (errStart, _)=>{
                            if(!errStart){
                                emitRoom(room_link);
                            }else{
                                //send error start
                            }
                        });
                    });
                }
            }
        });
    })
    socket.on('disconnect', () => {
        let room = socket.room_link;
        db.query("UPDATE joined SET online=0 WHERE room_link=? AND username=?", [socket.room_link, socket.username], (err, results) => {
            if (!err) {
                let i = connectedClients.indexOf(socket);
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
            console.error(err);
            res.sendStatus(400);
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
app.get("/api/rankings/:league", (req, res) => {
    let { league } = req.params;
    fetch(`https://pvpoke.com/data/rankings/all/overall/rankings-${league}.json`)
    .then(response => response.json())
    .then(data => res.json(data.filter(elem=>elem.speciesId.indexOf("_shadow")==-1)));
});
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
http.listen(port, () => console.log("Server is running..."));