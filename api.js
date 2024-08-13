
const pool = new sql.ConnectionPool(sqlConfig);
const poolMysql = mysql.createPool(mysqlConfig);

async function connectSqlServer() {
    try {
        await pool.connect();
        console.log('Conexión establecida con SQLServer');

        const today = new Date().toISOString().split('T')[0];

        const consulta = 
            `SELECT c.citnum NumCitPac, c.cittipdoc TipDocPac, c.citced NumDocPac, cb.MPNOMC NombPac, 
                CASE 
                    WHEN c.citesta = 'R' THEN 'RESERVADA' 
                    WHEN c.citesta = 'C' THEN 'CONFIRMADA' 
                    WHEN c.citesta = 'I' THEN 'INCUMPLIDA' 
                    WHEN c.citesta = 'N' THEN 'CANCELADA' END EstCitPac,
                m.menome NomEspCit, cast(c.CitFecPa as date) FchCitPac, CitHorIPa HorCitPac, md.mmnomm NomEspcCit, 
                CitProCod CodProCit, mp.prnomb NomProCit
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
        console.error('Error al conectar con SQLServer', error);
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

        console.log('Conexión establecida con MySQL');

        const insertQuery = `INSERT INTO Citas (NumCitPac, TipDocPac, NumDocPac, NombPac, EstCitPac, NomEspCit, FchCitPac, HorCitPac, NomEspcCit, CodProCit, NomProCit) VALUES ?`;

        const values = citas.map(cita => [
            cita.NumCitPac, cita.TipDocPac, cita.NumDocPac, cita.NombPac, cita.EstCitPac, cita.NomEspCit, 
            cita.FchCitPac, cita.HorCitPac, cita.NomEspcCit, cita.CodProCit, cita.NomProCit
        ]);

        connection.query(insertQuery, [values], (error, results) => {
            if (error) {
                console.error('Error al insertar en MySQL', error);
            } else {
                console.log('Datos insertados en MySQL', results);
            }
        });

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al conectar con MySQL', error);
    }
}

connectSqlServer();