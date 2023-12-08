const mongoose = require("mongoose");

const { Schema } = mongoose;

const SchemaPatient = new Schema({
  cedula: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
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
