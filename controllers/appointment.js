const Appointment = require("../models/appointment-model");
const Patient = require("../models/patient-model");

module.exports = {
  findAll: async (req, res) => {
    try {
      const appointments = await Appointment.find({});
      return res.status(200).json({ state: true, data: appointments });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  findById: async (req, res) => {
    const { id } = req.params;
    try {
      const appointment = await Appointment.findById(id);
      if (!appointment) {
        return res
          .status(404)
          .json({ state: false, message: "cita no encontrado" });
      }
      return res.status(200).json({ state: true, data: appointment });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  save: async (req, res) => {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (patient) {
      try {
        const appointment = new Appointment(req.body);

        appointment.patient = patient;

        const result = await appointment.save();

        patient.appointments.push(appointment);

        await patient.save();

        return res.status(200).json({ state: true, data: result });
      } catch (error) {
        return res.status(500).json({ state: false, error: error.message });
      }
    } else {
      return res.status(200).json({ state: false, error: " No Existe" });
    }
  },
  update: async (req, res) => {
    const { idAppointment } = req.params;
    const { numero,name,fecha,hora, medic, patients } = req.body;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        idAppointment,
        { numero: numero, name: name, hora:hora,fecha:fecha,medic:medic, patients: patients },
        { new: true }
      );
      if (!updatedAppointment) {
        return res
          .status(404)
          .json({ state: false, message: "cita no encontrada" });
      }
      return res.status(200).json({ state: true, data: updatedAppointment });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  drop: async (req, res) => {
    const { idAppointment } = req.params;
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(idAppointment);
      if (!deletedAppointment) {
        return res
          .status(404)
          .json({ state: false, message: "cita no encontrado" });
      }
      return res.status(200).json({ state: true, data: deletedAppointment });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
};
