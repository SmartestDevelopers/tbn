import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: process.env.MAIL_ENCRYPTION === 'ssl',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
})

export const sendMail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
            to,
            subject,
            html,
        })
        return { success: true }
    } catch (error) {
        console.error('Mail Error:', error)
        return { success: false, error }
    }
}
