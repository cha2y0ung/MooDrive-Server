import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createCourseDTO, searchCourseDTO} from '../interfaces/DTO';
import { courseService } from '../service';
import { NetConnectOpts } from 'net';
import { nextTick } from 'process';
import { userInfo } from 'os';
import { coorConvertPath } from "../modules/convert/coorConvertPath"
import axios from 'axios';
import { getAxiosFromNaverApi } from '../modules/axios'

const makeCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    const createCourseDto: createCourseDTO = {
      description: req.body.description,
      totalTime: req.body.totalTime,
      startLocation: req.body.startLocation,
      startDetail: req.body.startDetail,
      endLocation: req.body.endLocation,
      endDetail: req.body.endDetail,
      hashtag: req.body.hashtag,
      music: req.body.music,
      scrap: req.body.scrap,
      color1: req.body.color1,
      color2: req.body.color2,
      path: coorConvertPath(req.body.path)
    }
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

const getMyScrap = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const data = await courseService.getMyScrap(+userId);
    return res 
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_MY_SCRAP_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

const getDetailCourse = async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  try {
    const data = await courseService.getDetailCourse(+courseId);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_DETAIL_COURSE_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

const searchCourse = async (req: Request, res: Response, next: NextFunction) => {
  const { totalTime } = req.params;
  const { startLocation } = req.params;
  try {
    const data = await courseService.searchCourse(+totalTime, startLocation);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.SEARCH_COURSE_SUCCESS, data))
  } catch (error) {
    next(error);
  }
}

const getNaverData = async (req: Request, res: Response, next: NextFunction) => {
  const { coords } = req.params;
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${coords}&orders=roadaddr&output=json`
  try {
    const data = await getAxiosFromNaverApi(url);

    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_NAVER_DATA_SUCCESS, data))
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
    getMyScrap,
    getDetailCourse,
    searchCourse,
    getNaverData
}