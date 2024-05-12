"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var bcrypt_1 = require("bcrypt");
var SALT_FACTOR = 10;
var UserSchema = new mongoose_1["default"].Schema({
    email: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    nickname: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, "default": 'user' }
});
// hook
UserSchema.pre('save', function (next) {
    var user = this;
    // hash password
    bcrypt_1["default"].genSalt(SALT_FACTOR, function (error, salt) {
        if (error) {
            return next(error);
        }
        bcrypt_1["default"].hash(user.password, salt, function (err, encrypted) {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    var user = this;
    bcrypt_1["default"].compare(candidatePassword, user.password, function (error, isMatch) {
        if (error) {
            callback(error, false);
        }
        callback(null, isMatch);
    });
};
exports.User = mongoose_1["default"].model('User', UserSchema);
