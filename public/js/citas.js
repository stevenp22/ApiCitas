document.addEventListener('DOMContentLoaded', function() {

    function obtenerBotonEstado(estado) {
        switch (estado) {
            case 'CONFIRMADA':
                return `
                    <button class="btn btn-success">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
            case 'CANCELADA' :
                return `
                    <button class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
            case 'INCUMPLIDA':
                return `
                    <button class="btn btn-danger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
            case 'RESERVADA':
                return `
                    <button class="btn btn-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event-fill" viewBox="0 0 16 16">
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                    </button>`;
            default:
                return '';
        }
    }

    function mostrarDatosPacientes(pacientes) {
        const tablaBody = document.getElementById('tabla-body');
        let filas = '';

        pacientes.forEach(usuario => {
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
    }

    const urlParams = new URLSearchParams(window.location.search);
    const pacientes = JSON.parse(decodeURIComponent(urlParams.get('citas')));
    const usuario = JSON.parse(decodeURIComponent(urlParams.get('usuario')));
    const usuarioTexto = `${usuario.TipDocPac} ${usuario.NumDocPac} | ${usuario.NombPac}`;

    if (pacientes) {
        document.getElementById('infoUsuario').innerText = usuarioTexto;
        mostrarDatosPacientes(pacientes);
    } else {
        console.error('No se encontraron pacientes o hubo un error en la solicitud.');
    }

    document.querySelector('.btn-back').addEventListener('click', function() {
        window.location.href = '/CitasConTomas';
    });

    function formatearFecha(fecha) {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const año = date.getFullYear();
        return `${dia}-${mes}-${año}`;
    }

    function formatearHora(hora) {
        const date = new Date(`1970-01-01T${hora}Z`); // Usar una fecha fija para crear el objeto Date
        const horas = String(date.getUTCHours()).padStart(2, '0');
        const minutos = String(date.getUTCMinutes()).padStart(2, '0');
        return `${horas}:${minutos}`;
    }
    

});
