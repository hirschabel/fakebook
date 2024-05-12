import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUserProfile extends Document {
    owner: mongoose.Types.ObjectId;
    description: string;
    profilePicture: any;
}

const UserProfileSchema: Schema<IUserProfile> = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: false },
    profilePicture: { type: Buffer, requred: false }
});

export const UserProfile: Model<IUserProfile> = mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
