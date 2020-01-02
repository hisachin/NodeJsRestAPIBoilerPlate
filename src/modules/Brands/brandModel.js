import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const BrandSchema = new Schema({
  company: {
    type: String,
    trim: true,
    required: true
  },
  name: {
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
}, {
  timestamps: true
});

module.exports = mongoose.model('Brands', BrandSchema);