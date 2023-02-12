import { PrismaClient } from '@prisma/client';
import { createCourseDTO } from '../interfaces/DTO';
const prisma = new PrismaClient();

const createCourse = async (userId: number, createCourseDto: createCourseDTO) => {
  try {
    const course = await prisma.course.create({
      data: {
        userId: userId,
        discription: createCourseDto.discription,
        totalTime: createCourseDto.totalTime,
        startLocation: createCourseDto.startLocation,
        endLocation: createCourseDto.endLocation,
        hashtag: createCourseDto.hashtag,
        music: createCourseDto.music,
        path: createCourseDto.path,
      },
    });
    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createCourse,
};