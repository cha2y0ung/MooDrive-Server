import { Request, Response, NextFunction } from 'express';
import { message, statusCode } from '../modules/constants';
import { fail, success } from '../modules/constants/util';
import { driveService } from '../service';
import { NetConnectOpts } from 'net';
import { nextTick } from 'process';
import { userInfo } from 'os';

const makeDrive = async (req: Request, res: Response, next: NextFunction) => {
    const { courseId } = req.params;
    const { userId } = req.body;
    try {
      const data = await driveService.createDrive(+userId, +courseId);
      return res
        .status(statusCode.CREATED)
        .send(success(statusCode.CREATED, message.CREATE_DRIVE_SUCCESS, data));
    } catch (error) {
      next(error);
    }
  };

const getMyDrive = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const data = await driveService.getMyDrive(+userId);
    return res
      .status(statusCode.OK)
      .send(success(statusCode.OK, message.GET_MY_DRIVE_SUCCESS, data));
  } catch (error) {
    next(error);
  }
}

const updateDrive = async (req: Request, res: Response, next: NextFunction) => {
  const { driveId } = req.params;
  try {
    const data = await driveService.updateDrive(+driveId);
    return res
      .status(statusCode.ACCEPTED)
      .send(success(statusCode.OK, message.UPDATE_DRIVE_SUCCESS, data));
  } catch (error) {
    next(error);
  }
}

export default {
    makeDrive,
    getMyDrive,
    updateDrive,
}