const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const photoSchema = new Schema({
  img: {data: Buffer, contentType: String}
}, { collection : 'photos' });
 
const Photo = mongoose.model('Photo', photoSchema);
 
module.exports = Photo;  
