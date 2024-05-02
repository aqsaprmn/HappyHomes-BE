const { Schema, model } = require("mongoose");

const initSchema = require("./default.js");

const defaultSchema = initSchema.obj;

const mainSchema = {
  name: {
    type: String,
    required: true,
  },
};

const schemaGo = Object.assign({}, defaultSchema, mainSchema);

const projectSchema = new Schema(schemaGo, {
  collection: "projects",
});

const Project = model("projects", projectSchema);

module.exports = Project;
