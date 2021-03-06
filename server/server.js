const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = process.env.MONGO_URI;
const cors = require('cors');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

require('./passport.js');





mongoose
.connect(db, { useNewUrlParser: true, useCreateIndex: true })
.then(()=>console.log('DB is connected'))
.catch(err=>console.log(err))



app.listen(port, ()=>{
    console.log('Server is running ' + port + 'PORT');
})


app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/blacklists', require('./routes/blacklists'));
app.use('/comments', require('./routes/comments'));