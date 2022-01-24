const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    question_id:{
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

module.exports = mongoose.model('Answer', answerSchema);