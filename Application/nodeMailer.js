import nodemailer from 'nodemailer'
import { emailName, emailAppPassword } from '../utilities/config/config.js';


const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: emailName,
            pass: emailAppPassword
        }
    }
);
export default async function({title,text,targetEmail}){

    const mailOptions = {
        from: "Float Team",
        to: targetEmail,
        subject:title,
        text:text
    };

    return await transporter.sendMail(mailOptions);
}