const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./keys').mongoURI;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




mongoose
.connect(db, { useNewUrlParser: true, useCreateIndex: true })
.then(()=>console.log('DB is connected'))
.catch(err=>console.log(err))



app.listen(port, ()=>{
    console.log('Server is running ' + port + 'PORT');
})

app.use('/users', require('./routes/users'));