import { PrismaClient } from '@prisma/client';
import { selectFields } from 'express-validator/src/select-fields';
import { stringify } from 'querystring';
import { createCourseDTO, createPathDTO } from '../interfaces/DTO';
import { message } from '../modules/constants';
const prisma = new PrismaClient();

const createCourse = async (userId: number, createCourseDto: createCourseDTO) => {
  try {
    const course = await prisma.course.create({
      data: {
        userId: userId,
        discription: createCourseDto.discription,
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
      },
      select: {
        userId: true,
        courseId: true,
        discription: true,
        totalTime: true,
        startLocation: true,
        startDetail: true,
        endLocation: true,
        endDetail: true,
        hashtag: true,
        music: true,
        scrap: true,
        color1: true,
        color2: true,
        path: true,
      }
    })
    return course;
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
    return scraps;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const getDetailCourse = async (courseId: number) => {
  try{
    const course = await prisma.course.findFirst({
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


export default {
  createCourse,
  deleteCourse,
  getMyCourse,
  scrapCourse,
  deleteScrap,
  getMyScrap,
  getDetailCourse,
};