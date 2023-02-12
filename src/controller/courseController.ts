import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createCourseDTO } from '../interfaces/DTO';
import { courseService } from '../service';

const makeCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const createCourseDto: createCourseDTO = req.body;
    try {
      const data = await courseService.createCourse(+userId, createCourseDto);
      return res
        .status(statusCode.CREATED)
        .send(success(statusCode.CREATED, message.CREATE_COURSE_SUCCESS, data));
    } catch (error) {
      next(error);
    }
  };

export default {
    makeCourse,
}