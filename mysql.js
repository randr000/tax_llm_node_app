require('dotenv').config();
const mysql = require('mysql2');

const {MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MY_SQL_HOST, MY_SQL_PORT} = process.env;

const connection = mysql.createConnection({
    host: MY_SQL_HOST,
    port: MY_SQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
});

function esc(value) {
    return connection.escape(value);
}

function handleConnections(func) {
    connection.connect();
    func();
    connection.end();
}

function selectAll() {
    const query = () => {
        connection.query({sql: "SELECT * FROM query_ratings", timeout: 100_000}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log(`results: ${results}`);
        })
    }
    handleConnections(query);
}

selectAll();