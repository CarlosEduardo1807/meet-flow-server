import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error';
// import userRouter from './api/user.api';
import meetingRouter from './api/MeetingApi';
import participantRouter from './api/ParticipantApi'

const server = express();

server.use(cors());
server.use(express.json());

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

server.use('/api/meeting', meetingRouter);
server.use('/api/participant', participantRouter);

export default server;