import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
    post: mongoose.Types.ObjectId; // Reference to the post the comment belongs to
    author: mongoose.Types.ObjectId;
    commentText: string;
    createdAt: Date;
}


const CommentSchema: Schema<IComment> = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Reference to the Post model
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);
