const express = require("express");
const fetch = require('node-fetch');
const path = require('path');
const httpServer = require("http");
const crypto = require("crypto");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const md = require('markdown-it')({
    linkify: true
});
const next = require("next");

const app = express();
const port = process.env.PORT || 3000;
const http = httpServer.createServer(app);
const io = new Server(http, {
    cors: {
        origin: "https://admin.socket.io",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

const dev = process.env.NODE_ENV != "production";

const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const db = require('./models');



nextApp.prepare().then(() => {
    console.log("Next ready...");
    const getById = async (id, res) => {
        const { rooms } = db;
        try {
            const room = await rooms.findOne({
                where: {
                    id,
                }
            });
            if (room) {
                res.json(room);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(400);
        }
    }

    const getByLink = (link, res) => {
        const { rooms } = db;
        try {
            const room = await rooms.findOne({
                where: {
                    link,
                }
            });
            if (room) {
                res.json(room);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(400);
        }
    }

    const sha256 = (value) => {
        return crypto.createHash('sha256').update(value).digest('base64')
    }

    const formatName = (name) => {
        return name.toLowerCase().replace(/\s/g, "-");
    }

    const emitChat = async (room_link) => {
        console.log("Emitting chat " + room_link);
        if (!room_link) {
            return;
        }
        const { chats } = db;
        try {
            const result = await chats.findAll({
                where: {
                    room_link,
                },
            });
            let chat = [];
            for (let msg of result) {
                let date = new Date(msg.timestamp);
                chat.push({
                    author: msg.username,
                    msg: msg.msg,
                    eta: msg.timestamp
                })
            }
            io.to(room_link).emit("updateChat", chat);
        } catch (e) { }
    }

    const emitRoom = async (room_link) => {
        console.log("Emitting " + room_link);
        if (!room_link) {
            return;
        }
        const { rooms, joined, pick, Sequelize } = db;
        const result = await rooms.findOne({
            where: {
                link: room_link,
            },
            include: [
                {
                    model: joined,
                },
                {
                    model: pick,
                    where: {
                        username: Sequelize.col("joined.username"),
                    }
                }
            ]
        });
        let room = {
            name: result.name,
            link: room_link,
            choosing: result.choosing,
            started: result.started,
            league: result.league,
            ban_rounds: [...result.ban_rounds].map(elem => elem === "1"),
            players: [],
        };
        for (let picks of result.pick) {
            let player = room.players.find(elem => elem.username == picks.username);
            if (player) {
                player.team.push({
                    pick: picks.pick,
                    pick_id: picks.pick_id,
                    id: picks.id
                });
            } else {
                let baseTeam = [];
                if (picks.pick) {
                    baseTeam.push({
                        pick: picks.pick,
                        pick_id: picks.pick_id,
                        id: picks.id
                    });
                }
                room.players.push({
                    username: picks.username,
                    online: picks.online,
                    host: picks.host,
                    pick_order: picks.pick_order,
                    team: baseTeam
                })
            }
        }
        db.query(`SELECT rooms.name, rooms.choosing, rooms.ban_rounds, rooms.league, rooms.started, joined.username, joined.online, joined.pick_order, joined.host, pick.pick, pick.pick_id, pick.id  FROM rooms LEFT JOIN joined ON rooms.link=joined.room_link LEFT JOIN pick ON pick.room_link=rooms.link AND pick.username=joined.username WHERE link=?`, room_link, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            let room = {
                name: result[0].name,
                link: room_link,
                choosing: result[0].choosing,
                started: result[0].started,
                league: result[0].league,
                ban_rounds: [...result[0].ban_rounds].map(elem => elem === "1"),
                players: []
            };
            for (let picks of result) {
                let player = room.players.find(elem => elem.username == picks.username);
                if (player) {
                    player.team.push({
                        pick: picks.pick,
                        pick_id: picks.pick_id,
                        id: picks.id
                    });
                } else {
                    let baseTeam = [];
                    if (picks.pick) {
                        baseTeam.push({
                            pick: picks.pick,
                            pick_id: picks.pick_id,
                            id: picks.id
                        });
                    }
                    room.players.push({
                        username: picks.username,
                        online: picks.online,
                        host: picks.host,
                        pick_order: picks.pick_order,
                        team: baseTeam
                    })
                }
            }
            room.choosed_list = room.players.flatMap(elem => elem.team).map(elem => elem.pick_id);
            room.players.sort((a, b) => a.pick_order - b.pick_order);
            io.to(room_link).emit("updateRoom", room);
        });
    }

    let connectedClients = [];

    io.on("connection", async (socket) => {
        connectedClients.push(socket);
        const { joined: joinedTable, rooms: roomsTable, pick: pickTable, chats: chatTable } = db;
        socket.on("joinRoom", async (joinData) => {
            let joined = {
                username: joinData.username,
                password: sha256(joinData.password),
                room_link: joinData.room,
                online: true
            }
            try {
                const joinedUser = await joinedTable.findOne({
                    where: {
                        room_link: joined.room_link,
                        username: joined.username
                    }
                });
                if (joinedUser) {
                    if (joinedUser.password == joined.password) {
                        try {
                            await joinedTable.update({ online: 1 }, {
                                where: {
                                    room_link: joined.room_link,
                                    username: joined.username
                                }
                            });
                            socket.room_link = joined.room_link;
                            socket.username = joined.username;
                            socket.join(joinData.room);
                            emitRoom(joinData.room);
                            emitChat(joinData.room);
                        } catch (e) { }
                    } else {
                        socket.emit("error", "Wrong password");
                    }
                } else {
                    try {
                        const selRoom = await roomsTable.findOne({
                            where: {
                                link: joined.room_link,
                            }
                        });
                        if (selRoom && selRoom.started === 0) {
                            joined.host = selRoom.registered === 0;
                            await selRoom.increment("registered");
                            try {
                                await joinedTable.create(joined);
                                socket.room_link = joined.room_link;
                                socket.username = joined.username;
                                socket.join(joinData.room);
                                emitRoom(joinData.room);
                                emitChat(joinData.room);
                            } catch (e) { }
                        } else {
                            socket.emit("error", "The draft is already started");
                        }
                    } catch (e) { }
                }
            } catch (e) { }
        });
        socket.on("substitute", async pickMsg => {
            try {
                await pickTable.update({ pick: pickMsg.pick, pick_id: pickMsg.pick_id }, {
                    where: {
                        id: pickMsg.id,
                    }
                });
                emitRoom(pickMsg.room_link);
            } catch (e) { }
        })
        socket.on("joinRoomSpec", (joinData) => {
            socket.join(joinData.room);
            emitRoom(joinData.room);
        });
        socket.on("pick", async (pickMsg) => {
            try {
                const results = await roomsTable.findOne({
                    where: {
                        link: pickMsg.room_link,
                    },
                    include: [{
                        model: pickTable,
                    },
                    {
                        model: joinedTable
                    }],
                });
                if (results) {
                    if (pickMsg.substitute === true || results.choosing === pickMsg.chooser.pick_order) {
                        let already_taken = results.pick.map(row => row.pick_id);
                        if (pickMsg.substitute === true || already_taken.indexOf(pickMsg.pick_id) == -1) {
                            let newPick = {
                                room_link: pickMsg.room_link,
                                username: pickMsg.chooser.username,
                                pick: pickMsg.pick,
                                pick_id: pickMsg.pick_id
                            };
                            await pickTable.create(newPick);
                            let flow = results.flow;
                            let next = results.choosing + flow;
                            let registered = results.registered;
                            if (flow == 1) {
                                if (next >= registered) {
                                    next = next - 1;
                                    flow = -1;
                                }
                            } else {
                                if (next < 0) {
                                    next = 0;
                                    flow = 1;
                                }
                            }
                            await roomsTable.update({
                                flow,
                                choosing: next,
                            }, {
                                where: {
                                    link: pickMsg.room_link,
                                }
                            });
                            emitRoom(pickMsg.room_link);
                        }
                    }
                }
            } catch (e) { }
        });
        socket.on("startDraft", async ({ room_link, bans, league }) => {
            try {
                const joinedPersons = await joinedTable.findAll({
                    where: {
                        room_link,
                    }
                });
                if (joinedPersons) {
                    const randomIds = [...Array(joinedPersons.length).keys()]
                    randomIds.sort(() => Math.random() - .5);
                    for (let user of joinedPersons) {
                        user.pick_order = randomIds.pop();
                    }
                    joinedTable.bulkCreate(joinedPersons, { updateOnDuplicate: ["pick_order"] });
                    await roomsTable.update({
                        started: 1,
                        rounds: bans.length,
                        ban_rounds: bans.reduce((val, turn) => val + (turn ? "1" : "0"), ""),
                        league,
                    }, {
                        where: {
                            link: room_link,
                        }
                    });
                    emitRoom(room_link);
                }
            } catch (e) { }
        })
        socket.on("chatMsg", async (chatMsg) => {
            try {
                await chatTable.create(chatMsg);
                emitChat(chatMsg.room_link);
            } catch (e) { }
        })
        socket.on('disconnect', async () => {
            let room = socket.room_link;
            if (room) {
                await joinedTable.update({
                    online: 0,
                }, {
                    where: {
                        room_link: socket.room_link,
                        username: socket.username,
                    }
                });
                let i = connectedClients.indexOf(socket);
                connectedClients.splice(i, 1);
                emitRoom(room);
            }
        });

    });


    app.get("*", (req, res) => {
        req.db = db;
        req.formatName = formatName;
        req.sha256 = sha256;
        req.getByLink = getByLink;
        req.getById = getById;
        return nextHandler(req, res);
    })
    app.post("*", (req, res) => {
        req.db = db;
        req.formatName = formatName;
        req.sha256 = sha256;
        req.getByLink = getByLink;
        req.getById = getById;
        return nextHandler(req, res);
    })
    http.listen(port, () => console.log("Server is running..."));
})

instrument(io, {
    auth: {
        type: "basic",
        username: process.env.SOCKET_IO_USERNAME,
        password: process.env.SOCKET_IO_PASSWORD
    },
});
