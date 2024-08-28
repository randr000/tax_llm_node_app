require('dotenv').config();
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const { selectAll, deleteAll } = require('./mysqlQueries');


// selectAll().then(res => console.log(res));

// selectAll().then(res => console.log(converter.json2csv(res, {checkSchemaDifferences: true, emptyFieldValue: null})));
// deleteAll();

(async () => {
    return converter.json2csv(await selectAll(), {checkSchemaDifferences: true, emptyFieldValue: null, delimiter: {field: "|"}});
})().then(res => console.log(res));

// deleteAll();