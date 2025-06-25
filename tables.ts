export enum status {
    created = 'created',
    in_progress = 'in progress',
    finished = 'finished'
}

class Meeting {
    id: string
    status: status
    disabled: boolean // se a sala esta ativa (true quando a sala ja foi encerrada )
    token_sdk: string
    id_sdk: string
    create_date: Date
    start_date: Date // Data em que o primeiro entrou na sala
    end_date: Date // Data em que a sala foi finalizada
}

class Participant {
    id: string
    name: string
    meeting_id: string
    id_sdk: string
    token_sdk: string
    create_date: Date
    data_join: Date
    date_leave: Date
    creator: boolean // so quem criou tem o poder de desativar a sala ou outros podem sair
}