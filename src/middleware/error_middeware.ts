import { Request, Response, NextFunction } from 'express';
import { ErrorType } from "../types/ErrorType"
import { any, ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '../generated/prisma/runtime/library';

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
        const validationResponse: ErrorResponse = {
            success: false,
            error: {
                type: ErrorType.VALIDATION,
                message: 'Validation failed',
                details: err.errors.map(e => ({
                    path: e.path.join('.'),
                    message: e.message,
                    code: e.code
                })),
                timestamp: new Date().toISOString()
            }
        };
        return res.status(422).json(validationResponse);
    }

    if (err instanceof PrismaClientKnownRequestError) {
        const prismaErrorResponse: ErrorResponse = {
            success: false,
            error: {
                type: ErrorType.DATABASE,
                message: 'Erro no banco de dados',
                details: {
                    code: err.code,
                    meta: err.meta,
                    message: getPrismaErrorMessage(err) // Método auxiliar
                },
                timestamp: new Date().toISOString()
            }
        };
        return res.status(getPrismaErrorStatus(err.code)).json(prismaErrorResponse);
    }

    let errorType = ErrorType.INTERNAL;
    let statusCode = 500;
    let message = 'Ocorreu um erro interno no servidor';
    let details = undefined;

    if (err.name === 'ValidationError' || err.type === ErrorType.VALIDATION) {
        errorType = ErrorType.VALIDATION;
        statusCode = 422;
        message = 'Erro de validação';
        details = err.details || err.message;
    } else if (err.name === 'NotFoundError' || err.type === ErrorType.NOT_FOUND) {
        errorType = ErrorType.NOT_FOUND;
        statusCode = 404;
        message = err.message || 'Recurso não encontrado';
    } else if (err.name === 'UnauthorizedError' || err.type === ErrorType.UNAUTHORIZED) {
        errorType = ErrorType.UNAUTHORIZED;
        statusCode = 401;
        message = err.message || 'Não autorizado';
    } else if (err.name === 'ForbiddenError' || err.type === ErrorType.FORBIDDEN) {
        errorType = ErrorType.FORBIDDEN;
        statusCode = 403;
        message = err.message || 'Acesso proibido';
    } else if (err.name === 'ConflictError' || err.code === '23505' || err.type === ErrorType.CONFLICT) {
        errorType = ErrorType.CONFLICT;
        statusCode = 409;
        message = err.message || 'Conflito de dados';
    } else if (err.name === 'BusinessError' || err.type === ErrorType.BUSINESS) {
        errorType = ErrorType.BUSINESS;
        statusCode = 400;
        message = err.message || 'Violação de regra de negócio';
    } else if (err.code && err.code.startsWith('22') || err.code === '23502') {
        errorType = ErrorType.DATABASE;
        statusCode = 400;
        message = 'Erro de integridade de dados';
    } else if (err.name === 'CreateSdkLiveError' || err.type === ErrorType.ERROR_SDK_LIVE) {
        errorType = ErrorType.ERROR_SDK_LIVE;
        statusCode = 400;
        message = err.message || 'Erro no video sdk live';
    }

    if (err.details) {
        details = err.details;
    }

    const errorResponse: ErrorResponse = {
        success: false,
        error: {
            type: errorType,
            message: message,
            details: details,
            timestamp: new Date().toISOString()
        }
    };

    res.status(statusCode).json(errorResponse);
}

export function throwError(type: ErrorType, message: string, details?: any): never {
    const error = new Error(message);
    (error as any).type = type;
    if (details) (error as any).details = details;
    throw error;
}

// Métodos auxiliares (pode adicionar na classe)
export function getPrismaErrorMessage(err: PrismaClientKnownRequestError): string {
    const targetFields = (err.meta as any)?.target as string[] | undefined;
    const fieldName = (err.meta as any)?.field_name as string | undefined;
    const cause = (err.meta as any)?.cause as string | undefined;

    const messages = {
        P2002: `Conflito em campo único: ${targetFields?.join(', ') || 'campo desconhecido'}`,
        P2003: `Violação de chave estrangeira no campo: ${fieldName || 'campo desconhecido'}`,
        P2025: cause || 'Registro não encontrado',
        default: 'Erro na operação com o banco de dados'
    };

    return messages[err.code as keyof typeof messages] || messages.default;
}

export function getPrismaErrorStatus(code: string): number {
    const statusCodes = {
        P2002: 409, // Conflict
        P2003: 400, // Bad Request
        P2025: 404, // Not Found
        default: 500 // Internal Server Error
    };
    return statusCodes[code as keyof typeof statusCodes] || statusCodes.default;
}