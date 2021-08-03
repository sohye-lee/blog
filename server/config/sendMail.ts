const nodemailer = require('nodemailer');
import { OAuth2Client } from 'google-auth-library';

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

// SEND EMAIL
const sendEmail = async (to: string, url: string, txt: string) => {
    const oAuth2Client = new OAuth2Client(
        CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
    )

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    try {
        const access_token = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                access_token
            }
        });

        const mailOptions = {
            from: SENDER_MAIL,
            to: to,
            subject: 'Please verify email address!',
            html: `
                <div style="width: 80%; max-width=500px; margin: 50px auto; border: 10px solid #ddd; padding: 50px; font-size: 110%;">
                    <h1 style="text-align: center; text-transform: uppercase; color: crimson">Welcome To 2:15PM !</h1>
                    <p style="text-align: center;">Congratulations! You're almost set to start blogging on 2:15PM. <br/>
                        Just click the button below to validate your email address.
                    </p>
                    <div style="width: 100%; display: flex; justify-content: center">
                        <a href=${url} style="text-align: center; background-color: crimson; text-decoration: none; color: white; padding: 15px 30px; margin: 20px auto;">${txt}</a>
                    </div>
                    <p style="color: gray;">If the button doesn't work for any reason, you can also click on the link below:</p>
                    <div>${url}</div>
                </div>
            `
        }

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (err) {
        console.log(err);
        // return err;
    }
}

export default sendEmail;