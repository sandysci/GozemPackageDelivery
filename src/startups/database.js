'use strict';

const {MongoClient} = require('mongodb');

const mongoose = require("mongoose");
// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();
//
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

async function connectClustermain(){

    const uri = `mongodb+srv://queencoder:7dUdMF775N4n8JF@cluster0.gccdz.mongodb.net/gozem?retryWrites=true&w=majority`;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

connectClustermain().catch(console.error);

// if (process.env.NODE_ENV == "development")
mongoose.set('debug', true);
const mongodbUrl = `mongodb+srv://queencoder:7dUdMF775N4n8JF@cluster0.gccdz.mongodb.net/gozem?retryWrites=true&w=majority`;
console.log("MONGO_DB_FULL_URL", mongodbUrl);
mongoose.connect(mongodbUrl, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;

db.on("connected", () => {
    console.log("mongo db connected");
});

db.on('error', (error) => {
    console.error("An error occurred", JSON.stringify(error));
    console.log(error);
    process.exit(1);
});




