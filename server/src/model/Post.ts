import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
    author: mongoose.Types.ObjectId;
    postHeader: string;
    postText: string;
    createdAt: Date;
}

const PostSchema: Schema<IPost> = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postHeader: { type: String, required: true },
    postText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Middleware to set createdAt field before saving
PostSchema.pre<IPost>('save', function(next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

export const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);
