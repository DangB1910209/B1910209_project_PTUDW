const jwt = require('jsonwebtoken')
const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.split(" ")[1];

        jwt.verify(accessToken, 'haidangke', (err, user) => {
            if (err)
                return res.status(403).json({
                    status: "failed",
                    msg: "Token is not valid !",
                });
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({
            status: "failed",
            msg: "you are not authenticated !",
        });
    }
};

module.exports = verifyToken;
