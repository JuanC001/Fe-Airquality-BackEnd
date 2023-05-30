import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import auth from './Routes/auth.js'
import admin from './Routes/admin.js'
import user from './Routes/user.js'
import device from './Routes/device.js'

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

app.use(cors())

//ROUTES
app.use('/api/auth', auth)
app.use('/api/admin', admin)
app.use('/api/user', user)
app.use('/api/device', device)

//APP INIT
app.listen(port, () => {

    console.log('Running On port: ' + port);

})
