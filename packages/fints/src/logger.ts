import { createLogger } from "winston";

export const logger = createLogger();

logger.silent = true;

export const verbose = logger.verbose;
export const warn = logger.warn;
export const error = logger.error;
