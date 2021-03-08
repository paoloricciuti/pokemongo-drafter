export default (req, res) => {
    if (req.method === "GET") {
        req.db.query("SELECT * FROM rooms", (err, result) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
            res.json(result);
        });
    } else if (req.method === "POST") {
        let { name, password } = req.body;
        if (name && password) {
            let newRoom = {
                name,
                link: req.formatName(name),
                password: req.sha256(password)
            };
            req.db.query("INSERT INTO rooms SET ?", newRoom, (err, result) => {
                if (err) {
                    res.json({
                        ok: false,
                        error: "Duplicate entry"
                    });
                    return;
                }
                req.getById(result.insertId, res);
            });
        } else {
            res.sendStatus(400)
        }
    }else{
        res.sendStatus(404);
    }
}
