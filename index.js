const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./routes/auth");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('db connection successfull'))
    .catch((err) => console.log(err))

app.use(express.json());
app.use('/api/auth', authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port}`));