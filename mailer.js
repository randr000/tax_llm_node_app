require('dotenv').config();
const { selectAll, deleteAll } = require('./mysqlQueries');


selectAll().then(res => console.log(res));