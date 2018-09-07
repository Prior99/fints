import { SEPAAccount } from "./types";
import { unescapeFinTS } from "./utils";

/**
 * A set of utilities for parsing data from the fints data formats.
 */
export const Parse = {
    /**
     * Parse a boolean (JN).
     *
     * @param str The string to parse.
     *
     * @return The parsed boolean.
     */
    bool(str: string) {
        if (str === "J") { return true; }
        return false;
    },
    /**
     * Parse a number.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    num(str: string): number {
        return Number(str.replace(/,/, "."));
    },
    /**
     * Parse a set of digits.
     *
     * @param str The string to parse.
     *
     * @return The parsed number.
     */
    dig(str: string): number {
        if (str === "0") { return 0; }
        while (str.startsWith("0")) { str = str.substr(1, str.length); }
        return Number(str);
    },
};
