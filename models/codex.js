
const mongoose = require('mongoose')
const codexSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    }, 
    author: {
        type: String,
        required: true
    }, 
    added_to_collection:{ 
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Codex", codexSchema)

