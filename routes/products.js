const express = require('express');
const router = express.Router()
const ProductController = require('../controllers/product');

router.post('/', ProductController.createProduct)
.get('/', ProductController.getAllProducts)
.get('/:id', ProductController.getProduct)
.put('/:id', ProductController.replaceProdut)
.patch('/:id', ProductController.updatePrpduct)
.delete('/:id', ProductController.deleteProduct)

exports.router = router