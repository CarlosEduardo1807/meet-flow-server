import sql from '../database/connection';
import { CreateUserSchema, UpdateUserSchema, ListUserShema, type User, type ListUser } from '../types/users.type'
import { z } from 'zod';
import { generatePassword, validateId } from '../utils/utils';

//const SALT_ROUNDS = 10;
//
//export class UserService {
//   
//    // Create
//    static async create(data: z.infer<typeof CreateUserSchema>): Promise<User> {
//        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
//
//        const { rows: [user] } = await sql.query<User>(`
//      INSERT INTO users (name, email, password_hash)
//      VALUES ($1, $2, $3)
//      RETURNING id, name, email, created_at;
//    `, [data.name, data.email, hashedPassword]);
//
//        return user;
//    }
//
//    // Read
//    static async findById(id: string): Promise<User | null> {
//        const { rows: [user] } = await sql.query<User>(`
//      SELECT id, name, email, created_at 
//      FROM users WHERE id = $1;
//    `, [id]);
//        return user || null;
//    }
//
//    static async findByEmail(email: string): Promise<User | null> {
//        const { rows: [user] } = await sql.query<User>(`
//      SELECT * FROM users WHERE email = $1;
//    `, [email]);
//        return user || null;
//    }
//
//    // Update
//    static async update(id: string, data: z.infer<typeof UpdateUserSchema>): Promise<User | null> {
//        let updates: string[] = [];
//        let values: any[] = [];
//        let counter = 1;
//
//        if (data.name) {
//            updates.push(`name = $${counter}`);
//            values.push(data.name);
//            counter++;
//        }
//
//        if (data.email) {
//            updates.push(`email = $${counter}`);
//            values.push(data.email);
//            counter++;
//        }
//
//        if (data.password) {
//            const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
//            updates.push(`password_hash = $${counter}`);
//            values.push(hashedPassword);
//            counter++;
//        }
//
//        if (updates.length === 0) return null;
//
//        const { rows: [user] } = await sql.query<User>(`
//      UPDATE users
//      SET ${updates.join(', ')}
//      WHERE id = $${counter}
//      RETURNING id, name, email;
//    `, [...values, id]);
//
//        return user || null;
//    }
//
//    // Delete
//    static async delete(id: string): Promise<boolean> {
//        const { rowCount } = await sql.query(`
//      DELETE FROM users WHERE id = $1;
//    `, [id]);
//        return rowCount > 0;
//    }
//
//    // List all
//    static async listAll(): Promise<User[]> {
//        const { rows } = await sql.query<User>(`
//      SELECT id, name, email, created_at 
//      FROM users ORDER BY created_at DESC;
//    `);
//        return rows;
//    }
//}

export class UserService {

    static async createUser(data: z.infer<typeof CreateUserSchema>): Promise<User> {
        const password = data.password ?? generatePassword();
        const { rows: [user] } = await sql.query<User>(`
              INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING *;
            `, [data.name, data.email, password]);

        return user;
    }

    static async findById(id: string): Promise<User | null> {
        if (!validateId(id)) return null
        const { rows: [user] } = await sql.query<User>(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        return user || null;
    }

    static async listUsers(params: z.infer<typeof ListUserShema>): Promise<ListUser[]> {
        const filters: string[] = [];
        const values: any[] = [];
        let paramCount = 1;

        if (params.id) {
            filters.push(`id = $${paramCount}`);
            values.push(params.id);
            paramCount++;
        }

        if (params.name) {
            filters.push(`name ILIKE $${paramCount}`);
            values.push(`%${params.name}%`);
            paramCount++;
        }

        if (params.email) {
            filters.push(`email = $${paramCount}`);
            values.push(params.email);
            paramCount++;
        }

        if (params.created_at) {
            filters.push(`DATE(created_at) = $${paramCount}`);
            values.push(params.created_at);
            paramCount++;
        }

        const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

        const { rows } = await sql.query<User>(`
          SELECT * FROM users ${whereClause} ORDER BY created_at DESC`, values);

        return rows;

    }

}