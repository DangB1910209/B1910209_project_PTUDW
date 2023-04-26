const { model, Schema } = require('mongoose');


const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
        },
        refreshTokens: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true }
);


const UserModel = model('User', UserSchema);
module.exports = UserModel;
