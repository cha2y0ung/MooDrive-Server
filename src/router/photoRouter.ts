import { Router } from 'express';
import { body, param } from 'express-validator';
import { photoController } from '../controller';
import { upload } from '../middleware';

const router: Router = Router();

router.post(
    '/:courseId',
    [param('courseId').notEmpty()],
    upload.single('photoUrl'),
    photoController.uploadPhoto,
)

router.get(
    '/:courseId',
    [param('courseId').notEmpty()],
    photoController.getPhoto,
)

export default router;