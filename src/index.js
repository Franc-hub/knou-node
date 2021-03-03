const { start } = require('./server');
const sgMail = require('@sendgrid/mail');
var path = require('path');
global.appRoot = path.resolve(__dirname);

start();

sgMail.setApiKey('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');
let msg = {
    to: 'raul.salcedo03@hotmail.com',
    from: {
        email: 'raul.salcedo03@hotmail.com',
        name: 'knou proyect'
    },
    subject: 'thank you for choosing knou',
    text: 'you are current logged',
};
sgMail.send(msg);
