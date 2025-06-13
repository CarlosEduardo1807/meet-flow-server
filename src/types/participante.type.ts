export type Participante = {
    id: string;
    id_reuniao: string;
    id_usuario: string;
    data_entrada: Date;
    data_saida: Date | null;
};