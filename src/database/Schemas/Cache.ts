import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ICache {
     createdAt: Date;
     codeId: string;
     discordId: string;
}

const Cache = new Schema<ICache>({
     createdAt: { type: Date, expires: 1210000, default: Date.now() },
     codeId: { type: String, required: true },
     discordId: { type: String, required: true },
});

export const CacheModel = mongoose.model<(ICache)>('Cache', Cache);