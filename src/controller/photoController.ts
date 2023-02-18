import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { createPhotoDTO } from '../interfaces/DTO';
import { photoService } from '../service';
import { NetConnectOpts } from 'net';
import { nextTick } from 'process';
import { userInfo } from 'os';

const uploadPhoto = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const createPhotoDto: createPhotoDTO = req.body;
    try {
      const data = await photoService.uploadPhoto(+courseId, createPhotoDto);
      return res
        .status(statusCode.CREATED)
        .send(success(statusCode.CREATED, message.UPLOAD_PHOTO_SUCCESS, data));
    } catch (error) {
      next(error);
    }
  };

const getPhoto = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    try {
        const data = await photoService.getPhoto(+courseId);
        return res
          .status(statusCode.OK)
          .send(success(statusCode.OK, message.GET_PHOTO_SUCCESS, data));
      } catch (error) {
        next(error);
      }
}

export default {
    uploadPhoto,
    getPhoto,
}