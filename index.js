const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { verificarPaciente } = require('./verificarPaciente');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.post('/verificar-paciente', (req, res) => {
    console.log('Datos recibidos:', req.body);

    const { tipoDocumento, numeroDocumento } = req.body;

    if (!tipoDocumento || !numeroDocumento) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    verificarPaciente(tipoDocumento, numeroDocumento, (error, resultado) => {
        if (error) {
            console.error('Error en la base de datos:', error);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (resultado.length > 0) {

            const usuario = {
                TipDocPac: resultado[0].TipDocPac,
                NumDocPac: resultado[0].NumDocPac,
                NombPac: resultado[0].NombPac,
            };

            const citas = resultado.map(cita => ({
                NumCitPac: cita.NumCitPac,
                EstCitPac: cita.EstCitPac,
                NomEspCit: cita.NomEspCit,
                FchCitPac: cita.FchCitPac,
                HorCitPac: cita.HorCitPac,
                NomEspcCit: cita.NomEspcCit,
                CodProCit: cita.CodProCit,
                NomProCit: cita.NomProCit
            }));

            console.log(usuario)
        
            return res.status(200).json({ mensaje: 'Citas encontradas', usuario: usuario, citas: citas  });
        } else {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }        
    });
});


app.get('/CitasConTomas', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/Citas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'consulta.html'));
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});