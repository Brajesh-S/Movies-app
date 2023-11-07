const express = require('express'); 
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require("./back-end/routes/auth");
const userRoute = require('./back-end/routes/users')

const errorHandler = require('./shared/middlewares/errorHandler');

dotenv.config();

app.use(cors({
    origin:["http://localhost:3001"],
    methods:['POST' , 'GET'],
    credentials: true
})); 
     

mongoose
    .set('strictQuery', false)
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('db connection successfull');
        app.use(express.json());
        
        app.use('/api/auth', authRoute);
        app.use('/api/users',  userRoute);
        
        app.use(errorHandler)

                                                                  
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`${port}`));
    })
    .catch((err) => console.log(err));



