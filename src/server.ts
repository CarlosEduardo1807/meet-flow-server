import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRouter from './api/user.api';
import meetingsRouter from './api/meeting.api';
import { errorHandler } from './middleware/error_middeware';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/api/user', userRouter);
server.use('/api/mettings', meetingsRouter);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

export default server;