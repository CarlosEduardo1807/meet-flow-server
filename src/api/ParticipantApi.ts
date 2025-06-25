import { NextFunction, Request, Response, Router } from 'express';
import ResponseApi from '../models/ResponseApi';
import ParticipantService from "../service/ParticipantService"

const router = Router();

router.post('/create',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let responseApi = new ResponseApi()
            let body = req.body

            let save = await ParticipantService.createParticipant(body)

            responseApi.msg = 'Participant created'
            responseApi.data = save
            res.status(201).json(responseApi);

        } catch (error: any) {
            next(error)
        }

    }
)

router.post('/update',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let responseApi = new ResponseApi()
            let body = req.body

            let save = await ParticipantService.updateParticipant(body)

            responseApi.msg = 'Participant update'
            responseApi.data = save
            res.status(201).json(responseApi);

        } catch (error: any) {
            next(error)
        }

    }
)

router.post('/listAll',
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            let responseApi = new ResponseApi()
            let body = req.body

            let listAll = await ParticipantService.ListaAll(body)

            responseApi.data = listAll
            res.status(201).json(responseApi);

        } catch (error: any) {
            next(error)
        }

    }
)

export default router;