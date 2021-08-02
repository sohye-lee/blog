import { generateAccessToken } from './../config/generateToken';
import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateActiveToken } from '../config/generateToken';
import sendEmail from '../config/sendMail';
import { validateEmail, validatePhone } from '../middleware/valid';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
    register: async(req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body;
            const user = await User.findOne({account})

            if (user) {
                return res.status(400).json({msg: 'Email or phone already exists!'})
            } 

            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = {
                name,
                account,
                password: passwordHash
            };
            
            const active_token = generateActiveToken({newUser});
            const url = `${CLIENT_URL}/active/${active_token}`;
          
            if(validateEmail(account)) {
                sendEmail(account, url,'Please verify your email address.');
                return res.json({
                    msg: "Success! Please check your email."
                })
            }

            // res.json({
            //     status: 'OK',
            //     msg: 'New user registered successfully!', 
            //     data: newUser,
            //     active_token
            // });
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default authCtrl;
