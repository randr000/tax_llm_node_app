require('dotenv').config();
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const { selectAll, deleteAll } = require('./mysqlQueries');


// selectAll().then(res => console.log(res));

// selectAll().then(res => console.log(converter.json2csv(res, {checkSchemaDifferences: true, emptyFieldValue: null})));
// deleteAll();

// (async () => {
//     return converter.json2csv(await selectAll(), {checkSchemaDifferences: true, emptyFieldValue: null, delimiter: {field: "|"}});
// })().then(res => console.log(res));

// deleteAll();

const {GMAIL_APP_USER, GMAIL_APP_PASSWORD, GMAIL_APP_EMAIL_TO} = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_APP_USER,
        pass: GMAIL_APP_PASSWORD
    }
});

const mailOptions = {
    from: GMAIL_APP_USER,
    to: GMAIL_APP_EMAIL_TO,
    subject: 'Daily Ratings from Pub 17 App',
    text: 'testing',
    html: '<button>btn test</button>'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`Email sent successfully! info.response=${info.response}`);
});