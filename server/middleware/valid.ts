import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body;

    const errors = [];

    if(!name) {
        errors.push( "Name required. Please add your name.");
    } else  if (name.length > 20) {
        errors.push("Your name should be less than 20 characters.")
    }

    if(!account) {
        errors.push("Email of phone number required. Please add your email address or phone number.");
    } else  if (!validatePhone(account) && !validateEmail(account)) {
        errors.push("Please enter valid phone number or email address.");
    }


    if (password.length < 6) {
        errors.push("Password must be at least 6 characters.")
    }

    if(errors.length > 0) {
        return res.status(400).json({msg: errors})
    } 
    next();
}

export function validatePhone(phoneNum: string) {
    const re = /^[+]/g;
    return re.test(String(phoneNum));
}

export function validateEmail(emailAddress: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
}