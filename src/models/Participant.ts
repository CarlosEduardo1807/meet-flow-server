export class Participant {
    id: string;
    meetingId: string;
    userId: string;
    joinedAt: Date;
    leftAt: Date | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: {
        id?: string;
        meetingId: string;
        userId: string;
        joinedAt?: Date;
        leftAt?: Date;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = data.id || crypto.randomUUID();
        this.meetingId = data.meetingId;
        this.userId = data.userId;
        this.joinedAt = data.joinedAt || new Date();
        this.leftAt = data.leftAt || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    get isActive(): boolean {
        return this.leftAt === null;
    }

    toJSON() {
        return {
            id: this.id,
            meetingId: this.meetingId,
            userId: this.userId,
            joinedAt: this.joinedAt,
            leftAt: this.leftAt,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromPrisma(data: any): Participant {
        return new Participant({
            id: data.id,
            meetingId: data.meeting_id,
            userId: data.user_id,
            joinedAt: data.joined_at,
            leftAt: data.left_at,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        });
    }
}