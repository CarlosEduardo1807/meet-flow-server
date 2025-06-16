import { z } from 'zod';

// id: string;
// title: string;
// description: string | null;
// startTime: Date;
// endTime: Date | null;
// organizerId: string;
// organizerName: string | null;
// meetingLink: string | null;
// status: string;
// sdkMeetingId: string | null;
// sdkToken: string | null;
// createdAt: Date;
// updatedAt: Date;

export const MeetingStatusSchema = z.enum([
    'scheduled',
    'in_progress',
    'finished'
]);

export const CreateMeetingSchema = z.object({
    title: z.string().min(3, "Title too short").max(100, "Title too long"),
    description: z.string().max(500).optional().nullable(),
    startTime: z.date().min(new Date(), "Start time must be in the future"),
    endTime: z.date().optional().nullable(),
    organizerId: z.string().uuid(),
    organizerName: z.string().optional(),
    meetingLink: z.string().optional().nullable(),
    sdkMeetingId: z.string().optional().nullable(),
    sdkToken: z.string().optional().nullable()
});

export const MeetingSchema = CreateMeetingSchema.extend({
    id: z.string().uuid().optional(),
    status: MeetingStatusSchema,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});


export const ValidateMeetingSchema = MeetingSchema.omit({
    id: true,
    organizerId: true,
    status: true,
    sdkMeetingId: true,
    sdkToken: true,
    meetingLink: true,
    createdAt: true,
    startTime: true,
    endTime: true,
    updatedAt: true
})

export const UpdateMeetingSchema = MeetingSchema.omit({})

export type Meeting = z.infer<typeof MeetingSchema>;
export type MeetingStatus = z.infer<typeof MeetingStatusSchema>;
export type ValidateMeeting = z.infer<typeof ValidateMeetingSchema>
export type CreateMeeting = z.infer<typeof CreateMeetingSchema>;
export type UpdateMeeting = z.infer<typeof UpdateMeetingSchema>