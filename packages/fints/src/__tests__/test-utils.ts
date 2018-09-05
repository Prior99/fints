import { parse } from "../utils";

describe("parse", () => {
    const testData = [
        {
            str: "ABC:1:2:3+TEST+TEST'CDE:FGH+33+33'4'",
            segments: [
                [
                    ["ABC", "1", "2", "3"],
                    ["TEST"],
                    ["TEST"],
                ],
                [
                    ["CDE", "FGH"],
                    ["33"],
                    ["33"],
                ],
                [
                    ["4"],
                ],
            ],
        },
        {
            str: "ABC+@5@12345:98+9'@3@abc+9'",
            segments: [
                [
                    ["ABC"],
                    ["12345", "98"],
                    ["9"],
                ],
                [
                    ["abc"],
                    ["9"],
                ],
            ],
        },
        {
            str: "ABC+@5@12345:98+9'@3@abc+9'",
            segments: [
                [
                    ["ABC"],
                    ["12345", "98"],
                    ["9"],
                ],
                [
                    ["abc"],
                    ["9"],
                ],
            ],
        },
        {
            str: "ABC:@10@;:?+@@''??:??'A+B+C'",
            segments: [
                [
                    ["ABC", ";:?+@@''??", "?"],
                ],
                [
                    ["A"],
                    ["B"],
                    ["C"],
                ],
            ],
        },
        {
            str: "???:?@?'':::++''",
            segments: [
                [
                    ["?:@'"],
                ],
                [
                    ["", "", "", ""],
                    [""],
                    [""],
                ],
                [
                    [""],
                ],
            ],
        },
        {
            str: "ABC:DEF'",
            segments: [
                [
                    ["ABC", "DEF"],
                ],
            ],
        },
        {
            str: "HIRMG:2:2+" +
                "0010::Nachricht entgegengenommen.+" +
                "3020::Noch eine Nachricht.:1:2:3+" +
                "9030::Ein Fehler ist aufgetreten.'",
            segments: [
                [
                    ["HIRMG", "2", "2"],
                    ["0010", "", "Nachricht entgegengenommen."],
                    ["3020", "", "Noch eine Nachricht.", "1", "2", "3"],
                    ["9030", "", "Ein Fehler ist aufgetreten."],
                ],
            ],
        },
    ];

    testData.forEach(({ str, segments }) => {
        test(str, () => expect(parse(str)).toEqual(segments));
    });
});
