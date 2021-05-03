const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;


async function run() {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/chat', 
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Database is connected');
    } catch (error) {
        console.error(error)
    }
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));
}
run();