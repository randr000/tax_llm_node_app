require('dotenv').config();
const mysql = require('mysql2');

const {MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MY_SQL_HOST, MY_SQL_PORT} = process.env;
connTimeout = {timeout: 100_000};

function createConn() {
    return mysql.createConnection({
        host: MY_SQL_HOST,
        port: MY_SQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
    });
}

function esc(value, connection) {
    return connection.escape(value);
}

function handleConnections(func, connection) {
    connection.connect();
    func();
    connection.end();
}

function selectAll() {

    return new Promise((resolve, reject) => {
        const connection = createConn();
        const query = () => {
            const sql = "SELECT * FROM query_ratings;";
            connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(results);
                };
            });
        };
        handleConnections(query, connection);
    });
}

function insertInto({userMsg, botMsg, ratingValue}) {
    const connection = createConn();
    const query = () => {
        const sql = `
        INSERT INTO query_ratings (user_query, bot_response, rating)
        VALUES (${esc(userMsg.slice(0, 300), connection)}, ${esc(botMsg.slice(0, 5000), connection)}, ${esc(ratingValue, connection)});
        `;
        connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log('Insert was successful');
        });
    };
    handleConnections(query, connection);
}

function deleteAll() {
    const connection = createConn();
    const query = () => {
        const sql = "DELETE FROM query_ratings;";
        connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log('Delete was successful');
        });
    };
    handleConnections(query, connection);
}

module.exports = {
    selectAll, insertInto, deleteAll
};