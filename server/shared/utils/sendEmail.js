const { Resend } = require('resend');

const sendEmail = async ({ to, subject, html }) => {
    const resendApiKey = process.env.RESEND_EMAIL_API_KEY;
    if (!resendApiKey) {
        console.warn('No RESEND_EMAIL_API_KEY provided.');
        return null;
    }
    const resend = new Resend(resendApiKey);
    return await resend.emails.send({
        from: 'no-reply@raorajan.pro',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
