import 'dotenv/config';
import { NextFunction, Request, Response, Router } from 'express';
import { validate } from '../middleware/validate'
import { CreateMeetingSchema, } from '../types/MeetingType';
import { VideoSdkLiveService } from '../service/VideoSdkLiveService';
import { Meeting } from '../models/Meeting';
import { MeetingService } from '../service/MeetingService';
import ResponseApi from "../models/ResponseApi"
import { Participant } from '../models/Participant';
import ParticipantService from '../service/ParticipantService';

const router = Router();

router.post('/create',
    validate({ body: CreateMeetingSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let responseApi = new ResponseApi()
            let body = req.body
            let createRoom = await VideoSdkLiveService.createRoom()

            let meeting = new Meeting();
            meeting.id = crypto.randomUUID()
            meeting.status = 'created'
            meeting.disabled = false
            meeting.create_date = new Date()
            meeting.id_sdk = createRoom?.roomId
            meeting.token_sdk = process.env.VIDEO_SDK_LIVE_TOKEN

            meeting = await MeetingService.createMeeting(meeting);

            let participant = new Participant();
            participant.id = crypto.randomUUID()
            participant.name = body?.name
            participant.id_sdk = createRoom?.roomId
            participant.token_sdk = process.env.VIDEO_SDK_LIVE_TOKEN
            participant.create_date = new Date()
            participant.meeting_id = meeting.id
            participant.creator = true

            participant = await ParticipantService.createParticipant(participant)

            responseApi.msg = 'Meeting created'
            responseApi.data = {
                "meeting": meeting,
                "participant": participant
            }
            res.status(201).json(responseApi);

        } catch (error: any) {
            next(error);
        }
    }
)

router.post('/update',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let responseApi = new ResponseApi()
            let body = req.body

            let meeting = new Meeting();
            Object.assign(meeting, body)

            let update = await MeetingService.updateMeeting(meeting);

            responseApi.msg = 'Meeting update'
            responseApi.data = update

            res.status(201).json(responseApi);

        } catch (error: any) {
            next(error);
        }
    }
)

export default router;