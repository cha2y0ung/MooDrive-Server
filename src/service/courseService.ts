import { PrismaClient } from '@prisma/client';
import { selectFields } from 'express-validator/src/select-fields';
import { stringify } from 'querystring';
import { createCourseDTO, searchCourseDTO } from '../interfaces/DTO';
import { message, statusCode } from '../modules/constants';
import dayjs from 'dayjs';
import errorGenerator from '../middleware/errorGenerator'
import { pathConvertCoor } from "../modules/convert/pathConvertCoor";

const prisma = new PrismaClient();

const createCourse = async (userId: number, createCourseDto: createCourseDTO) => {
  try {
    const course = await prisma.course.create({
      data: {
        userId: userId,
        description: createCourseDto.description,
        totalTime: createCourseDto.totalTime,
        startLocation: createCourseDto.startLocation,
        startDetail: createCourseDto.startDetail,
        endLocation: createCourseDto.endLocation,
        endDetail: createCourseDto.endDetail,
        hashtag: createCourseDto.hashtag,
        music: createCourseDto.music,
        scrap: createCourseDto.scrap,
        color1: createCourseDto.color1,
        color2: createCourseDto.color2,
        path: createCourseDto.path
      }
    });
    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteCourse = async (courseId: number) => {
  try{
    const course = await prisma.course.delete({
      where: {
        courseId: courseId,
      }
    })
    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getMyCourse = async (userId: number) => {
  try{
    const course = await prisma.course.findMany({
      where: {
        userId: userId,
      }
    })
    const data = await Promise.all(
      course.map((data: any) => {
        const result = {
          userId: data.userId,
          courseId: data.courseId,
          description: data.description,
          totalTime: data.totalTime,
          startLocation: data.startLocation,
          startDetail: data.startDetail,
          endLocation: data.endLocation,
          endDetail: data.endDetail,
          hashtag: data.hashtag,
          music: data.music,
          scrap: data.scrap,
          color1: data.color1,
          color2: data.color2,
          path: pathConvertCoor(data.path),
          createdAt: dayjs(data.createdAt).format('YYYY-MM-DD'),
        };
        return result;
      }),
    )
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const scrapCourse = async (courseId: number, userId: number) => {
  try{
    const number = await prisma.scrap.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    })
    if (number) {
      message: "이미 스크랩되었습니다"
    }
    else {
    const scrap = await prisma.scrap.create({
      data: {
        courseId: courseId,
        userId: userId,
        
      }
    })
    const scrapNumber = await prisma.scrap.count({
      where: {
        courseId: courseId,
      }
    })
    const scrapUpdate = await prisma.course.update({
      where: {
        courseId: courseId
      },
      data: {
        scrap: scrapNumber
      }
    })
    return scrapUpdate && scrap
  }
  } catch(error) {
    console.log(error);
    throw error;
  }
}

const deleteScrap = async (courseId: number, userId: number) => {
  try{
    const number = await prisma.scrap.findFirst({
      where: {
        userId: userId,
        courseId: courseId
      }
    })
    if (number) {
      const scrap = await prisma.scrap.deleteMany({
        where: {
          userId: userId,
          courseId: courseId
        }
      })
    const scrapNumber = await prisma.scrap.count({
      where: {
        courseId: courseId,
      }
    })
    const scrapUpdate = await prisma.course.update({
      where: {
        courseId: courseId
      },
      data: {
        scrap: scrapNumber
      }
    })
    return scrap && scrapUpdate
  }
  else {
    message: "스크랩 된적 없음"
  }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getMyScrap = async (userId: number) => {
  try{
    const scraps = await prisma.scrap.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: true
      }
    })
    const data = await Promise.all(
      scraps.map((data: any) => {
        const result = {
          userId: data.course.userId,
          courseId: data.course.courseId,
          description: data.course.description,
          totalTime: data.course.totalTime,
          startLocation: data.course.startLocation,
          startDetail: data.course.startDetail,
          endLocation: data.course.endLocation,
          endDetail: data.course.endDetail,
          hashtag: data.course.hashtag,
          music: data.course.music,
          scrap: data.course.scrap,
          color1: data.course.color1,
          color2: data.course.color2,
          path: pathConvertCoor(data.course.path),
          createdAt: dayjs(data.course.createdAt).format('YYYY-MM-DD'),
        };
        return result;
      }),
    )
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getDetailCourse = async (courseId: number) => {
  try{
    const course = await prisma.course.findMany({
      where: {
        courseId: courseId,
      }
    })
    const data = await Promise.all(
      course.map((data: any) => {
        const result = {
          userId: data.userId,
          courseId: data.courseId,
          description: data.description,
          totalTime: data.totalTime,
          startLocation: data.startLocation,
          startDetail: data.startDetail,
          endLocation: data.endLocation,
          endDetail: data.endDetail,
          hashtag: data.hashtag,
          music: data.music,
          scrap: data.scrap,
          color1: data.color1,
          color2: data.color2,
          path: pathConvertCoor(data.path),
          createdAt: dayjs(data.createdAt).format('YYYY-MM-DD'),
        };
        return result;
      }),
    )
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const searchCourse = async (searchCourseDto: searchCourseDTO) => {
  try{
    const course = await prisma.course.findMany({
      where: {
        startLocation: searchCourseDto.startLocation,
        totalTime: searchCourseDto.totalTime,
        hashtag: searchCourseDto.hashtag
      },
      orderBy: {
        scrap: 'desc'
      }
    })
    if (!course) {
      throw errorGenerator({
        msg: message.NOT_FOUND,
        statusCode: statusCode.NOT_FOUND,
      })
    }
    const data = await Promise.all(
      course.map((data: any) => {
        const result = {
          userId: data.userId,
          courseId: data.courseId,
          description: data.description,
          totalTime: data.totalTime,
          startLocation: data.startLocation,
          startDetail: data.startDetail,
          endLocation: data.endLocation,
          endDetail: data.endDetail,
          hashtag: data.hashtag,
          music: data.music,
          scrap: data.scrap,
          color1: data.color1,
          color2: data.color2,
          path: pathConvertCoor(data.path),
          createdAt: dayjs(data.createdAt).format('YYYY-MM-DD'),
        };
        return result;
      }),
    )
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export default {
  createCourse,
  deleteCourse,
  getMyCourse,
  scrapCourse,
  deleteScrap,
  getMyScrap,
  getDetailCourse,
  searchCourse,
};