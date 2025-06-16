import 'dotenv/config';
import { z } from 'zod';
import { NextFunction, Request, Response, Router } from 'express';
import { validate } from '../../src/middleware/validation_middeware';
import { ResponseApi } from '../models/ResponseApi';
import { throwError } from '../../src/middleware/error_middeware';
import { ErrorType } from '../../src/types/ErrorType';
import { UpdateMeetingSchema, ValidateMeetingSchema } from '../types/MeetingType';
import { CreateUserSchema } from '../types/UserType';
import { VideoSdkLiveService } from '../services/VideoSdkLiveService';
import { Meeting } from '../models/Meeting';
import { MeetingService } from '../services/MeetingService';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

const router = Router();

router.post("/create",
    validate({ body: ValidateMeetingSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const responseApi = new ResponseApi()
            let user: z.infer<typeof CreateUserSchema> | null = null;
            let save_user = null
            let body = req.body

            if (!req?.body?.organizer_id) {
                user = new User({
                    name: req?.body?.organizer_name
                })
                save_user = await UserService.createUser(user)
                body = save_user
            }

            let title = req?.body?.title
            let organizer_name = req?.body?.organizer_name || body.name
            let organizer_id = req?.body?.organizer_id || body.id
            let description = req?.body?.description || 'meeting'

            let createRoom = await VideoSdkLiveService.createRoom()

            if (!createRoom?.roomId) {
                return throwError(ErrorType.ERROR_SDK_LIVE, "error api create room")
            }

            let meeting = new Meeting({
                title: title,
                description: description,
                organizerId: organizer_id,
                organizerName: organizer_name,
                meetingLink: 'url_meeting',
                sdkToken: process.env.VIDEO_SDK_LIVE_TOKEN,
                sdkMeetingId: createRoom.roomId,
                startTime: new Date()
            });

            const meetings = await MeetingService.createMeeting(meeting);
            responseApi.msg = 'Meeting created'
            responseApi.data = meetings
            res.status(201).json(responseApi);
        } catch (error: any) {
            next(error);
        }
    }
)
router.post("/update",
    validate({ body: UpdateMeetingSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const responseApi = new ResponseApi()
            // const meetings = await MeetingService.updateMeeting(req?.body);
            // responseApi.msg = 'meeting updated successfully'
            // responseApi.data = meetings
            // res.status(201).json(responseApi);
        } catch (error: any) {
            next(error);
        }
    }
)

router.get("/findById/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const responseApi = new ResponseApi()
            // const user = await MeetingService.findById(req.params.id)
            // if (!user?.id) {
            //     responseApi.msg = 'meeting not found'
            //     responseApi.data = {}
            //     res.status(200).json(responseApi)
            //     return
            // }
            // responseApi.msg = 'meeting found successfully'
            // responseApi.data = user
            // res.status(200).json(responseApi)

        } catch (error: any) {
            next(error)
        }
    }
)

export default router;
