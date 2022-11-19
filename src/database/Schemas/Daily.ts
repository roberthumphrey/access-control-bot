import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IDaily {
     createdAt: Date;
     discordId: string;
}

const Daily = new Schema<IDaily>({
     createdAt: { type: Date, expires: 3600, default: Date.now() },
     discordId: { type: String, required: true },
});

export const DailyModel = mongoose.model<IDaily>('Daily', Daily);