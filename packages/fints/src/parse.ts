import { SEPAAccount } from "./types";
import { unescapeFinTS } from "./utils";

export const Parse = {
    bool(str: string) {
        if (str === "J") { return true; }
        return false;
    },
    num(str: string): number {
        return Number(str);
    },
    dig(str: string): number {
        if (str === "0") { return 0; }
        while (str.startsWith("0")) { str = str.substr(1, str.length); }
        return Number(str);
    },
};
