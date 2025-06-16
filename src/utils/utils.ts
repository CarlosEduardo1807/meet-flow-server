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

export const toDatabaseDate = (date?: string | Date): Date | undefined => {
    if (!date) return undefined;
    return new Date(date);
}

export const reqGet = async (url: string, headers?: any): Promise<any> => {
    try {
        await fetch(url, {
            method: "GET",
            headers: headers,
            cache: "no-cache"
        }).then((res) => {
            return res.json()
        })
    } catch (error) {
        return error
    }
}

export const reqPost = async (url: string, body?: any, headers?: any): Promise<any> => {
    try {
        const req = await fetch(url, {
            method: "POST",
            headers: headers || {},
            body: JSON.stringify(body || {})
        })
        const res = await req.json()
        return res
    } catch (error) {
        return error
    }
}