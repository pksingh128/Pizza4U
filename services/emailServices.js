const nodemailer = require('nodemailer');
async function sendMail({from, to, subject, text, html}){
    try{
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,

        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },

    });
    let info = await transporter.sendMail({
        from: `"Pizza corner" <${from}>`,
        to,
        subject,
        text,
        html

    });
} catch(e){
    console.log(e);
}
}

module.exports =sendMail;