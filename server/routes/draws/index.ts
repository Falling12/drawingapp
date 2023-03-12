import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { IRequestWithUser } from "../../types";

const router = Router();

const prisma = new PrismaClient()

router.get('/', async (req: IRequestWithUser, res) => {
    const draws = await prisma.drawing.findMany({
        where: {
            userId: req.user.id
        },
    })
    res.send(draws);
})

router.post('/', async (req: IRequestWithUser, res) => {
    console.log(JSON.stringify(req.body))
    const { id, strokes } = req.body;

    console.log(req.body);
    const stroke = await prisma.stroke.createMany({
        data: strokes.map((stroke: any) => ({
            drawingId: id,
            points: {
                createMany: {
                    data: stroke.points.map((point: any) => ({
                        x: point.x,
                        y: point.y
                    }))
                }
            }
        }))
    })

    res.send(stroke);
})


router.post('/new', async (req: IRequestWithUser, res) => {
    const { name, description } = req.body;
    console.log(req.body)
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.drawing.delete({
        where: {
            id: Number(id)
        }
    })
    res.status(200).send({'message': 'Deleted'});
})

export default router;