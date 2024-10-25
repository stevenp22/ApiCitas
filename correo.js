require('dotenv').config();
nodemailer = require("nodemailer");

async function eliminarCita(nombrePaciente, citaSinEspacios, telefono, documentoPaciente) {
  // Configurar el transportador
  const transporter = nodemailer.createTransport({
    host: process.env.CORREO_HOST,
    port: parseInt(process.env.CORREO_PORT),
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.CORREO_USUARIO,
      pass: process.env.CORREO_PASSWORD,
    },
  });
  // Definir el contenido del correo
  const mailOptions = {
    from: process.env.CORREO_USUARIO, // Remitente
    to: "pipep22@gmail.com", // Destinatario
    subject: `Cancelar cita de ${nombrePaciente}`, // Asunto
    text: `El paciente ${nombrePaciente} con documento de identidad ${documentoPaciente}, desea cancelar su cita de ${citaSinEspacios} por favor gestionar la cancelación, el telefono del paciente es ${telefono}.`, // Contenido del correo
  };
  // Enviar el correo
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error al enviar el correo: ", error);
    }
    console.log("Correo enviado librería: " + info.response);
  });
}

module.exports = { eliminarCita };
