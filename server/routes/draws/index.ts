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

router.post('/', async (req: IRequestWithUser, res) => {
    console.log(JSON.stringify(req.body))
    const { id, strokes } = req.body;

    console.log(req.body);

    const draw = await prisma.drawing.update({
        where: {
            id: Number(id)
        },
        data: {
            strokes: {
                connectOrCreate: strokes.map((stroke: any, index: number) => {
                    console.log(index);
                    return {
                        where: {
                            id: index
                        },
                        create: {
                            points: {
                                create: stroke.points
                            }
                        }
                    }
                })
            }
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