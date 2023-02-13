import { Router } from 'express';
import { body, param } from 'express-validator';
import { driveController } from '../controller';

const router: Router = Router();

router.post(
    '/:courseId',
    [param('courseId').notEmpty()],
    driveController.makeDrive,
)
router.get(
    '/:userId',
    [param('userId').notEmpty()],
    driveController.getMyDrive,
)
router.patch(
    '/:driveId',
    [param('driveId').notEmpty()],
    driveController.updateDrive,
)

export default router;