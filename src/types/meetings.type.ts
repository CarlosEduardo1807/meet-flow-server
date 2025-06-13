import { z } from 'zod';

export const MeetingStatusSchema = z.enum([
    'in_progress',
    'finished'
]);

export const MeetingSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string()
        .min(3, "Title too short")
        .max(100, "Title too long"),
    description: z.string().max(500).optional().nullable(),
    start_time: z.coerce.date()
        .min(new Date(), "Start time must be in the future"),
    end_time: z.coerce.date()
        .optional()
        .nullable()
        .refine((val) => !val || val > new Date(), {
            message: "End time must be in the future"
        }),
    organizer_id: z.string().uuid(),
    meeting_link: z.string().url().optional().nullable(),
    status: MeetingStatusSchema.default('in_progress'),
    sdk_meeting_id: z.string().optional().nullable(),
    sdk_meeting_token: z.string().optional().nullable(),
    created_at: z.date().optional()
});


export const CreateMeetingSchema = MeetingSchema.omit({
    id: true,
    created_at: true,
    status: true
});


export const UpdateMeetingSchema = CreateMeetingSchema
    .extend({
        status: MeetingStatusSchema.optional()
    })
    .partial();

export type Meeting = z.infer<typeof MeetingSchema>;
export type CreateMeeting = z.infer<typeof CreateMeetingSchema>;
export type UpdateMeeting = z.infer<typeof UpdateMeetingSchema>;