import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    res.send('Hello User');
})

router.get('/me', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.send(decoded);
    } catch (error) {
        res.status(400).send('Invalid token');
    }
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
})


export default router;