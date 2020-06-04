const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  surname: { type: String },
  birthday: { type: Date },
  age: { type: Number },
  position: { type: String },
  remoteWork: { type: Boolean },
  address:  { type: Schema.ObjectId, ref: 'Address' },
  photo: { type: Schema.ObjectId, ref: 'Photo' }
}, { collection: 'employees' });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;  