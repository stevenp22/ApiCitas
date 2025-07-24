//nodemailer = require("nodemailer");

document.addEventListener("DOMContentLoaded", function () {
  function obtenerBotonEstado(estado) {
    switch (estado) {
      case "CONFIRMADA":
        return `
                    <button class="btn btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
      case "CANCELADA":
        return `
                    <button class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
      case "INCUMPLIDA":
        return `
                    <button class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
      case "RESERVADA":
        return `
                    <button class="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
      default:
        return "";
    }
  }

  function mostrarDatosPacientes(pacientes) {
    //console.log("Pacientes:", pacientes);
    const tablaBody = document.getElementById("tabla-body");
    let filas = "";

    pacientes.forEach((usuario) => {
      filas += `
                <tr>
                    <td>${obtenerBotonEstado(usuario.EstCitPac)}</td>
                    <td>${usuario.EstCitPac}</td>
                    <td>${formatearFecha(usuario.FchCitPac)}</td>
                    <td>${formatearHora(usuario.HorCitPac)}</td>
                    <td>${usuario.NomEspCit}</td>
                    <td>${usuario.NomProCit}</td>
                </tr>
            `;
    });

    tablaBody.innerHTML = filas;

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
      boton.addEventListener("click", function () {
        const cita = this.getAttribute("data-cita");
        const tel = this.getAttribute("data-tel");
        if (confirm("¿Está seguro que desea cancelar esta cita?")) {
          eliminarCita(cita, tel);
        }
      });
    });
  }

  function eliminarEspacios(texto) {
    return texto.trim();
  }

  function eliminarCita(cita, tel) {

    // Log inicial para ver qué datos llegan
    //console.log('Cita recibida:', cita);

    // Verificar que urlParams existe
    if (typeof urlParams === "undefined") {
      console.error("urlParams no está definido");
      return;
    }

    // Verificar y obtener el usuario
    if (!urlParams.has("usuario")) {
      console.error("No se encontró el parámetro usuario");
      return;
    }

    let usuario;
    try {
      usuario = JSON.parse(decodeURIComponent(urlParams.get("usuario")));
    } catch (e) {
      console.error("Error al parsear usuario:", e);
      return;
    }

    // Log para ver el objeto usuario
    //console.log('Usuario parseado:', usuario);

    // Verificar que usuario.NombPac existe
    if (!usuario.NombPac) {
      console.error("NombPac no existe en el objeto usuario");
      return;
    }

    const documentoPaciente = eliminarEspacios(usuario.NumDocPac);
    const nombrePaciente = eliminarEspacios(usuario.NombPac);
    const citaSinEspacios = eliminarEspacios(cita);
    const telefono = eliminarEspacios(tel);

    // Log de los datos procesados
    //console.log('Datos a enviar:', { nombrePaciente, citaSinEspacios, telefono });

    /*alert(
      `El paciente ${nombrePaciente} con documento de identidad ${documentoPaciente}, desea cancelar su cita de ${citaSinEspacios} por favor gestionar la cancelación, el telefono del paciente es ${telefono}.`
    );*/

    fetch("/correo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        nombrePaciente,
        citaSinEspacios,
        telefono,
        documentoPaciente,
      }),
    })
      .then((response) => {
         // Log para ver la respuesta
         //console.log('Respuesta del servidor:', response);
        if (!response.ok) {
          throw new Error(
            "Error en la solicitud: " +
              response.status +
              " " +
              response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        // Log de los datos recibidos
        //console.log("Respuesta del servidor:", data);
        //alert("Correo enviado exitosamente");
      })
      .catch((error) => {
        console.error("Error al enviar el correo: ", error);
        //alert("Error al enviar el correo. Por favor, intente nuevamente.");
      });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const pacientes = JSON.parse(decodeURIComponent(urlParams.get("citas")));
  const usuario = JSON.parse(decodeURIComponent(urlParams.get("usuario")));
  const usuarioTexto = `${usuario.TipDocPac} ${usuario.NumDocPac} | ${usuario.NombPac}`;

  if (pacientes) {
    document.getElementById("infoUsuario").innerText = usuarioTexto;
    mostrarDatosPacientes(pacientes);
  } else {
    console.error(
      "No se encontraron pacientes o hubo un error en la solicitud."
    );
  }

  document.querySelector(".btn-back").addEventListener("click", function () {
    window.location.href = "/CitasConTomas";
  });

  function formatearFecha(fecha) {
    const date = new Date(fecha);
    const dia = String(date.getDate() + 1).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
  }

  function formatearHora(hora) {
    const date = new Date(`1970-01-01T${hora}Z`); // Usar una fecha fija para crear el objeto Date
    const horas = String(date.getUTCHours()).padStart(2, "0");
    const minutos = String(date.getUTCMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
  }
});
