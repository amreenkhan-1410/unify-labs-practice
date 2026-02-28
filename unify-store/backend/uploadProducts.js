
const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

async function upload() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const db = client.db('unify_store');
    const products = JSON.parse(fs.readFileSync('products.json'));

    await db.collection('products').insertMany(products);
    console.log("Products uploaded!");
    await client.close();
}

upload();
