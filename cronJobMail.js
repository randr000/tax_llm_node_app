const cron = require('node-cron');
const mailer = require('./mailer');

// Run once everyday at 11:59pm (23:59)
const task = cron.schedule('59 23 * * *', () => {
    mailer();
    console.log('cron ran');
}, {
    scheduled: false,
    timezone: 'America/New_York'
});

task.start();