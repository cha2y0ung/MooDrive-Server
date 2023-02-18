import { PrismaClient } from '@prisma/client';
import { selectFields } from 'express-validator/src/select-fields';
import { message } from '../modules/constants';
import { createPhotoDTO} from '../interfaces/DTO';

const prisma = new PrismaClient();

const uploadPhoto = async (courseId: number, createPhotoDTO: createPhotoDTO) => {
    try {
      const photo = await prisma.photo.create({
        data: {
            courseId: courseId,
            photoUrl: createPhotoDTO.photoUrl,
        }
      });
      return photo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

const getPhoto = async (courseId: number) => {
    try {
      const photo = await prisma.photo.findFirst({
        where: {
            courseId: courseId
        }
      });
      return photo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  export default {
    uploadPhoto,
    getPhoto,
  }