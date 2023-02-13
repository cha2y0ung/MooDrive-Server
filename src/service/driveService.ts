import { PrismaClient } from '@prisma/client';
import { selectFields } from 'express-validator/src/select-fields';
import { message } from '../modules/constants';
const prisma = new PrismaClient();

const createDrive = async (userId: number, courseId: number) => {
    try {
      const course = await prisma.drive.create({
        data: {
            courseId: courseId,
            userId: userId
        }
      });
      return course;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export default {
    createDrive
  }