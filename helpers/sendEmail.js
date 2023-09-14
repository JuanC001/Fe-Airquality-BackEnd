import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, message) => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: message
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {

        console.log('[EMAIL] Error enviando un email: ' + error)

    }

}