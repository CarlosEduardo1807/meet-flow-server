import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name too long"),
    email: z.string()
        .email("Invalid email")
        .regex(emailRegex, "Invalid email format")
        .max(100),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(255),
    created_at: z.date().optional()
});

export const CreateUserSchema = UserSchema.omit({
    id: true,
    created_at: true
});

export const UpdateUserSchema = CreateUserSchema.partial();


export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;


