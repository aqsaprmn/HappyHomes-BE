const { Schema, model } = require("mongoose");

const initSchema = require("./default.js");

const defaultSchema = initSchema.obj;

const mainSchema = {
  user_id: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  time: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
};

const schemaGo = Object.assign({}, defaultSchema, mainSchema);

const eventSchema = new Schema(schemaGo, {
  collection: "events",
});

const Event = model("events", eventSchema);

module.exports = Event;
