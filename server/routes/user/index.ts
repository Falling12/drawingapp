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
    console.log(JSON.stringify(req.headers));
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     prisma.user.findUnique({
    //         where: {
    //             id: decoded.id
    //         },
    //         include: {
    //             drawings: true
    //         }
    //     }).then(user => {
    //         delete user.password;
    //         res.send(user);
    //     })
    // } catch (error) {
    //     res.status(400).send('Invalid token');
    // }
    res.status(200).send('ok')
})

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name: username,
            password: hashedPassword,
            email
        }
    });
    res.send(user);
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(400).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.send({
        status: 'success',
        token: token
    });
})

export default router;