import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { IRequestWithUser } from "../../types";

const router = Router();

const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    const draws = await prisma.drawing.findMany({
        where: {
            userId: 1
        },
    })
    res.send(draws);
})

router.post('/new', async (req: IRequestWithUser, res) => {
    const { name, description } = req.body;
    console.log(req.user);
    const draw = await prisma.drawing.create({
        data: {
            name,
            userId: req.user.id
        }
    })
    res.send(draw);
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const draw = await prisma.drawing.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            strokes: {
                include: {
                    points: true
                }
            }
        }
    })
    res.send(draw);
})

export default router;