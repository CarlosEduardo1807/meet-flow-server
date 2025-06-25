import { PrismaClient } from "../generated/prisma";
import { Participant } from "../models/Participant";
import { ListAllParticipantAll } from "../types/ParticipantType";

const prisma = new PrismaClient();

export default class ParticipantService {

    static async createParticipant(data: Participant): Promise<Participant> {
        return prisma.participant.create({
            data: {
                id: data.id!,
                name: data.name!,
                id_sdk: data.id_sdk!,
                meeting_id: data.meeting_id!,
                token_sdk: data.token_sdk!,
                create_date: data.create_date!,
                creator: data.creator!,
                data_join: null,
                date_leave: null
            }
        })
    }

    static async updateParticipant(data: Participant): Promise<Participant> {
        return prisma.participant.update({
            where: {
                id: data.id!,
            },
            data: {
                name: data.name!,
                id_sdk: data.id_sdk!,
                meeting_id: data.meeting_id!,
                token_sdk: data.token_sdk!,
                create_date: data.create_date!,
                creator: data.creator ?? undefined,
                data_join: data.data_join!,
                date_leave: data.date_leave!
            }
        })
    }

    static async getParticipantById(id: string): Promise<Participant | null> {
        return await prisma.participant.findUnique({
            where: { id: id }
        })
    }

    static async ListaAll(filters: ListAllParticipantAll): Promise<Participant[]> {
        try {
            const whereClause: any = {}

            if (filters.id) whereClause.id = filters.id
            if (filters.name) whereClause.name = { contains: filters.name }
            if (filters.meeting_id) whereClause.meeting_id = filters.meeting_id
            if (filters.id_sdk) whereClause.id_sdk = filters.id_sdk
            if (filters.token_sdk) whereClause.token_sdk = filters.token_sdk
            if (filters.creator !== null && filters.creator !== undefined) {
                whereClause.creator = filters.creator
            }

            if (filters.start_create_date || filters.end_create_date) {
                whereClause.create_date = {}

                if (filters.start_create_date) {
                    whereClause.create_date.gte = filters.start_create_date
                }

                if (filters.end_create_date) {
                    whereClause.create_date.lte = filters.end_create_date
                }
            }

            if (filters.start_data_join || filters.end_data_join) {
                whereClause.data_join = {}

                if (filters.start_data_join) {
                    whereClause.data_join.gte = filters.start_data_join
                }

                if (filters.end_data_join) {
                    whereClause.data_join.lte = filters.end_data_join
                }
            }

            if (filters.start_date_leave || filters.end_date_leave) {
                whereClause.date_leave = {}

                if (filters.start_date_leave) {
                    whereClause.date_leave.gte = filters.start_date_leave
                }

                if (filters.end_date_leave) {
                    whereClause.date_leave.lte = filters.end_date_leave
                }
            }

            const participants = await prisma.participant.findMany({
                where: whereClause,
                orderBy: {
                    create_date: 'desc'
                }
            })

            return participants
        } catch (error) {
            console.error('Error in ListaAll:', error)
            throw error
        } finally {
            await prisma.$disconnect()
        }
    }

}