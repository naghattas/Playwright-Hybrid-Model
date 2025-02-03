// src/utils/Logger.ts
export interface ILogger {
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
}

export class Logger implements ILogger {
    public info(message: string): void {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }

    public error(message: string): void {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }

    public warn(message: string): void {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }

    public debug(message: string): void {
        console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
}