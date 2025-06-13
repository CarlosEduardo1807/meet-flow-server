import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { CreateUserSchema, ListUserShema } from '../types/users.type';
import { UserService } from '../services/UserService';
import { ResponseApi } from '../models/ResponseApi';

const router = Router();

router.post("/create", validateRequest({ body: CreateUserSchema }),
    async (req, res) => {
        const responseApi = new ResponseApi()

        try {
            const user = await UserService.createUser(req.body);
            responseApi.msg = 'User created'
            responseApi.data = user
            res.status(201).json(responseApi);

        } catch (error: any) {
            responseApi.error = error?.message
            res.status(400).json(responseApi);
        }
    }
)

router.get("/findById/:id", async (req, res) => {
    const responseApi = new ResponseApi()
    try {
        const user = await UserService.findById(req.params.id)
        if (!user?.id) {
            responseApi.msg = 'user not found'
            responseApi.data = {}
            res.status(200).json(responseApi)
            return
        }

        responseApi.msg = 'user found successfully'
        responseApi.data = user
        res.status(200).json(responseApi)

    } catch (error: any) {
        responseApi.error = error
        res.status(400).json(responseApi);
    }

})

router.post("/list", validateRequest({ body: ListUserShema }),
    async (req, res) => {
        const responseApi = new ResponseApi();
        try {
            const users = await UserService.listUsers(req.body);
            responseApi.msg = users.length > 0
                ? 'Users found successfully'
                : 'No users found';
            responseApi.data = users;

            res.status(200).json(responseApi);
        } catch (error) {
            responseApi.error = error instanceof Error
                ? error.message
                : 'Unknown error';
            res.status(500).json(responseApi);
        }
    }
)

export default router;
