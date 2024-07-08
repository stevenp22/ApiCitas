require('dotenv').config();

const sql = require('mssql');
const mysql = require('mysql');

const sqlConfig = {
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_HOST,
    port: parseInt(process.env.SQL_PORT),
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: false
    }
};
const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const pool = new sql.ConnectionPool(sqlConfig);
const poolMysql = mysql.createPool(mysqlConfig);

async function connectSqlServer() {
    try {
        await pool.connect();
        console.log('Conexión establecida con SQLServer');
    } catch (error) {
        console.error('Error al conectar con SQLServer', error);
    }
}

async function connectToMysql() {
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
        
        // 

        connection.release(); // Liberar la conexión después de usarla
    } catch (error) {
        console.error('Error al conectar con MySQL', error);
    }
}

connectSqlServer();
connectToMysql();
