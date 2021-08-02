import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body;

    if(!name) {
        return res.status(400).json({msg: "Name required. Please add your name."})
    } else  if (name.length > 20) {
        return res.status(400).json({msg: "Your name should be less than 20 characters."})
    }

    if(!account) {
        return res.status(400).json({msg: "Email of phone number required. Please add your email address or phone number."})
    } else  if (!validatePhone(account) && !validateEmail(account)) {
        return res.status(400).json({msg: "Please enter valid phone number or email address."})
    }


    if (password.length < 6) {
        return res.status(400).json({msg: "Password must be at least 6 characters."})
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