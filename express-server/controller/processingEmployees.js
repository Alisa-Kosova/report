const Employee = require("../model/employeeModel");
const Photo = require("../model/photoModel");
const Address = require("../model/addressModel");
const fs = require('fs');

module.exports.findEmployees = (req, res) => {
  Employee.find()
    .populate('photo')
    .populate('address')
    .then((result) => {
      result = findWithParams(result, req);
      result.map((employee) => {
        employee.age = calculateAge(employee.birthday);
      })
      res.send(result)
    })
    .catch((err) => res.send(err));
};

module.exports.findEmployeebyID = (req, res) => {
  Employee.findById(req.params.id)
    .populate('photo')
    .populate('address')
    .then(result => {
      res.send(result);
    })
    .catch(err => res.send(err));
}

module.exports.saveEmployees = (req, res) => {
  let newPhoto = savePhoto(req.file);
  let newAddress = saveAddress(req.body);

  let newEmployee = new Employee();
  fillEmployee(newEmployee, req.body);

  if (newPhoto) newEmployee.photo = newPhoto._id;
  if (newAddress) newEmployee.address = newAddress._id;

  Employee.insertMany(newEmployee)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
};

module.exports.updateEmployee = (req, res) => {
  let newEmployee = {};
  fillEmployee(newEmployee, req.body);

  Employee.findById(req.params.id)
    .populate('photo')
    .populate('address')
    .then((result) => {
      if (result.address) {
        let newAddress = {};
        fillAddress(newAddress, req.body);
        Address.findByIdAndUpdate(result.address._id, newAddress, { new: true, upsert: true })
          .then()
      } else {
        let newAddress = saveAddress(req.body);
        if (newAddress) newEmployee.address = newAddress._id;
      }

      if (result.photo && req.file) {
        Photo.findByIdAndRemove(result.photo._id).then();
      } 
      if (req.file) {
        let newPhoto = savePhoto(req.file);
        if (newPhoto) newEmployee.photo = newPhoto._id;
      }

      Employee.findByIdAndUpdate(req.params.id, newEmployee, { new: true, upsert: true })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => res.send(err));
    });
}

module.exports.deleteEmployee = (req, res) => {
  Employee.findById(req.params.id)
    .populate('photo')
    .populate('address')
    .then((result) => {
      if (result.address) {
        Address.findByIdAndRemove(result.address._id).then();
      }
      if (result.photo) {
        Photo.findByIdAndRemove(result.photo._id).then();
      }
    });

  Employee.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.send(err);
    }
  })
    .then((result) => res.send(result));
}

let fillEmployee = (employee, body) => {
  if (body.name) employee.name = body.name;
  if (body.surname) employee.surname = body.surname;
  if (body.birthday) employee.birthday = body.birthday;
  if (body.position) employee.position = body.position;
  if (body.remoteWork) employee.remoteWork = body.remoteWork;
}

let savePhoto = (file) => {
  if (file) {
    let newPhoto = new Photo();
    newPhoto.img.data = fs.readFileSync(file.path);
    newPhoto.img.contentType = 'image/jpg';
    newPhoto.save();
    return newPhoto;
  }
}

let fillAddress = (newAddress, body) => {
  if (body.city) newAddress.city = body.city;
  if (body.street) newAddress.street = body.street;
  if (body.house) newAddress.house = body.house;
  if (body.flat) newAddress.flat = body.flat;
}

let saveAddress = (body) => {
  if (body.city || body.street || body.house || body.flat) {
    let newAddress = new Address();
    fillAddress(newAddress, body);
    newAddress.save();
    return newAddress;
  }
}

let calculateAge = (birthday) => {
  let age = Math.abs(Date.now() - birthday);
  return Math.floor((age / (1000 * 3600 * 24)) / 365.25);
}

let findWithParams = (employees, req) => {
  if (req.query.surname) {
    const findEmployees = employees.filter((employee) => { return employee.surname.toUpperCase().indexOf(req.query.surname.toUpperCase()) > -1 });
    return findEmployees;
  }
  return employees;
};