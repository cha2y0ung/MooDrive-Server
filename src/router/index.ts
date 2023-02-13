import { Router } from 'express';
import courseRouter from './courseRouter';
import driveRouter from './driveRouter';

const router: Router = Router();

router.use('/course', courseRouter);
router.use('/drive', driveRouter);

export default router;