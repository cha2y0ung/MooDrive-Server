import { Router } from 'express';
import { body, param } from 'express-validator';
import { courseController } from '../controller';

const router: Router = Router();

router.post(
    '/draw/:userId',
    [param('userId').notEmpty()],
    courseController.makeCourse,
)
export default router;