import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

mongoose.connect(process.env.DB_URL)
    .then(() => {
            console.log(`DB connected`);
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(port, () => {
    console.log(`🚀Server is running on port ${port}...`);
});

