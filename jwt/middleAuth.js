const jwtHelper = require('./jwt');

const middleAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ err: 'нету токена' });
    }

    jwtHelper.checkToken(token, (err, dec) => {
        if (err) {
            return res.status(401).json({ err: 'токен не рабочий' });
        }
        req.userId = dec.userId;
        next();
    });
};

module.exports = middleAuth;