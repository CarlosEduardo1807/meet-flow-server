import { z } from 'zod';

export const ParticipantSchema = z.object({
    id: z.string().uuid().optional(),
    meeting_id: z.string().uuid(),
    user_id: z.string().uuid(),
    joined_at: z.date().optional(),
    left_at: z.date()
        .optional()
        .nullable()
        .refine((val) => !val || val > new Date("2000-01-01"), {
            message: "Invalid date"
        }),
});


export const CreateParticipantSchema = ParticipantSchema.omit({
    id: true,
    joined_at: true,
    left_at: true
});

export const UpdateParticipantSchema = z.object({
    left_at: z.date().optional().nullable()
});

export type Participant = z.infer<typeof ParticipantSchema>;
export type CreateParticipant = z.infer<typeof CreateParticipantSchema>;
export type UpdateParticipant = z.infer<typeof UpdateParticipantSchema>;