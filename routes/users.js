const express = require('express');
const router = express.Router()
const userController = require('../controllers/user');

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUser)
    .put('/:id', userController.replaceUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

exports.router = router