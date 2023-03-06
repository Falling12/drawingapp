import { Router } from "express";
import userRouter from './user/index';
import drawRouter from './draws/index';
import { verifyToken } from "../middlewares/user";

const router = Router();

router.use('/user', userRouter);
router.use('/draws', verifyToken, drawRouter);

export default router;