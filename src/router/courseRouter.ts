import { Router } from 'express';
import { body, param } from 'express-validator';
import { courseController } from '../controller';

const router: Router = Router();

router.post(
    '/draw',
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
router.post(
    '/scrap/:courseId',
    [param('courseId').notEmpty()],
    courseController.scrapCourse,
)
router.delete(
    '/scrap/:courseId',
    [param('courseId').notEmpty()],
    courseController.deleteScrap,
)
router.get(
    '/scrap/:userId',
    [param('userId').notEmpty()],
    courseController.getMyScrap,
)
router.get(
    '/detail/:courseId',
    [param('courseId').notEmpty()],
    courseController.getDetailCourse,
)
router.get(
    '/search',
    courseController.searchCourse,
)

export default router;