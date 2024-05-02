const { Schema } = require("mongoose");

const defaultSchema = new Schema({
  metadata: {
    timeInsert: {
      type: Number,
      required: true,
    },
    timeUpdate: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  uuid: {
    type: String,
    required: true,
  },
});

module.exports = defaultSchema;
