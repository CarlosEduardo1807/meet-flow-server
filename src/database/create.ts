import sql from './connection';

export async function create() {
    try {
        await sql.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE meetings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(100) NOT NULL,
        description TEXT,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP,
        organizer_id UUID NOT NULL,
        meeting_link VARCHAR(100) UNIQUE,
        status VARCHAR(20) DEFAULT 'scheduled',
        sdk_meeting_id VARCHAR(255),
        sdk_token VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE TABLE participants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        meeting_id UUID NOT NULL,
        user_id UUID NOT NULL,
        joined_at TIMESTAMP DEFAULT NOW(),
        left_at TIMESTAMP,
        FOREIGN KEY (meeting_id) REFERENCES meetings(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      CREATE INDEX idx_meeting_organizer ON meetings(organizer_id);
      CREATE INDEX idx_participant_meeting ON participants(meeting_id);
    `);
        console.log('✅ Tables created successfully');
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        throw error;
    }
}

create()