require('dotenv').config();
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const { selectAll, deleteAll } = require('./mysqlQueries');
const { generateHTMLTable } = require('./generateHTMLTable');


// selectAll().then(res => console.log(res));

// selectAll().then(res => console.log(converter.json2csv(res, {checkSchemaDifferences: true, emptyFieldValue: null})));
// deleteAll();

// (async () => {
//     return converter.json2csv(await selectAll(), {checkSchemaDifferences: true, emptyFieldValue: null, delimiter: {field: "|"}});
// })().then(res => console.log(res));

// deleteAll();

const {GMAIL_APP_USER, GMAIL_APP_PASSWORD, GMAIL_APP_EMAIL_TO} = process.env;



// selectAll().then(rows => generateHTMLTable(rows)).then(html => mailOptions.html = html);

function sendMail(html) {

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
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log(`Email sent successfully! info.response=${info.response}`);
    });
}

(async () => {
    const rows = await selectAll();
    const html = await generateHTMLTable(rows);
    sendMail(html);
})();