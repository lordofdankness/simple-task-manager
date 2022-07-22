const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = function (email, name) {
    sgMail.send({
        to: email,
        from: 'lordofdankness@yandex.com',
        subject: 'Welcome to the Task Manager App.',
        text: `Welcome ${name} I hope you enjoy the app.`,
        // html: ''
    });
};


module.exports = {
    sendWelcomeEmail
};