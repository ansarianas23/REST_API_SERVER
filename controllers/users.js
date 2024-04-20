const fs = require('fs');
const express = require('express');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const users = data.users;

exports.createUser = (req, res)=>{
    users.push(req.body);
    res.status(201).json(req.body);
}

exports.getAllUsers = (req, res)=>{
    res.json(users);
}

exports.getUser = (req, res)=>{
    const id = +req.params.id;
    const user = users.find(p=>p.id===id);
    res.json(user);
}

exports.replaceUser = (req, res)=>{
    const id = +req.params.id;
    const userIndex = users.findIndex(p=>p.id===id);
    users.splice(userIndex,1,{...req.body, id:id});
}

exports.updateUser = (req, res)=>{
    const id = +req.params.id;
    const userIndex = users.findIndex(p=>p.id===id);
    const user = users[userIndex]
    users.splice(userIndex,1,{...user, ...req.body});
}

exports.deleteUser = (req, res)=>{
    const id = +req.params.id;
    const userIndex = users.findIndex(p=>p.id===id);
    const deletedUser = users[userIndex];
    users.splice(userIndex,1);
    res.json(deletedUser);
}