const cron = require('node-cron');
const mailer = require('./mailer');

// Run everyday at 10pm
cron.schedule('0 10 * * *', () => {
    mailer();
    console.log('cron ran');
});