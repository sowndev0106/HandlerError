const express = require('express')
require('express-async-errors');
require('./src/mongoose')
const morgan = require('morgan');
const router =require('./src/router')
const app = express();
const port  = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(router)

app.listen(port,()=>console.log(`listening on http://localhost:${port} ` ));