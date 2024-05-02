const { Schema, model } = require("mongoose");

const initSchema = require("./default.js");

const defaultSchema = initSchema.obj;

const mainSchema = {
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
};

const schemaGo = Object.assign({}, defaultSchema, mainSchema);

const employeeSchema = new Schema(schemaGo, {
  collection: "employees",
});

const Employee = model("employees", employeeSchema);

module.exports = Employee;
