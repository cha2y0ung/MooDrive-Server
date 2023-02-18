import { Router } from 'express';
import courseRouter from './courseRouter';
import driveRouter from './driveRouter';
import photoRouter from './photoRouter';

const router: Router = Router();

router.use('/course', courseRouter);
router.use('/drive', driveRouter);
router.use('/photo', photoRouter)

export default router;