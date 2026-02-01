import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


interface JwtPayload {
  identifier: string;
  userRole: "author";
  iat: number;
  exp: number;
}

export interface AuthorRequest extends Request  {
    user?: JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (
    req: AuthorRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1]
    if (!JWT_SECRET) 
        throw new Error("Configuration error.")

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next()
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}