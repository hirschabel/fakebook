"use strict";
exports.__esModule = true;
exports.Post = void 0;
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1["default"].Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    postHeader: { type: String, required: true },
    postText: { type: String, required: true },
    owner: { type: String, required: true },
    createdAt: { type: Date, "default": Date.now }
});
// Middleware to set createdAt field before saving
PostSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});
exports.Post = mongoose_1["default"].model('Post', PostSchema);
