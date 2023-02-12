import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createCourseDTO } from '../interfaces/DTO';
import { courseService } from '../service';
import { NetConnectOpts } from 'net';
import { nextTick } from 'process';
import { userInfo } from 'os';

const makeCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
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

const scrapCourse = async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  const { userId } = req.body
  try {
    const data = await courseService.scrapCourse(+courseId, +userId);
    return res 
      .status(statusCode.CREATED)
      .send(success(statusCode.CREATED, message.SCRAP_COURSE_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

const deleteScrap = async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  const { userId } = req.body;
  try {
    const data = await courseService.deleteScrap(+courseId, +userId);
    return res
        .status(statusCode.OK)
        .send(success(statusCode.OK, message.DELETE_SCRAP_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

export default {
    makeCourse,
    deleteCourse,
    getMyCourse,
    scrapCourse,
    deleteScrap,
}