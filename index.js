const express = require('express'); 
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./routes/auth");
const userRoute = require('./routes/users')

dotenv.config();

mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('db connection successfull');
        app.use(express.json());
        
        app.use('/api/auth', authRoute);
        app.use('/api/users', userRoute);

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`${port}`));
    })
    .catch((err) => console.log(err));



