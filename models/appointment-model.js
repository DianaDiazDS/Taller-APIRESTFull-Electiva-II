const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaPatient = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patient",
  },
});

module.exports = mongoose.model("appointment", SchemaPatient);
