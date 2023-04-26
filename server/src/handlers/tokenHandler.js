const jwt = require('jsonwebtoken');
function generatorAccessToken(user) {
    const accessToken = jwt.sign(
        {
            uid: user._id,
            role: user.role,
        },
        'haidangke',
        { expiresIn: '1d' }
    );
    return accessToken;
}

function generatorRefreshToken(user) {
    const refreshToken = jwt.sign(
        {
            uid: user._id,
            role: user.role,
        },
        'haidangke',
        { expiresIn: '7d' }
    );
    return refreshToken;
}

module.exports = { generatorAccessToken, generatorRefreshToken };
