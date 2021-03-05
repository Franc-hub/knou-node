const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SG_API_KEY);


const sendEmail = (user) => {
    let msg = {
        to: user.email,
        from: {
            email: 'raul.salcedo03@hotmail.com',
            name: 'knou proyect'
        },
        subject: 'thank you for choosing knou',
        text: 'you are current logged',
    };
    sgMail.send(msg)
    .then(()=> {
        console.log('Email sent');
    })
    .catch ((error) => {
        console.log(error);
    });
}

module.exports = sendEmail;