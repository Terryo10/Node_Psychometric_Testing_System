const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    topic:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    user_id:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('test', testSchema);