
const mongoose = require('mongoose')
const kindleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    link: {
        type: String,
        require: true, 
    },
    author: {
        type: String,
        required: false,
        
    }
    
});



const Kindle = mongoose.model('Kindle', kindleSchema)

module.exports = Kindle
