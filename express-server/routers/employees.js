const funcEmployees = require("../controller/processingEmployees");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

module.exports.employees = app => {

  app.get("/api/employees", (req, res) => {
    funcEmployees.findEmployees(req, res);
  });

  app.get("/api/employees/:id", (req, res) => {
    funcEmployees.findEmployeebyID(req, res);
  });

  app.post("/api/employees", jsonParser, (req, res) => {
    if (req.body) {
      funcEmployees.saveEmployees(req, res);
    }
  });

  app.put("/api/employees/:id", (req, res) => {
    if (req.body) {
      funcEmployees.updateEmployee(req, res);
    }
  });
  
  app.delete("/api/employees/:id", (req, res) => {
    funcEmployees.deleteEmployee(req, res);
  });
};
