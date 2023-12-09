const Patient = require("../models/patient-model");


const validatePatientData = (data, accion) => {
  const { cedula, firstname, lastname, gender, age, phonenumber, address, mail, appointments } = data;


  if(accion=="save"){
    if (!/^\d+$/.test(cedula)) {
      return "La cédula debe contener solo números.";
    }
  }
  // Validación de cedula: solo números
  

  // Validación de firstName y lastName: solo letras sin caracteres especiales
  if (!/^[a-zA-Z\s]+$/.test(firstname) || !/^[a-zA-Z\s]+$/.test(lastname)) {
    return "El nombre y apellido deben contener solo letras y espacios.";
  }

  // Validación de gender: solo "M" o "F"
  if (!/^[MF]$/.test(gender)) {
    return "El género debe ser 'M' o 'F'.";
  }

  // Validación de age: solo números y no mayor a 90
  if (!/^\d+$/.test(age) || parseInt(age) > 90) {
    return "La edad debe ser un número y no mayor a 90.";
  }

  // Validación de phoneNumber: solo números de 10 dígitos
  if (!/^\d{10}$/.test(phonenumber)) {
    return "El número de teléfono debe contener 10 dígitos.";
  }
  if (!/@(gmail\.com|hotmail\.com)$/.test(mail)) {
    return "El correo electrónico debe terminar en @gmail.com o @hotmail.com.";
  }
  if (!/^[a-zA-Z0-9#\- ]+$/.test(address)) {
    return "La dirección debe contener solo letras, números, # y -.";
  }

  // Validación de appointments: podrías agregar validaciones adicionales según la estructura de tus datos

  return null; // Retorna nulo si no hay errores de validación
};
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

    const { cedula } = req.body;

    const patientData = req.body;
    const validationError = validatePatientData(patientData,"save");
    if (validationError) {
      return res.status(400).json({ state: false, error: validationError });
    }

    try {


      const existingPatient = await Patient.findOne({ cedula });

      if (existingPatient) {
        return res.status(400).json({ state: false, error: "Ya existe un paciente con esta cédula" });
      }

      const patient = new Patient(req.body);

      const data = await patient.save();
      return res.status(200).json({ state: true, data: data });
    } catch (error) {
      return res.status(500).json({ state: false, error: error.message });
    }
  },



  update: async (req, res) => {
    const { idPatient } = req.params;
    const { cedula, firstname, lastname, gender, age, phonenumber, address, mail, appointments } = req.body;
    const patientData = req.body;

    // Validar los datos del paciente
    const validationError = validatePatientData(patientData,"update");
    if (validationError) {
      return res.status(400).json({ state: false, error: validationError });
    }
    if (cedula) {
      return res.status(400).json({ state: false, error: "No se permite modificar la cédula." });
    }

    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        idPatient,
        {
          cedula: cedula,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          age: age,
          phonenumber: phonenumber,
          address: address,
          mail: mail,
          appointments: appointments,
        },
        { new: true }
      );
      if (!updatedPatient) {
        return res
          .status(404)
          .json({ state: false, message: "paciente no encontrado" });
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


