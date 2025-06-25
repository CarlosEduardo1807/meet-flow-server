export type createParticipant = {
    name: string
    meeting_id: string
}

export type ListAllParticipantAll = {
    id?: string | null
    name?: string | null
    meeting_id?: string | null
    id_sdk?: string | null
    token_sdk?: string | null
    start_create_date?: Date | null
    end_create_date?: Date | null
    start_data_join?: Date | null
    end_data_join?: Date | null
    start_date_leave?: Date | null
    end_date_leave?: Date | null
    creator?: boolean | null
}