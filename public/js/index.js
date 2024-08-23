document.getElementById('verificarBtn').addEventListener('click', function() {
    const tipoDocumento = document.getElementById('tipoDocumento').value;
    const numeroDocumento = document.getElementById('numeroDocumento').value;

    if (!tipoDocumento || !numeroDocumento) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    fetch('/verificar-paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ tipoDocumento, numeroDocumento })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.mensaje === 'Citas encontradas') {
            const queryParams = new URLSearchParams({
                mensaje: data.mensaje,
                usuario: encodeURIComponent(JSON.stringify(data.usuario)),
                citas: encodeURIComponent(JSON.stringify(data.citas))
            }).toString();
            const url = `/Citas?${queryParams}`;
            window.location.href = url;
        } else {
            document.getElementById('modal').style.display = 'block';
        }
    })
    .catch(error => {
        document.getElementById('modal').style.display = 'block';
    });
});

document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('acceptBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});