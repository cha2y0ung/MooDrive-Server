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
        id: courseId,
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
          courseId: data.id,
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
        id: courseId
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
        id: courseId
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
      include: {
        Course: true
      }
    })
    const data = await Promise.all(
      scraps.map((data: any) => {
        const result = {
          userId: data.Course.userId,
          courseId: data.Course.id,
          description: data.Course.description,
          totalTime: data.Course.totalTime,
          startLocation: data.Course.startLocation,
          startDetail: data.Course.startDetail,
          endLocation: data.Course.endLocation,
          endDetail: data.Course.endDetail,
          hashtag: data.Course.hashtag,
          music: data.Course.music,
          scrap: data.Course.scrap,
          color1: data.Course.color1,
          color2: data.Course.color2,
          path: pathConvertCoor(data.Course.path),
          createdAt: dayjs(data.Course.createdAt).format('YYYY-MM-DD'),
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
        id: courseId,
      }
    })
    const data = await Promise.all(
      course.map((data: any) => {
        const result = {
          userId: data.userId,
          courseId: data.id,
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

const searchCourse = async ( totalTime: number, startLocation: string) => {
  try{
    const course = await prisma.course.findMany({
      where: {
        startLocation: startLocation,
        totalTime: totalTime
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
          courseId: data.id,
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