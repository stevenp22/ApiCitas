const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { pool } = require('./config/dbConfig');
const { poolMysql } = require('./config/dbConfig');

async function connectSqlServer() {
    try {
        await pool.connect();

        const today = new Date().toISOString().split('T')[0];

        const consulta = 
            `SELECT c.citnum NumCitPac, c.cittipdoc TipDocPac, c.citced NumDocPac, cb.MPNOMC NombPac,
                CASE 
                    WHEN c.citesta = 'R' THEN 'RESERVADA' 
                    WHEN c.citesta = 'C' THEN 'CONFIRMADA' 
                    WHEN c.citesta = 'I' THEN 'INCUMPLIDA' 
                    WHEN c.citesta = 'N' THEN 'CANCELADA' END EstCitPac,
                m.menome NomEspCit, cast(c.CitFecPa as date) FchCitPac, c.CitHorIPa HorCitPac, md.mmnomm NomEspcCit, 
                CitProCod CodProCit, mp.prnomb NomProCit, cb.MpTele2 TelPac
                FROM citmed1 c
                INNER JOIN citmed2 c2 ON (c.citnum = c2.citnum AND c.citemp = c2.citemp AND c.citsed = c2.citsed)
                INNER JOIN citmed3 c3 ON (c.citnum = c3.citnum AND c.citemp = c3.citemp AND c.citsed = c3.citsed)
                INNER JOIN maeesp m ON (c2.mecode = m.mecode)
                INNER JOIN maemed1 md ON (c2.MMCODM = md.mmcodm)
                INNER JOIN CAPBAS cb ON (c.citced = cb.MPCedu AND c.cittipdoc = cb.MPTDoc) 
                INNER JOIN maepro mp ON (c3.citprocod = mp.prcodi)
                WHERE c.citfecpa >= '${today}' AND c.citesta IN ('R','C','I','N')
                ORDER BY 1`;

        const result = await pool.request().query(consulta);
        const citas = result.recordset;

        await insertIntoMysql(citas);

    } catch (error) {
        logError('Error al conectar con SQLServer', error);
    }
}

async function insertIntoMysql(citas) {
    try {
        const connection = await new Promise((resolve, reject) => {
            poolMysql.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });
        });

        const deleteCitas = 'DELETE FROM Citas';

        connection.query(deleteCitas, (error, results) => {
            const now = new Date();
            const options = { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };            const formattedDate = new Intl.DateTimeFormat('sv-SE', options).format(now).replace(' ', 'T') + 'Z';
            if (error) {
                logError('Error al conectar con MySQL para la eliminacion temporal', error);
            } else {
                console.log(formattedMessageDate('Datos eliminados Tabla Temporal'),results);
            }
        });

        const insertQuery = `INSERT INTO Citas (NumCitPac, TipDocPac, NumDocPac, NombPac, EstCitPac, NomEspCit, FchCitPac, HorCitPac, NomEspcCit, CodProCit, NomProCit, TelPac) VALUES ?`;

        const values = citas.map(cita => [
            cita.NumCitPac, cita.TipDocPac, cita.NumDocPac, cita.NombPac, cita.EstCitPac, cita.NomEspCit, 
            cita.FchCitPac, cita.HorCitPac, cita.NomEspcCit, cita.CodProCit, cita.NomProCit, cita.TelPac
        ]);

        connection.query(insertQuery, [values], (error, results) => {
            if (error) {
                logError('Error al insertar en MySQL', error);
            } else {
               console.log(formattedMessageDate('Datos insertados en MySQL'), results);
            }
        });

        connection.release();
    } catch (error) {
        console.error('Error al conectar con MySQL', error);
    }
}

async function copyCitasToHistorico() {
    try {
        const connection = await new Promise((resolve, reject) => {
            poolMysql.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });
        });

        const insertQuery = 'INSERT INTO Citas_Historico SELECT * FROM Citas';

        connection.query(insertQuery, (error, results) => {
            const now = new Date();
            const options = { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };            const formattedDate = new Intl.DateTimeFormat('sv-SE', options).format(now).replace(' ', 'T') + 'Z';
            if (error) {
                logError('Error al conectar con MySQL para la copia', error);
            } else {
                console.log(formattedMessageDate('Datos copiados a Historico de Citas \n'), results);

            }
        });

        connection.release();
    } catch (error) {
        logError('Error al conectar con MySQL', error);
    }
}

// Función para escribir en el archivo de log
function logError(message, error) {
    const logFilePath = path.join(__dirname, 'errors.log');
    const logMessage = formattedMessageDate(message, error);
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de log', err);
        }
    });
}

function formattedMessageDate(message, status='') {
    const now = new Date();
    const options = { timeZone: 'America/Bogota', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Intl.DateTimeFormat('sv-SE', options).format(now).replace(' ', 'T') + 'Z';
    const logMessage = `[${formattedDate}]: ${message} ${status}\n`;
    return logMessage;
}

// Ejecutar la función connectSqlServer cada 60 segundos
setInterval(connectSqlServer, 10000);

// Programar la copia diaria a las 00:00 (medianoche)
cron.schedule('03 13 * * *', () => {
    console.log('\nEjecutando copia diaria de Historico de Citas');
    copyCitasToHistorico();
});