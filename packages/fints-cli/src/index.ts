#!/usr/bin/env node
import * as path from "path";
import { CLI, Shim } from "clime";
import * as Winston from "winston";
import { logger } from "fints";

logger.silent = false;

const transportConsole = new Winston.transports.Console({
    level: "verbose",
    format: Winston.format.combine(
        Winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss" }),
        Winston.format.colorize(),
        Winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`),
    ),
});
logger.add(transportConsole);

const cli = new CLI("fints", path.join(__dirname, "commands"));
const shim = new Shim(cli);
shim.execute(process.argv);
