"use strict";
exports.__esModule = true;
exports.Friendship = void 0;
var mongoose_1 = require("mongoose");
var FriendshipSchema = new mongoose_1["default"].Schema({
    user1: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.Friendship = mongoose_1["default"].model('Friendship', FriendshipSchema);
