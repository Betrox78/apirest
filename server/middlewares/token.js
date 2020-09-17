const jwt = require('jsonwebtoken');

const comprobarTocken = (req, res, next) => {
    let token = String(req.query.token);
    jwt.verify(token, process.env.SEED, (err, tokendecode) => {
        if(err) return res.status(200).send({ok:false, err});
        req.body.Usuario = tokendecode.Usuario;
        next();
    });
}


module.exports = {
    comprobarTocken,
}