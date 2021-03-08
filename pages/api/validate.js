export default (req, res) => {
    if(req.method!=="POST") res.sendStatus(404);
    let { name, password } = req.body;
    req.db.query(`SELECT * FROM rooms WHERE name='${req.formatName(name)}' AND password='${req.sha256(password)}'`, (err, result) => {
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
}