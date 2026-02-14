import type { Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()

const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL;
const AUTHOR_USERNAME =  process.env.AUTHOR_USERNAME;

export const userController = (req: Request, res: Response) => {
    if (!AUTHOR_EMAIL || !AUTHOR_USERNAME) 
        return res.status(500).json({ message: "Internal server error."})

    return res.status(200).json({
        name: "Abdulaziz Hamzah",
        username: AUTHOR_USERNAME,
        email: AUTHOR_EMAIL,
        bio: "No one sees this, who cares"
    })
}
