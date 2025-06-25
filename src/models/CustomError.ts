export class CustomError extends Error {
    type: string;
    details?: any;
    statusCode: number;

    constructor(type: string, message: string, details?: any, statusCode = 500) {
        super(message);
        this.type = type;
        this.details = details;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}