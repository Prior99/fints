import { HIRMG } from "../hirmg";
import { testSegment } from "./utils";

testSegment(HIRMG, [
    {
        serialized: "HIRMG:2:2+" +
            "0010::Nachricht entgegengenommen.+" +
            "3020::Noch eine Nachricht.:1:2:3+" +
            "9030::Ein Fehler ist aufgetreten.'",
        structured: {
            type: "HIRMG",
            segNo: 2,
            version: 2,
            reference: undefined,
            returnValues: new Map<string, any>([
                [
                    "0010", {
                        code: "0010",
                        message: "Nachricht entgegengenommen.",
                        parameters: [],
                    },
                ],
                [
                    "3020", {
                        code: "3020",
                        message: "Noch eine Nachricht.",
                        parameters: ["1", "2", "3"],
                    },
                ],
                [
                    "9030", {
                        code: "9030",
                        message: "Ein Fehler ist aufgetreten.",
                        parameters: [],
                    },
                ],
            ]),
        },
    },
], "in");
