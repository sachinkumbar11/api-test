const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema =new Schema ({
    name:String,
    status:String,
    gender:String,
    image:String
})

const Character = mongoose.model('Character',schema)

module.exports= Character