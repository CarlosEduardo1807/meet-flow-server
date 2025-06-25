import { PrismaClient } from "../generated/prisma";
import { Meeting } from "../models/Meeting";

const prisma = new PrismaClient();

export class MeetingService {

    static async createMeeting(data: Meeting): Promise<Meeting> {
        return await prisma.meeting.create({
            data: {
                status: data.status!,
                disabled: data.disabled!,
                token_sdk: data.token_sdk!,
                id_sdk: data.id_sdk!,
                create_date: data.create_date!,
                end_date: null,
                start_date: null,
            }
        })
    }

    static async updateMeeting(data: Meeting): Promise<Meeting | null> {
        return prisma.meeting.update({
            where: {
                id: data.id!,
            },
            data: {
                status: data.status!,
                disabled: data.disabled!,
                token_sdk: data.token_sdk!,
                id_sdk: data.id_sdk!,
                create_date: data.create_date!,
                end_date: data.end_date,
                start_date: data.start_date,
            }
        })
    }

    static async getMeetingById(id: string): Promise<Meeting | null> {
        return await prisma.meeting.findUnique({
            where: { id: id }
        })
    }

}