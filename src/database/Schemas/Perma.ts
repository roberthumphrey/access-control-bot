import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IPerma {
     discordId: string;
     code: string;
}

const Perma = new Schema<IPerma>({
     discordId: { type: String, required: true },
     code: { type: String, required: true }
});

export const PermaModel = mongoose.model<IPerma>('Perma', Perma);

PermaModel.watch().on('change', data => {
     if (data.operationType === 'delete') {
          console.log(data);
     }
});