const { Resend } = require('resend');

const sendEmail = async ({ to, subject, html, from }) => {
    const resendApiKey = process.env.RESEND_EMAIL_API_KEY;
    const defaultFrom = process.env.DEFAULT_FROM_EMAIL || 'no-reply@raorajan.pro';
    
    if (!resendApiKey) {
        console.warn('No RESEND_EMAIL_API_KEY provided.');
        return null;
    }
    const resend = new Resend(resendApiKey);
    return await resend.emails.send({
        from: from || defaultFrom,
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
