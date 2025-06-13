import sql from '../database/connection';
import { CreateUserSchema, UpdateUserSchema, type User } from '../types/users.type'
import { z } from 'zod';
import { generatePassword } from '../utils/utils';

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
        const password = generatePassword()
        const { rows: [user] } = await sql.query<User>(`
              INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING id, name, email, created_at;
            `, [data.name, data.email, password]);

        return user;
    }

}