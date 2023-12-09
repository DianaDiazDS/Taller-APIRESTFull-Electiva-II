const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaPatient = new Schema({
  cedula: {
    type: Number,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "appointment",
    },
  ],
});

module.exports = mongoose.model("patient", SchemaPatient);
