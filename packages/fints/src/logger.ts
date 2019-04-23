import { createLogger } from "winston";

export const logger = createLogger();

logger.silent = true;

export const verbose = (...args: any[]) => logger.verbose(...args);
export const warn = (...args: any[]) => logger.warn(...args);
export const error = (...args: any[]) => logger.error(...args);
