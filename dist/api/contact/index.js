"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class Contact {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'info@eibo.io',
                pass: 'eibo2017'
            }
        });
    }
    sendMail(data) {
        let message = `
            <table>
                <tr>
                    <th style="text-align:right;padding: 4px;">From:</th>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <th style="text-align:right;padding: 4px;">Email:</th>
                    <td>${data.email}</td>
                </tr>
                <tr>
                    <th style="text-align:right;padding: 4px;">Message:</th>
                    <td>${data.message}</td>
                </tr>
                <tr>
                    <th style="text-align:right;padding: 4px;">Time:</th>
                    <td>${new Date().toLocaleString("en-UK", { timeZone: "Asia/Jerusalem", hour12: false })}</td>
                </tr>
            </table>
        `;
        let mailOptions = {
            from: `"contact form" <info@eibo.io>`,
            to: 'info+contact@eibo.io',
            subject: 'Contact form sent from eibo.io',
            text: message,
            html: message
        };
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                resolve();
            });
        });
    }
}
exports.Contact = Contact;
//# sourceMappingURL=index.js.map