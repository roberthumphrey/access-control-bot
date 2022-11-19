import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ICode {
     code: string;
     type: string;
}

const Code = new Schema<ICode>({
     code: { type: String, required: true },
     type: { type: String, required: true }
});

export const CodeModel = mongoose.model<ICode>('Code', Code);