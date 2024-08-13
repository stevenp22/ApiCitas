// verificarPaciente.js
const { poolMysql } = require('./dbConfig');

function verificarPaciente(tipoDocumento, numeroDocumento, callback) {
    
    const query = 'SELECT * FROM Citas WHERE TipDocPac = ? AND NumDocPac = ?';
    poolMysql.query(query, [tipoDocumento, numeroDocumento], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        if (results.length > 0) {
            return callback(null, results);
        } else {
            return callback(null, []);
        }
    });
}

module.exports = { verificarPaciente };