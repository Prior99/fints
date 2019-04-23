import { createLogger } from "winston";

export const logger = createLogger();

logger.silent = true;

export const verbose = (...args: any[]) => (logger.verbose as any)(...args);
export const warn = (...args: any[]) => (logger.warn as any)(...args);
export const error = (...args: any[]) => (logger.error as any)(...args);
