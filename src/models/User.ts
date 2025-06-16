export class User {
    id: string;
    name: string;
    email: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: {
        id?: string;
        name: string;
        email?: string;
        password?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = data.id || crypto.randomUUID();
        this.name = data.name;
        this.email = data.email || null;
        this.password = data.password || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    static fromPrisma(data: any): User {
        return new User({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            createdAt: data.created_at,
            updatedAt: data.updated_at
        });
    }
}