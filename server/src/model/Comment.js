"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1["default"].Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post', required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, "default": Date.now }
});
exports.Comment = mongoose_1["default"].model('Comment', CommentSchema);
