
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
let db;

async function connectDB() {
    await client.connect();
    db = client.db('zenith_cms');
    console.log('Connected to Cloud Database');
}
connectDB();

app.get('/api/posts', async (req, res) => {
    const posts = await db.collection('blogs').find().sort({ date: -1 }).toArray();
    res.json(posts);
});

app.get('/api/posts/:id', async (req, res) => {
    const post = await db.collection('blogs').findOne({ _id: new ObjectId(req.params.id) });
    res.json(post);
});

app.post('/api/posts', async (req, res) => {
    const { title, category, content, author } = req.body;
    const newPost = { title, category, content, author, date: new Date() };
    await db.collection('blogs').insertOne(newPost);
    res.status(201).json({ message: "Post Created!" });
});

app.patch('/api/posts/:id', async (req, res) => {
    const { title, category, content } = req.body;
    await db.collection('blogs').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { title, category, content } }
    );
    res.json({ message: "Post Updated!" });
});

app.delete('/api/posts/:id', async (req, res) => {
    await db.collection('blogs').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "Post Deleted!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
