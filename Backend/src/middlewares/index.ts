import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../models/authmodels';
import  dotenv  from 'dotenv';
import path from 'path'



export interface ExtendedRequest1 extends Request{
    info?:Payload
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
export function isAdmin(req: ExtendedRequest1, res: Response, next: NextFunction) {
    if (req.info?.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    next();
}
