import mongoose from 'mongoose';
import { client } from '../..';
import { CacheModel } from './Cache';
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

PermaModel.watch().on('change', async data => {
     if (data.operationType === 'delete') {
          let documentKey = data.documentKey._id.toString();
          let cache = await CacheModel.findOne({ codeId: documentKey });
          let role = client.guilds.cache.get(process.env.guildId).roles.cache.find(role => role.name === 'Hidden Access')

          client.guilds.cache.get(process.env.guildId).members.cache.get(cache.discordId).roles.remove(role);
     }
});