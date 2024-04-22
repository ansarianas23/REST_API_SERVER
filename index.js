const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const server = express();
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const path = require('path');
const cors = require('cors')

// DB Connection
main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database is Connected")
}



// Body parser and other Middleware
server.use(cors());
server.use(express.static(process.env.PUBLIC_DIR));
server.use(express.json());
server.use('/products', productRouter.router);
server.use('/users', userRouter.router);

server.use('*',(req, res)=>{
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

server.listen(process.env.PORT, ()=>{
    console.log("Server Started");
});