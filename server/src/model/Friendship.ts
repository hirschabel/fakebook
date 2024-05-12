import mongoose, { Document, Model, Schema } from 'mongoose';

interface IFriendship extends Document {
    user1: Schema.Types.ObjectId; // Az első felhasználó azonosítója
    user2: Schema.Types.ObjectId; // A második felhasználó azonosítója
}

const FriendshipSchema: Schema<IFriendship> = new mongoose.Schema({
    user1: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Friendship: Model<IFriendship> = mongoose.model<IFriendship>('Friendship', FriendshipSchema);