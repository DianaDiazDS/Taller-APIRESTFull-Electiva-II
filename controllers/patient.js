const Patient = require("../models/patient-model");

module.exports = {
  findAll: async (req, res) => {
    try {
      const data = await Patient.find({});
      return res.status(200).json({ state: true, data: data });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Patient.findById(id);
      if (!data) {
        return res
          .status(404)
          .json({ state: false, message: "patient no encontrado" });
      }
      return res.status(200).json({ state: true, data: data });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  save: async (req, res) => {
    const patient = new Patient(req.body);
    try {
      const data = await patient.save();
      return res.status(200).json({ state: true, data: data });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  update: async (req, res) => {
    const { idPatient } = req.params;
    const {cedula, name, genero, age, appointments} = req.body;
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        idPatient,
        {
          cedula: cedula,
          name: name,
          genero: genero,
          age:age,
          appointments: appointments,
        },
        { new: true }
      );
      if (!updatedPatient) {
        return res
          .status(404)
          .json({ state: false, message: "Médico no encontrado" });
      }
      return res.status(200).json({ state: true, data: updatedPatient });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  drop: async (req, res) => {
    const { idPatient } = req.params;
    try {
      const deletedPatient = await Patient.findByIdAndDelete(idPatient);
      if (!deletedPatient) {
        return res
          .status(404)
          .json({ state: false, message: "Médico no encontrado" });
      }
      return res.status(200).json({ state: true, data: deletedPatient });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
};


