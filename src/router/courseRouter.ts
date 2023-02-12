import { Router } from 'express';
import { body, param } from 'express-validator';
import { courseController } from '../controller';

const router: Router = Router();

router.post(
    '/draw/:userId',
    [param('userId').notEmpty()],
    courseController.makeCourse,
)
router.delete(
    '/draw/:courseId',
    [param('courseId').notEmpty()],
    courseController.deleteCourse,
)
router.get(
    '/draw/:userId',
    [param('userId').notEmpty()],
    courseController.getMyCourse,
)
export default router;