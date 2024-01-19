const jwt = require('jsonwebtoken')
const secretKey = "v87d8rve985454i@!!$#3fdhAADgr65hbb"

const generationToken = (userId) => {
    return jwt.sign({userId}, secretKey,{expiresIn:'24h'});
}
const checkToken = (token,cb) => {
    jwt.verify(token, secretKey,(err,dec) => {
        cb(err,dec);
    })
}


module.exports = {generationToken, checkToken};
