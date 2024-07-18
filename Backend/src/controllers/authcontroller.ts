import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DbHelper } from "../databasehelpers";
import { User } from "../models/authmodels";
import {v4 as uid} from 'uuid'


const dbHelper = new DbHelper();

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password, roleId } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            Id: uid(),
            Username: username,
            Email: email,
            Password: hashedPassword,
            isDeleted: 0,
            isEmailSent: 0,
            RoleID: roleId
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
        res.status(500).json({ error});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await dbHelper.query(`SELECT * FROM Users WHERE Email = '${email}' AND isDeleted = 0`);
        const user = result.recordset[0];

        if (user && await bcrypt.compare(password, user.Password)) {
            const token = jwt.sign({ Sub: user.Id, Username: user.Username, role: user.RoleID }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const welcomePage = (req: Request, res: Response) => {
    res.status(200).json({ message: `Welcome, ${req.body.user.Username}!` });
};