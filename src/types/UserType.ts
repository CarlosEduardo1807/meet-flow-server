import { z } from 'zod';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// id: string;
// name: string;
// email: string | null;
// password: string | null;
// createdAt: Date;
// updatedAt: Date;

export const databaseDateSchema = z.union([
    z.string().datetime({ offset: true }).transform(str => new Date(str)),
    z.date()
]).optional();

export const UserSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name too long"),
    email: z.string().email("Invalid email").regex(emailRegex, "Invalid email format").max(100).optional().nullable(),
    password: z.string().min(3, "Password must be at least 6 characters").max(255).optional().nullable(),
    created_at: z.date().optional().nullable(),
    updatedAt: z.date().optional().nullable()
})

export const CreateUserSchema = UserSchema.omit({
    id: true,
    created_at: true
});

export const UpdateUserSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name too long"),
    email: z.string().email("Invalid email").regex(emailRegex, "Invalid email format").max(100),
    password: z.string().min(3, "Password must be at least 6 characters").max(255),
    created_at: databaseDateSchema,
    updatedAt: databaseDateSchema
})

export const ListUserShema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.date().optional().nullable(),
    updatedAt: z.date().optional().nullable()
});

export const ValidateAccessUserSchema = z.object({
    email: z.string().email().optional().nullable(),
    password: z.string().optional().nullable()
})

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type ListUser = z.infer<typeof ListUserShema>;
export type ValidateAccessUser = z.infer<typeof ValidateAccessUserSchema>;

