import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
}

export function comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}