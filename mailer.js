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
    const dateStr = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`
    const subject = `Daily Ratings from Pub 17 App ${dateStr}`;
    const filename = `${dateStr}-2023-Pub-17-Response-Ratings.csv`;

    const mailOptions = {
        from: GMAIL_APP_USER,
        to: GMAIL_APP_EMAIL_TO,
        subject: subject,
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

const mailer = async (deleteAllRecords=true) => {
    try {
        const rows = await selectAll();
        // Only send email if there are records in the database
        if (!rows.length) return;
        const csv = converter.json2csv(rows, {checkSchemaDifferences: true, emptyFieldValue: null, delimiter: {field: "|"}});
        const html = await generateHTMLTable(rows);
        sendMail(csv, html);
        deleteAllRecords && deleteAll();
    } catch (error) {
        console.log(error);
        console.log('Error sending email');
    }
};

module.exports = mailer;