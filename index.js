const express = require('express');
require('dotenv').config();

const auth = require('./Routes/auth')

const app = express();
const port = process.env.PORT || 4001;


app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', auth)

app.listen(port, () => {

    console.log('Running On port: ' + port);

})