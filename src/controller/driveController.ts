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
      const data = await driveService.createDrive(+courseId, +userId);
      return res
        .status(statusCode.CREATED)
        .send(success(statusCode.CREATED, message.CREATE_DRIVE_SUCCESS, data));
    } catch (error) {
      next(error);
    }
  };

export default {
    makeDrive,
}