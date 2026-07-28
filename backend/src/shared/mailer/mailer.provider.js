import nodemailer from 'nodemailer';
import { PATHS } from '#config/paths.js';

let transporter;

const getTransporter = () => {
    if (transporter) return transporter;

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    return transporter;
}

export const sendMail = async (options) => {
    const { attachments = [], ...mailDetails } = options;

    const defaultAttachments =  [
        {
            filename: 'logo.png',
            path: PATHS.logo,
            cid: 'logo'
        }
    ]

    const transporter = getTransporter();

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        ...mailDetails,
        attachments: [...defaultAttachments, ...attachments ]
    });
}
