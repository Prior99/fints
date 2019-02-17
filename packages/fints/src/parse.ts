import { parse as parseDate } from "date-fns";
import { parse as parseXml } from "fast-xml-parser";

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
        if (typeof str === "undefined") { return; }
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
    /**
     * Parse a date.
     *
     * @param str The string or date to parse.
     *
     * @return The parsed date.
     */
    date(str: string|Date): Date {
        return parseDate(str);
    },
    /**
     * Parse a xml document to an object.
     *
     * @param str The xml parse.
     *
     * @return The parsed object.
     */
    xml(str: string): unknown {
        return parseXml(str);
    },
};
