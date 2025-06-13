import { randomInt } from "crypto";

export const generatePassword = (): string => {
    return randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export const validateId = (id: string): boolean => {
    if (!id || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
        return false;
    }
    return true
}