const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
const db = require('./keys').mongoURI;
const mongoose = require('mongoose');

mongoose
.connect(db, { useNewUrlParser: true, useCreateIndex: true })
.then(()=>console.log('DB is connected'))
.catch(err=>console.log(err))



const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Server is running ' + port + 'PORT');
})

app.use('/users', require('./routes/users'));