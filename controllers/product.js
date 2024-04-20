const express = require('express');
const model = require('../models/product');
const Product = model.Product;

exports.createProduct = (req, res)=>{
    const product = new Product(req.body);
    product.save()
    .then((data)=>{
        res.status(201).json(data);
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}

exports.getAllProducts = (req, res)=>{
    res.json(products);
}

exports.getProduct = (req, res)=>{
    const id = +req.params.id;
    const product = products.find(p=>p.id===id);
    res.json(product);
}

exports.replaceProdut = (req, res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    products.splice(productIndex,1,{...req.body, id:id});
    res.status.json({"METHOD": "UPDATE"});
}

exports.updatePrpduct = (req, res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    const product = products[productIndex]
    products.splice(productIndex,1,{...product, ...req.body});
    res.status(201).json({"METHOD": "UPDATE"});
}

exports.deleteProduct = (req, res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    const deletedProduct = products[productIndex];
    products.splice(productIndex,1);
    res.json(deletedProduct);
}