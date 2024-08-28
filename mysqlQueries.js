require('dotenv').config();
const mysql = require('mysql2');

const {MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MY_SQL_HOST, MY_SQL_PORT} = process.env;
connTimeout = {timeout: 100_000};

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
        const sql = "SELECT * FROM query_ratings;";
        connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log(`results: ${results}`);
        });
    };
    handleConnections(query);
}

function insertInto({userMsg, botMsg, ratingValue}) {
    const query = () => {
        const sql = `
        INSERT INTO query_ratings (user_query, bot_response, rating)
        VALUES (${esc(userMsg)}, ${esc(botMsg)}, ${esc(ratingValue)});
        `;
        connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log('Insert was successful');
        });
    };
    handleConnections(query);
}

function deleteAll() {
    const query = () => {
        const sql = "DELETE FROM query_ratings;";
        connection.query({...connTimeout, sql: sql}, (error, results, fields) => {
            if (error) console.log(error);
            else console.log('Delete was successful');
        });
    };
    handleConnections(query);
}

module.exports = {
    selectAll, insertInto, deleteAll
};