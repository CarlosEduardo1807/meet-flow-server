import { CreateUserSchema, UpdateUserSchema, ListUserShema, type User, type ListUser, ValidateAccessUserSchema, ValidateAccessUser } from '../types/UserType';
import { generatePassword, toDatabaseDate, validateId } from '../../src/utils/utils';
import { z } from 'zod';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class UserService {

    static async createUser(data: z.infer<typeof CreateUserSchema>): Promise<User> {
        const password = data.password ?? generatePassword();
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: password
            }
        });
    }

    static async updateUser(id: string, data: z.infer<typeof UpdateUserSchema>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                updatedAt: new Date(),
                createdAt: toDatabaseDate(data.created_at)
            }
        });
    }

    static async findById(id: string): Promise<User | null> {
        if (!validateId(id)) return null;
        return prisma.user.findUnique({
            where: { id }
        });
    }

    static async deleteUserById(id: string): Promise<void> {
        if (!validateId(id)) return;
        await prisma.user.delete({
            where: { id }
        });
    }

    static async validateAccess(data: z.infer<typeof ValidateAccessUserSchema>): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                email: data.email,
                password: data.password
            }
        })
    }

    static async listUsers(params: z.infer<typeof ListUserShema>): Promise<ListUser[]> {
        const where: any = {};

        if (params.id) {
            where.id = params.id;
        }

        if (params.name) {
            where.name = {
                contains: params.name,
                mode: 'insensitive'
            };
        }

        if (params.email) {
            where.email = params.email;
        }

        if (params.password) {
            where.password = params.password;
        }

        if (params.createdAt) {
            where.created_at = {
                equals: params.createdAt
            };
        }

        return await prisma.user.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

}