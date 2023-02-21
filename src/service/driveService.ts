import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { selectFields } from 'express-validator/src/select-fields';
import { message } from '../modules/constants';
import { pathConvertCoor } from "../modules/convert/pathConvertCoor";

const prisma = new PrismaClient();

const createDrive = async (userId: number, courseId: number) => {
    try {
      const course = await prisma.drive.create({
        data: {
            courseId: courseId,
            userId: userId,
        }
      });
      return course;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const getMyDrive = async (userId: number) => {
  try {
    const drive = await prisma.drive.findMany({
      where: {
        userId: userId
      },
      select: {
        userId: true,
        courseId: true,
        date: true,
        startTime: true,
        endTime: true,
        course: true
      },
    });
    const data = await Promise.all(
      drive.map((data: any) => {
        const result = {
          courseId: data.courseId,
          userId: data.userId,
          date: dayjs(data.date).format('YYYY-MM-DD'),
          startTime: dayjs(data.startTime).format('HH:mm:ss'),
          endTime: dayjs(data.endTime).format('HH:mm:ss'),
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

const updateDrive = async (driveId: number) => {
  try {
    const drive = await prisma.drive.update({
      where: {
        driveId: driveId
      },
      data: {
        driveId: driveId
      }
    });
    const data = {
      drive: drive.driveId,
      courseId: drive.courseId,
      date: dayjs(drive.date).format('YYYY-MM-DD'),
      startTime: dayjs(drive.startTime).format('HH:mm:ss'),
      endTime: dayjs(drive.endTime).format('HH:mm:ss'),
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

  export default {
    createDrive,
    getMyDrive,
    updateDrive,
  }