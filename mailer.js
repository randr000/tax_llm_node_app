require('dotenv').config();
const nodemailer = require('nodemailer');
const converter = require('json-2-csv');
const { selectAll, deleteAll } = require('./mysqlQueries');
const { generateHTMLTable } = require('./generateHTMLTable');

const {GMAIL_APP_USER, GMAIL_APP_PASSWORD, GMAIL_APP_EMAIL_TO} = process.env;

function sendMail(csv, html) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: GMAIL_APP_USER,
            pass: GMAIL_APP_PASSWORD
        }
    });
    
    const today = new Date();
    const filename = `${today.getFullYear()}-${today.getMonth().toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}-2023-Pub-17-Response-Ratings.csv`;

    const mailOptions = {
        from: GMAIL_APP_USER,
        to: GMAIL_APP_EMAIL_TO,
        subject: 'Daily Ratings from Pub 17 App',
        attachments: [{
            filename: filename,
            content: csv,
            contentType: 'text/csv'
        }],
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log(`Email sent successfully! info.response=${info.response}`);
    });
}

;(async () => {
    try {
        const rows = await selectAll();
        const csv = converter.json2csv(rows, {checkSchemaDifferences: true, emptyFieldValue: null, delimiter: {field: "|"}});
        const html = await generateHTMLTable(rows);
        sendMail(csv, html);
    } catch (error) {
        console.log(error);
        console.log('Error sending email');
    }
})();