const { hashSync, genSaltSync, compareSync } = require("bcrypt");

const Secretpasword = (req, res, next) => {
    const body = req.body;
    const salt = genSaltSync(10);
    if(err) return res.status(200).send({ok:false, err});
    body.password = hashSync(body.password, salt);
        next();
}

module.exports = {
    Secretpasword,
}