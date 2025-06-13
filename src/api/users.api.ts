import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { CreateUserSchema } from '../types/users.type';
import { UserService } from '../services/UserService';

const router = Router();

router.post("/create", validateRequest({ body: CreateUserSchema }),
    async (request, response) => {
        try {
            const user = await UserService.createUser(request.body);
            response.status(201).json(user);
        } catch (error: any) {
            response.status(400).json({ error: error?.message });
        }
    }
)

export default router;
