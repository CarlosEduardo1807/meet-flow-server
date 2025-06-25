import { z } from "zod";

export const MeetingSchema = z.object({
    id: z.string().uuid(),
    status: z.string(),
    disabled: z.boolean(),
    id_sdk: z.string(),
    token_sdk: z.string(),
    create_date: z.date(),
    start_date: z.string(),
    end_date: z.string().optional(),
})

export const CreateMeetingSchema = z.object({
    name: z.string().min(4, "Name too short").max(15, "Name too long"),
})

export type Meeting = z.infer<typeof MeetingSchema>;
export type CreateMeeting = z.infer<typeof CreateMeetingSchema>

