import { MeetingStatusSchema } from "../types/MeetingType";

export class Meeting {
    id: string;
    title: string;
    description: string | null;
    startTime: Date;
    endTime: Date | null;
    organizerId: string;
    organizerName: string;
    meetingLink: string | null;
    status: string | null;
    sdkMeetingId: string | null;
    sdkToken: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(data: {
        id?: string;
        title: string;
        description?: string;
        startTime: Date;
        endTime?: Date;
        organizerId: string;
        organizerName: string;
        meetingLink?: string;
        status?: string;
        sdkMeetingId?: string;
        sdkToken?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = data.id || crypto.randomUUID();
        this.title = data.title;
        this.description = data.description || null;
        this.startTime = data.startTime;
        this.endTime = data.endTime || null;
        this.organizerId = data.organizerId;
        this.organizerName = data.organizerName;
        this.meetingLink = data.meetingLink || null;
        this.status = data.status || 'scheduled';
        this.sdkMeetingId = data.sdkMeetingId || null;
        this.sdkToken = data.sdkToken || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    get duration(): number | null {
        return this.endTime ? this.endTime.getTime() - this.startTime.getTime() : null;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            startTime: this.startTime,
            endTime: this.endTime,
            organizerId: this.organizerId,
            organizerName: this.organizerName,
            status: this.status,
            duration: this.duration,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromPrisma(data: any): Meeting {
        return new Meeting({
            id: data.id,
            title: data.title,
            description: data.description,
            startTime: data.start_time,
            endTime: data.end_time,
            organizerId: data.organizer_id,
            organizerName: data.organizer_name,
            meetingLink: data.meeting_link,
            status: data.status,
            sdkMeetingId: data.sdk_meeting_id,
            sdkToken: data.sdk_token,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        });
    }
}