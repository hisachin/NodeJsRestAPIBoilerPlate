import mongoose from 'mongoose';
import { now } from 'moment';

let Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    salt: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    entityId:{
        type: String,
        trim: true,
        required: true,
    },
    entityType:{
        type: String,
        trim: true,
        required: true,
    },
    userType:{
        type: String,
        trim: true,
        required: true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isLocked : {
        type : Boolean,
        default : false
        },
    accountVerificationToken : {
        type : String
    },
    accountVerificationTokenExpiryDate:{
        type :Date
    }
}, {
    timestamps: true
});

UserSchema.virtual('brands', {
    ref: 'brandModel',
    localField: 'entityIdu',
    justOne: true,
    foreignField: '_id',
});

module.exports = mongoose.model('Users', UserSchema);