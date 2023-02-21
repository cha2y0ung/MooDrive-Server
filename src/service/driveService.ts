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
          userId: userId,
          courseId: courseId
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
        Course: true,
        userId: true,
        courseId: true,
        date: true,
        startTime: true,
        endTime: true
      }
    });
    const data = await Promise.all(
      drive.map((data: any) => {
        const result = {
          courseId: data.courseId,
          userId: data.userId,
          date: dayjs(data.date).format('YYYY-MM-DD'),
          startTime: dayjs(data.startTime).format('HH:mm:ss'),
          endTime: dayjs(data.endTime).format('HH:mm:ss'),
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
        id: driveId
      },
      data: {
        id: driveId
      }
    });
    const data = {
      drive: drive.id,
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