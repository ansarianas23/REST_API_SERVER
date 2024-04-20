const express = require('express');
const model = require('../models/product');
const Product = model.Product;

// CREATE
exports.createProduct = (req, res)=>{
    const product = new Product(req.body);
    product.save()
    .then((data)=>{
        console.log(data);
        res.status(201).json(data);
    }).catch((err)=>{
        console.log(err);
        res.status(201).json(err);
    })
}

// READ ALL PRODUCTS
exports.getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
    }
}

// READ SINGLE PRODUCT
exports.getProduct = async(req, res)=>{
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        res.json(product);
        
    } catch (error) {
        console.log(error);
    }
}

// REPLACE SINGLE PRODUCT
exports.replaceProdut = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndReplace({_id:id}, req.body, {new: true});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error)
    }
}

// UPDATE SINGLE PRODUCT
exports.updatePrpduct = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndUpdate({_id:id}, req.body, {new: true});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
    }
}

// DELETE SINGLE PRODUCT
exports.deleteProduct = async(req, res)=>{
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndDelete({_id:id});
        res.status(201).json(doc);
    } catch (error) {
        console.log(error);
    }
}