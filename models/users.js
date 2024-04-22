const mongoose = require('mongoose');
const { Schema } = mongoose;


// Schema
const userSchema = new Schema({
    firstName: {type: String, required:true, unique: true},
    lastName: {type: String},
    email: { 
        type: String,
        unique: true,
        validate: {
            validator: function(v){
                return /^[\w-\.]+@([\w]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email`
        },
        required: true,

     },
    password: {type: String, minlength: 6, required:true},
    token: String,
});

// Models
exports.User = mongoose.model('User', userSchema);