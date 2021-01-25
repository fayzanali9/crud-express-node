const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var hostname = appEnv.host;
var port = appEnv.port;

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT||8080

//log requests
app.use(morgan('tiny'));
connectDB();   

//parse requests to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set('view engine','ejs') 
// app.set('views',path.resolve(__dirname,'views/ejs'))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/',require('./server/routes/router'))

app.listen(3000,()=>{console.log(`server is running on ${PORT}`)});