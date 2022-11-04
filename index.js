const express = require('express'); 
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('db connection successfull'))
.catch((err) => console.log(err))

app.get('/', (req, res) => {
    res.send('hiiii');
});

app.get('/api/Home', (req, res) => {
    res.send('1 2 3');
});

app.get('/api/Home/', (req, res) => {
    res.send('1 2 3');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port}`));