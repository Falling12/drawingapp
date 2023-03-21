import { Router } from "express";
import { LastState, PrismaClient, Stroke } from "@prisma/client";
import { IRequestWithUser, IStroke } from "../../types";
import { filterExistingStrokes, deleteUnnecessary } from "../../utils/draws";

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
    let { id, strokes, image, lastState }: { id: number, strokes: IStroke[], image: string, lastState: LastState } = req.body;

    let ids = []
    let pointIds = []

    const dbStrokes = await prisma.stroke.findMany({
        where: {
            drawingId: Number(id)
        },
        include: {
            points: true
        }
    })

    deleteUnnecessary(strokes)
    deleteUnnecessary(dbStrokes)
    dbStrokes.forEach(element => {
        deleteUnnecessary(element.points)
    });
    strokes.forEach(element => {
        deleteUnnecessary(element.points)
    });

    
    for(let i = 0; i < strokes.length; i++) {
        const stroke = filterExistingStrokes(dbStrokes, strokes)[i];
        if(stroke === undefined) {
            break
        }
        const points = stroke.points;
        delete stroke.points;

        const newStroke = await prisma.stroke.create({
            // @ts-ignore
            data: {
                ...stroke,
                drawingId: Number(id)
            },
        })

        ids.push(newStroke.id)

        for(let j = 0; j < points.length; j++) {
            const point = points[j];
            const newPoint = await prisma.point.create({
                data: {
                    ...point,
                    strokeId: newStroke.id
                },
            })

            pointIds.push(newPoint.id)
        }

        // link points to stroke

        await prisma.stroke.update({
            where: {
                id: newStroke.id
            },
            data: {
                points: {
                    connect: pointIds.map(id => ({id}))
                }
            }
        })
    }

    let lastStateId
    //if lastState is undefined in db, create it
    if(!lastState.id) {
        const lastStateNew = await prisma.lastState.create({
            data: {
                ...lastState
            }
        })
        lastStateId = lastStateNew.id
    }else {
        await prisma.lastState.update({
            where: {
                id: lastState.id
            },
            data: {
                ...lastState
            }
        })
    }

    //link strokes to drawing
    await prisma.drawing.update({
        where: {
            id: Number(id)
        },
        data: {
            strokes: {
                connect: ids.map(id => ({id}))
            },
            lastState: {
                connect: {
                    id: lastState.id ? lastState.id : lastStateId
                }
            },
            image
        }
    })

    res.status(200).send({'message': 'Saved'});
})


router.post('/new', async (req: IRequestWithUser, res) => {
    const { name, description } = req.body;
    console.log(req.body)

    const lastState = await prisma.lastState.create({
        data: {
            scale: 1,
            offset: [0, 0],
            tool: 'pen',
        }
    })

    const draw = await prisma.drawing.create({
        // @ts-ignore
        data: {
            name,
            userId: req.user.id,
            lastStateId: lastState.id,
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
            },
            lastState: true
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