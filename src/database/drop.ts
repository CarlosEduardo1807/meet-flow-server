import sql from './connection';

export async function drop() {
    try {
        await sql.query(`
        DROP TABLE IF EXISTS participants CASCADE;
        DROP TABLE IF EXISTS meetings CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
      `);
        console.log('✅ Tables dropped successfully');
    } catch (error) {
        console.error('❌ Error dropping tables:', error);
        throw error;
    }
}

drop()