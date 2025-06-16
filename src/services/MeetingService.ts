import { z } from "zod";
import { CreateMeetingSchema, Meeting, MeetingSchema, MeetingStatus, MeetingStatusSchema, UpdateMeetingSchema } from "../types/MeetingType";
import { validateId } from "../utils/utils";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class MeetingService {

    static async createMeeting(data: z.infer<typeof CreateMeetingSchema>): Promise<z.infer<typeof MeetingSchema>> {
        const validatedData = CreateMeetingSchema.parse(data);
        const status: MeetingStatus = 'scheduled';
        const createdMeeting = await prisma.meeting.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                organizerId: validatedData.organizerId,
                organizerName: validatedData.organizerName,
                meetingLink: validatedData.meetingLink,
                sdkMeetingId: validatedData.sdkMeetingId,
                sdkToken: validatedData.sdkToken,
                status: status,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        return MeetingSchema.parse(createdMeeting);
    }


}