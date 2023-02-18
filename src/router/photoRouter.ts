import { Router } from 'express';
import { body, param } from 'express-validator';
import { photoController } from '../controller';
import { upload } from '../middleware';

const router: Router = Router();

router.post(
    '/:courseId',
    [param('courseId').notEmpty()],
    upload.single(),
    photoController.uploadPhoto,
)

export default router;