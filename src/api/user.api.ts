import { Router, Request, Response, NextFunction } from 'express';
import { validate } from '../middleware/validation_middeware';
import { CreateUserSchema, ListUserShema, UpdateUserSchema, ValidateAccessUserSchema } from '../types/UserType';
import { ResponseApi } from '../models/ResponseApi';
import { UserService } from '../services/UserService';

const router = Router();

router.post("/create_user",
    validate({ body: CreateUserSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const responseApi = new ResponseApi()
            const user = await UserService.createUser(req.body);
            responseApi.msg = 'User created'
            responseApi.data = user
            res.status(201).json(responseApi);
        } catch (error: any) {
            next(error);
        }
    }
)

router.put("/update_user",
    validate({ body: UpdateUserSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const responseApi = new ResponseApi()
            const user = await UserService.updateUser(req.body.id, req.body);
            responseApi.msg = 'User updated successfully'
            responseApi.data = user
            res.status(201).json(responseApi);
        } catch (error: any) {
            next(error);
        }
    }
)

router.get("/findById/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const responseApi = new ResponseApi()
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
            next(error)
        }
    }
)

router.delete('/deleteById/:id', async (req: Request, res: Response) => {
    try {
        let responseApi = new ResponseApi()
        await UserService.deleteUserById(req.params.id);
        responseApi.msg = 'user deleted successfully'
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

router.post("/list_users",
    validate({ body: ListUserShema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const responseApi = new ResponseApi();
            const users = await UserService.listUsers(req.body);
            responseApi.msg = users.length > 0 ? 'Users found successfully' : 'No users found';
            responseApi.data = users;
            res.status(200).json(responseApi);
        } catch (error) {
            next(error)
        }
    }
)

router.post("/validate_access",
    validate({ body: ValidateAccessUserSchema }),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const responseApi = new ResponseApi();
            const users = await UserService.validateAccess(req.body);
            responseApi.msg = users ? 'User found successfully' : 'No user found';
            responseApi.data = users;
            res.status(200).json(responseApi);
        } catch (error) {
            next(error)
        }
    }
)

export default router;
