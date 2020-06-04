const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  city: { type: String },
  street: { type: String },
  house: { type: String },
  flat: { type: String }
}, { collection: 'address' });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;  