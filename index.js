import express from 'express';
import dotenv from 'dotenv';

import auth from './Routes/auth.js'
import dbConnection from './Database/config.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

//Connect to MongoDB
dbConnection();

//Static File
app.use(express.static('public'))

//JSONFY BODY
app.use(express.json())

//ROUTES
app.use('/api/auth', auth)

//APP INIT
app.listen(port, () => {

    console.log('Running On port: ' + port);

})