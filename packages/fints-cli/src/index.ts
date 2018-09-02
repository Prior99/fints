#!/usr/bin/env node
import * as path from "path";
import { CLI, Shim } from "clime";

const cli = new CLI("fints", path.join(__dirname, "commands"));
const shim = new Shim(cli);
shim.execute(process.argv);
