import { Router } from 'express';
import { body, param } from 'express-validator';
import { driveController } from '../controller';

const router: Router = Router();

router.get(
    '/:courseId',
    [param('courseId').notEmpty()],
    driveController.makeDrive,
)

export default router;