import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createCourseDTO } from '../interfaces/DTO';
import { courseService } from '../service';
import { NetConnectOpts } from 'net';

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

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    try{
      const data = await courseService.deleteCourse(+courseId);
      return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.DELETE_COURSE_SUCCESS, data))
    } catch (error) {
      next(error);
    }
};

const getMyCourse = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const data = await courseService.getMyCourse(+userId);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_MY_COURSE_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

export default {
    makeCourse,
    deleteCourse,
    getMyCourse,
}