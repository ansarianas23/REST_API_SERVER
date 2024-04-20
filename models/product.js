const mongoose = require('mongoose');
const { Schema } = mongoose;


// Schema
const productSchema = new Schema({
    title: {type: String, required:true, unique: true},
    description: { type: String},
    price: {type: Number, min:[0, 'wrong min price'], required:true},
    discountPercentage: {type: Number, min:[0, 'wrong min discount'], max:[50, 'wrong max discount']},
    rating: {type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max rating']},
    stock: {type: Number},
    brand: {type:String, required:true},
    category: {type:String, required:true},
    thumbnail: {type:String, required:true},
    images: [ String ]
});

// Models
exports.Product = mongoose.model('Product', productSchema);