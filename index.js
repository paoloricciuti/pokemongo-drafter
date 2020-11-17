const express=require("express");
const mysql=require("mysql");
const path = require('path');
const dotenv=require("dotenv");
const crypto=require("crypto");

dotenv.config();

const app=express();
const port = process.env.PORT || 3000;

const db= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Mysql connected...");
})

const getById= (id, res) => {
    db.query(`SELECT * FROM rooms WHERE id=?`, id, (err, result) =>{
        if(err){
            throw err;
        }
        if(result.length==1){
            res.json(result.pop());
        }else{
            res.sendStatus(404);
        }
    });
}

const getByLink= (link, res) => {
    db.query(`SELECT * FROM rooms WHERE link=?`, link, (err, result) =>{
        if(err){
            throw err;
        }
        if(result.length==1){
            res.json(result.pop());
        }else{
            res.sendStatus(404);
        }
    });
}

const sha256= (value) => {
    return crypto.createHash('sha256').update(value).digest('base64')
}

const formatName = (name) => {
    return name.toLowerCase().replace(/\s/g,"-");
}

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.get("/api/rooms", (req, res)=>{
    db.query("SELECT * FROM rooms", (err, result) =>{
        if(err){
            throw err;
        }
        res.json(result);
    });
});
//GET a specific room
app.get("/api/rooms/:name", (req, res)=>{
    getByLink(formatName(req.params.name), res);
});
//POST to validate a room password
app.post("/api/validate",(req, res)=>{
    let {name, password} = req.body;
    db.query(`SELECT * FROM rooms WHERE name='${formatName(name)}' AND password='${sha256(password)}'`, (err, result)=>{
        if(err){
            res.json({
                ok: false,
                error: "Duplicate entry"
            });
            return;
        }
        if(result.length==1){
            res.json(result[0]);
        }
    })
});
//POST to create a room
app.post("/api/rooms", (req, res)=>{
    let {name, password} = req.body;
    if(name && password){
        let newRoom={
            name,
            link: formatName(name),
            password: sha256(password)
        };
        db.query("INSERT INTO rooms SET ?", newRoom, (err, result) => {
            if(err){
                res.json({
                    ok: false,
                    error: "Duplicate entry"
                });
                return;
            }
            getById(result.insertId, res);
        });
    }else{
        res.sendStatus(400)
    }
});
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(port, () => console.log("Server is running..."));