require('dotenv').config();
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const { selectAll, deleteAll } = require('./mysqlQueries');


// selectAll().then(res => console.log(res));

selectAll().then(res => converter.json2csv(res, {checkSchemaDifferences: true, emptyFieldValue: null})).then(res => console.log(res));