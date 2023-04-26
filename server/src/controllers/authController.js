const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { generatorAccessToken, generatorRefreshToken } = require('../handlers/tokenHandler');
const UserModel = require('../models/userModel');

const authController = {
    //Register
    register: (async (req, res) => {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({
                status: 'failed',
                msg: 'Thông tin tài khoản không hợp lệ',
            });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //Create user
        const existingUser = await UserModel.findOne({ email });

        if (existingUser)
            return res.status(400).json({
                status: 'failed',
                msg: 'Email này đã được sử dụng',
            });

        await UserModel.create({
            email,
            password: hashPassword,
        });

        res.status(200).json({
            status: 'success',
            msg: 'Đăng kí tài khoản thành công',
        });
    }),

    //Login
    login: (async (req, res) => {
        const { password, email } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const comparePassword = await bcrypt.compare(password, user.password);

            if (comparePassword) {
                const accessToken = generatorAccessToken(user);
                const refreshToken = generatorRefreshToken(user);

                await UserModel.findOneAndUpdate(
                    { _id: user._id },
                    { $push: { refreshTokens: refreshToken } },
                    { new: true }
                );

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict',
                    secure: false,
                    maxAge: 90000,
                });

                return res.status(200).json({
                    status: 'sucess',
                    msg: 'logged in successfully !',
                    data: { accessToken, email },
                });
            } else {
                //mật khẩu sai
                return res.status(401).json({
                    status: 'failed',
                    msg: 'Email hoặc mật khẩu không chính xác.',
                });
            }
        } else {
            // không có tài khoản
            return res.status(401).json({
                status: 'failed',
                msg: 'Email này chưa đăng kí tài khoản.',
            });
        }
    }),

    logout: (async (req, res) => {
        // const uid = req.user.uid;
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) return res.status(403).json({ status: 'failed', msg: 'refresh token is not valid !' });
        try {
            const { uid } = jwt.verify(refreshToken, 'haidangke');

            res.clearCookie('refreshToken');
            await UserModel.findOneAndUpdate(
                { _id: uid },
                { $pull: { refreshToken: refreshToken }, $unset: { deviceToken: 1 } },
                { new: true }
            );
            res.status(200).json({ status: 'success', msg: 'logged out !' });
        } catch (error) {
            return res.status(403).json({ status: 'failed', msg: 'refresh token is not valid !' });
        }
    }),

};

module.exports = authController;
