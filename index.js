const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const server = express();
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');

// DB Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  console.log("Database is Connected")
}



// Body parser Middleware
server.use(express.json());
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.listen(process.env.PORT, ()=>{
    console.log("Server Started");
});