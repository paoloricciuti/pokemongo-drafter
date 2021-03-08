export default (req, res) => {
    if(req.method!=="GET") res.sendStatus(404);
    req.getByLink(req.formatName(req.query.name), res);
};