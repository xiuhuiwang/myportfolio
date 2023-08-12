const mongoose = require('mongoose');
let schemaMessage = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
    date : {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', schemaMessage); // export the model