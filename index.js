const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const server = express();
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');
const path = require('path');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth')
const fs = require('fs')
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'), 'utf-8');


// DB Connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("Database is Connected")
}

// Middleware To check wether user is verified or not
const auth = (req, res, next)=>{
  try {
    // extracting token that comes in header
    const headerToken = req.get('Authorization').split('Bearer ')[1];

    // decoding if the request header is matches with the existed user or not if matches pass it or send error
    var decoded = jwt.verify(headerToken, publicKey);

    if(decoded.email){
      next()
    }else{
      res.sendStatus(401)
    }
    } catch (error) {
      res.sendStatus(401)
    }
}

// Body parser and other Middleware
server.use(cors());
server.use(express.static(process.env.PUBLIC_DIR));
server.use(express.json());
server.use('/auth', authRouter.router);
server.use('/products', auth, productRouter.router);
server.use('/users', auth, userRouter.router);

server.use('*',(req, res)=>{
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

server.listen(process.env.PORT, ()=>{
    console.log("Server Started");
});