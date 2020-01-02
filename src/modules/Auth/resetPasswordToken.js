var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResetPasswordToken = new Schema({
    email: { 
        type: String,
        required : true
    },
    token: {
        type: String,
        required : true
    },
    expiryDate : {
        type : Date,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResetPasswordToken', ResetPasswordToken);
