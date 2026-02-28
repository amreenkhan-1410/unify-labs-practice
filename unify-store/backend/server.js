
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
    await client.connect();
    db = client.db('unify_store');
    console.log("MongoDB Connected");
}

connectDB();

// Get Products (with filter)
app.get('/api/products', async (req, res) => {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await db.collection('products').find(query).toArray();
    res.json(products);
});

// Checkout
app.post('/api/checkout', async (req, res) => {
    const { customer, items } = req.body;

    const productIds = items.map(i => new ObjectId(i._id));
    const products = await db.collection('products')
        .find({ _id: { $in: productIds } }).toArray();

    let total = 0;

    products.forEach(product => {
        const item = items.find(i => i._id === product._id.toString());
        total += product.price * item.quantity;
    });

    const order = {
        customer,
        items,
        total,
        status: 'pending',
        createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(order);
    res.status(201).json({ orderId: result.insertedId });
});

app.listen(5000, () => console.log("Server running on port 5000"));
