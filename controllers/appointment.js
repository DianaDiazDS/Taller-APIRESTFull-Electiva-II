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
        let found = await Appointment.findOne({ number: req.body.number });
        if (!found) {
          const dateRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          const isDateValid = !isNaN(Date.parse(req.body.date));

          if (
            isDateValid &&
            dateRegex.test(req.body.hour) &&
            Date.parse(req.body.date) >= Date.now()
          ) {
            const appointment = new Appointment(req.body);
            appointment.patient = patient;

            const result = await appointment.save();

            patient.appointments.push(appointment);

            await patient.save();

            return res.status(200).json({ state: true, data: result });
          } else {
            return res.status(500).json({
              state: false,
              error: "La fecha o la hora no son válidas",
            });
          }
        } else {
          return res
            .status(500)
            .json({ state: false, error: "Ya hay una cita con ese número" });
        }
      } catch (error) {
        return res.status(500).json({ state: false, error: error.message });
      }
    } else {
      return res
        .status(200)
        .json({ state: false, error: "El paciente no existe" });
    }
  },
  update: async (req, res) => {
    const { idAppointment } = req.params;
    const { number, name, hour, date, specialist, patient } = req.body;

    try {
      const isValidDate = !isNaN(Date.parse(date));
      const isHourFormatValid = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
        hour
      );

      if (!isValidDate || !isHourFormatValid) {
        return res
          .status(400)
          .json({ state: false, error: "Formato de fecha o hora incorrecto" });
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        idAppointment,
        {
          number: number,
          name: name,
          hour: hour,
          date: date,
          specialist: specialist,
          patient: patient,
        },
        { new: true }
      );

      if (!updatedAppointment) {
        return res
          .status(404)
          .json({ state: false, message: "Cita no encontrada" });
      }

      return res.status(200).json({ state: true, data: updatedAppointment });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
  drop: async (req, res) => {
    const { idAppointment } = req.params;
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(
        idAppointment
      );
      if (!deletedAppointment) {
        return res
          .status(404)
          .json({ state: false, message: "Cita no encontrada" });
      }

      const updatedPatient = await Patient.findOneAndUpdate(
        { appointments: idAppointment },
        { $pull: { appointments: idAppointment } },
        { new: true }
      );

      if (!updatedPatient) {
        return res
          .status(404)
          .json({ state: false, message: "Paciente no encontrado" });
      }

      return res.status(200).json({ state: true, data: deletedAppointment });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },
};
