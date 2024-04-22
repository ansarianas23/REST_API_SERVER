const jwt = require('jsonwebtoken');
const model = require('../models/users');
const User = model.User;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.key'), 'utf-8');

// CREATE USER Controller
exports.signUp = (req, res)=>{
    
    const user = new User(req.body);
    // creating a token and binding it with user data
    var token = jwt.sign({email: req.body.email}, privateKey, {algorithm: 'RS256'});
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    user.token = token;
    user.password = hashPassword;

    user.save()
    .then((data)=>{
        console.log(data);
        res.status(201).json({token});
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
}


// LOGIN Controller

exports.login = async(req, res)=>{
    try {
        // querying in database with given email whether the user is there or not
        const doc = await User.findOne({email: req.body.email});

        // checking whether password is macthing with th above user email
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);     // doc.password basically a hash that is present in user document for comparison

        if(isAuth){
            // creating a new token and binding it with above auth user data
            var token = jwt.sign({email: req.body.email}, privateKey, {algorithm: 'RS256'});
            doc.token = token;
            doc.save()
            .then(()=>{
                res.json({token});
            })               
        }else{
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(401).json(err);
    }
}