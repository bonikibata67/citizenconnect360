import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DbHelper } from "../databasehelpers";
import { User } from "../models/authmodels";
import { v4 as uid } from 'uuid';
import dotenv from 'dotenv'
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbHelper = new DbHelper();

export const registerUser = async (req: Request, res: Response) => {
    const id =uid()
    const { Username, Email, Password, RoleID } = req.body;

    try {
        console.log("Request Body: ", req.body);

        if (!Username || !Email || !Password || RoleID == null) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = {
            Id: id,
            Username,
            Email,
            Password: hashedPassword,
            isDeleted: 0,
            isEmailSent: 0,
            RoleID
        };

        await dbHelper.exec('AddUser', {
            Id: newUser.Id,
            username: newUser.Username,
            email: newUser.Email,
            password: newUser.Password,
            roleid: newUser.RoleID
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
export const loginUser = async (req: Request, res: Response) => {
    const { Username, Password } = req.body;

    try {
        const user = await dbHelper.getUser(Username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ Sub: user.Id, Username: user.Username, role: user.RoleID }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};


export const welcomePage = (req: Request, res: Response) => {
    res.status(200).json({ message: `Welcome, ${req.body.user.Username}!` });
};
