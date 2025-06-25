import { NextFunction, Request, Response } from "express";
import { ErrorType } from "../types/ErrorType";
import { ZodError } from 'zod';
import { CustomError } from "../models/CustomError";

interface ErrorResponse {
    success: false;
    error: {
        type: ErrorType;
        message: string;
        details?: any;
        timestamp: string;
    };
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ZodError) {
        const validationResponse: ErrorResponse = responseZodError(err)
        return res.status(422).json(validationResponse);
    }

    if (err instanceof CustomError) {
        const validationResponse: ErrorResponse = responseTypeError(err)
        return res.status(422).json(validationResponse)
    }

}

export function ErrorDetected(type: ErrorType, message: string, details?: any, statusCode?: number): never {
    const error = new Error(message) as any;
    error.type = type;
    error.details = details;
    error.statusCode = statusCode;
    throw error;
}


function responseZodError(error: ZodError): ErrorResponse {
    return {
        success: false,
        error: {
            type: ErrorType.VALIDATION,
            message: 'Validation failed',
            details: error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
                code: e.code
            })),
            timestamp: new Date().toISOString(),
        },
    };
}

function responseTypeError(error: CustomError): ErrorResponse {
    return {
        success: false,
        error: {
            type: error.type as ErrorType,
            message: error.message,
            details: error.details,
            timestamp: new Date().toISOString(),
        },
    };
}