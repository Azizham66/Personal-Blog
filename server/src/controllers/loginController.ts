import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const AUTHOR_EMAIL = process.env.AUTHOR_EMAIL
const AUTHOR_USERNAME =  process.env.AUTHOR_USERNAME
const AUTHOR_PASSWORD_HASH = process.env.AUTHOR_PASSWORD_HASH

export const loginController = async (req: Request, res: Response) => {
    const {user, password} = req.body;

    const isAuthor = user === AUTHOR_EMAIL || user === AUTHOR_USERNAME

    if (!JWT_SECRET || !AUTHOR_EMAIL || !AUTHOR_USERNAME || !AUTHOR_PASSWORD_HASH) {
        res.status(500).json({ message: "Internal server error" })
        throw new Error("Missing environment variables")
    }

    if (!user || !password) 
        return res.status(400).json({ message: "Email or password is missing!" })

    if (!isAuthor) 
        return res.status(401).json({ message: "Email, username or password is incorrect, try again later." });

    const isPasswordValid = await bcrypt.compare(password, AUTHOR_PASSWORD_HASH);

    if (!isPasswordValid) 
        return res.status(401).json({ message: "Email, username or password is incorrect, try again later." })

    const token = jwt.sign({
        identifier: user,
        userRole: "author"
    },
    JWT_SECRET,
    {expiresIn: "10d"}
    )

    res.status(200).json({token})
}

 