import { Participante } from '../types/participante.type';
import { Reuniao } from '../types/reuniao.type';
import { Usuario } from '../types/usuario.type';
import sql from './connection';

// Função para inserir um novo usuário
async function criarUsuario(nome: string, email: string, senha: string): Promise<Usuario> {
    try {
        const resultado = await sql.query<Usuario>(
            `INSERT INTO usuario (nome, email, senha) 
             VALUES ($1, $2, $3) 
             RETURNING id, nome, email, data_criacao`,
            [nome, email, senha]
        );
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        throw error;
    }
}

// Função para criar uma nova reunião
async function criarReuniao(
    titulo: string,
    id_usuario: string,
    data_inicio: Date,
    descricao: string | null = null,
    sdk_live_token: string | null = null,
    sdk_live_id: string | null = null
): Promise<Reuniao> {
    try {
        const resultado = await sql.query<Reuniao>(
            `INSERT INTO reuniao 
             (titulo, id_usuario, data_inicio, descricao, sdk_live_token, sdk_live_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [titulo, id_usuario, data_inicio, descricao, sdk_live_token, sdk_live_id]
        );
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao criar reunião:', error);
        throw error;
    }
}

// Função para adicionar participante a uma reunião
async function adicionarParticipante(id_reuniao: string, id_usuario: string): Promise<Participante> {
    try {
        const resultado = await sql.query<Participante>(
            `INSERT INTO participante (id_reuniao, id_usuario) 
             VALUES ($1, $2) 
             RETURNING *`,
            [id_reuniao, id_usuario]
        );
        return resultado.rows[0];
    } catch (error) {
        console.error('Erro ao adicionar participante:', error);
        throw error;
    }
}

// Exemplo de uso
async function popularBancoDeDados() {
    try {
        // 1. Criar usuários
        const usuario1 = await criarUsuario(
            'João Silva',
            'joao@empresa.com',
            'senhaSegura123' // Agora usando o campo 'senha' diretamente
        );

        const usuario2 = await criarUsuario(
            'Maria Souza',
            'maria@empresa.com',
            'outraSenha456'
        );

        // 2. Criar reunião
        const reuniao = await criarReuniao(
            'Planejamento Trimestral',
            usuario1.id,
            new Date('2024-12-01T14:00:00'),
            'Reunião para alinhamento de metas',
            'live_123token456',
            'meet_xyz789'
        );

        // 3. Adicionar participantes
        await adicionarParticipante(reuniao.id, usuario2.id);

        console.log('✅ Dados inseridos com sucesso!');

    } catch (error) {
        console.error('❌ Erro ao popular banco de dados:', error);
    }
}

popularBancoDeDados();