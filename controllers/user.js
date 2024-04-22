const express = require('express');
const model = require('../models/users');
const User = model.User;

// CREATE
exports.createUser = (req, res)=>{
    const user = new User(req.body);
    user.save()
    .then((data)=>{
        console.log(data);
        res.status(201).json(data);
    }).catch((err)=>{
        console.log(err);
        res.status(400).json(err);
    })
}

// READ ALL USERS
exports.getAllUsers = async(req, res)=>{
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

// READ SINGLE USER
exports.getUser = async(req, res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json(user);
        
    } catch (error) {
        console.log(error);
    }
}

// REPLACE SINGLE USER
exports.replaceUser = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await User.findOneAndReplace({_id:id}, req.body, {new: true});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error)
    }
}

// UPDATE SINGLE USER
exports.updateUser = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await User.findOneAndUpdate({_id:id}, req.body, {new: true});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
    }
}

// DELETE SINGLE USER
exports.deleteUser = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await User.findOneAndDelete({_id:id});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
    }
}