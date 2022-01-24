const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    type:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    images:{
        type:Object,
        required:false,
        max:255,
        min:6
    },
    additional:{
        type:String,
        required:false,
        max:255,
        min:6
    },
    marks:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    test_id:{
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

module.exports = mongoose.model('Question', questionSchema);