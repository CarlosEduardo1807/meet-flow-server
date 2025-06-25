import { validateRequest } from 'zod-express-middleware';
import { ErrorDetected } from './error';
import { ErrorType } from '../types/ErrorType';
import { ZodError } from 'zod';
import { NextFunction, Request, Response } from 'express';

export function validate(schema: any) {
    return [
        validateRequest(schema),
        (err: any, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof ZodError) {
                ErrorDetected(ErrorType.VALIDATION, 'Validation failed', {
                    errors: err.errors.map(e => ({
                        path: e.path.join('.'),
                        message: e.message,
                        code: e.code
                    }))
                });
            }
            next();
        }
    ];
}