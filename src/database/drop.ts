import sql from './connection';

export async function drop() {
    try {
        await sql.query(`
        DROP TABLE IF EXISTS participantes CASCADE;
        DROP TABLE IF EXISTS reuniao CASCADE;
        DROP TABLE IF EXISTS usuario CASCADE;
      `);
        console.log('✅ Tables dropped successfully');
    } catch (error) {
        console.error('❌ Error dropping tables:', error);
        throw error;
    }
}

drop()