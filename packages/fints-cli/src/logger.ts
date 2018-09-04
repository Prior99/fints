import { logger as libLogger } from "fints";
import * as Winston from "winston";

const transport = new Winston.transports.Console({
    level: "verbose",
    format: Winston.format.combine(
        Winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss" }),
        Winston.format.colorize(),
        Winston.format.printf(param => `${param.timestamp} - ${param.level}: ${param.message}`),
    ),
});

libLogger.silent = false;
libLogger.add(transport);

export function setLevel(isVerbose: boolean) {
    const level = isVerbose ? "verbose" : "info";
    transport.level = level;
}

export const logger = Winston.createLogger({ transports: [ transport ] });

export const verbose = logger.verbose;
export const info = logger.info;
export const warn = logger.warn;
export const error = logger.error;
