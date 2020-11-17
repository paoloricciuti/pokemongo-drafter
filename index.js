const express=require("express");
const mysql=require("mysql");
const path = require('path');
const dotenv=require("dotenv");

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

app.use(express.static(path.join(__dirname, 'client/build')));
app.get("/rooms", (req, res)=>{
    db.query("SELECT * FROM rooms", (err, result) =>{
        if(err){
            throw err;
        }
        res.json(result);
    });
})
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen(port, () => console.log("Server is running..."));