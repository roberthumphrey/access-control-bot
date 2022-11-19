import mongoose from 'mongoose';

const { db_user, db_pass, db_uri, db } = process.env;

const uri = `mongodb+srv://${db_user}:${db_pass}@${db_uri}/${db}?retryWrites=true&w=majority`

export const connect = () => {
     mongoose.connect(uri);

     let connection = mongoose.connection;

     connection.on('connected', console.log.bind(console, 'Connected to database'));
     connection.on('error', console.error.bind(console, 'Error connecting to database'));
}