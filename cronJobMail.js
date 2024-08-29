const cron = require('node-cron');
const mailer = require('./mailer');

// Run once everyday at 10pm
cron.schedule('0 22 * * *', () => {
    mailer();
    console.log('cron ran');
});