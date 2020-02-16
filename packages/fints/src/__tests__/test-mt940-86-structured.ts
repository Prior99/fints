import { is86Structured, parse86Structured } from "../mt940-86-structured";

const testData = [
    {
        str: "105?00FOLGELASTSCHRIFT?109248?20EREF+1003760276550 PP.7723.?21PP PAYPAL?22MREF+5Z7J224S5B3QS?23CRED+LU96ZZZ000000000000000?240058?25SVWZ+PP.7723.PP . GOOGLE, I?26hr Einkauf bei GOOGLE?30DEUTDEFFXXX?31DE88500700100175526303?32PayPal (Europe) S.a.r.l. et?33 Cie., S.C.A.?34992", // tslint:disable-line
        parsed: {
            bic: "DEUTDEFFXXX",
            iban: "DE88500700100175526303",
            reference: {
                creditorId: "LU96ZZZ0000000000000000058",
                endToEndRef: "1003760276550 PP.7723.PP PAYPAL",
                mandateRef: "5Z7J224S5B3QS",
                text: "PP.7723.PP . GOOGLE, Ihr Einkauf bei GOOGLE",
                raw: "EREF+1003760276550 PP.7723.PP PAYPALMREF+5Z7J224S5B3QSCRED+LU96ZZZ0000000000000000058SVWZ+PP.7723.PP . GOOGLE, Ihr Einkauf bei GOOGLE", // tslint:disable-line
            },
            primaNota: "9248",
            name: "PayPal (Europe) S.a.r.l. et Cie., S.C.A.",
            text: "FOLGELASTSCHRIFT",
        },
    },
    {
        str: "008?00DAUERAUFTRAG?100599?20Miete November?3010020030?31234567?32MUELLER?34339",
        parsed: {
            bic: "10020030",
            iban: "234567",
            reference: { raw: "Miete November" },
            name: "MUELLER",
            text: "DAUERAUFTRAG",
            primaNota: "0599",
        },
    },
    {
        str: "051?00UEBERWEISUNG?100599?20Gehalt Oktober\n?21Firma Mustermann GmbH?3050060400?310847564700?32MUELLER?34339", // tslint:disable-line
        parsed: {
            bic: "50060400",
            iban: "0847564700",
            reference: { raw: "Gehalt Oktober\nFirma Mustermann GmbH" },
            name: "MUELLER",
            text: "UEBERWEISUNG",
            primaNota: "0599",
        },
    },
    {
        str: "177?00ONLINE-UEBERWEISUNG?109310?20KREF+1053050069-20180829182?21432?22SVWZ+KMC Huellen?23DATUM 29.08.2018, 18.25 UHR?241.TAN 389252?30COBADEFFXXX?31DE32250400660167600600?32Players-Point GbR?34997", // tslint:disable-line
        parsed: {
            bic: "COBADEFFXXX",
            iban: "DE32250400660167600600",
            reference: {
                customerRef: "1053050069-20180829182432",
                date: new Date("2018-08-29T18:25:00.000Z"),
                text: "KMC Huellen",
                raw: "KREF+1053050069-20180829182432SVWZ+KMC HuellenDATUM 29.08.2018, 18.25 UHR1.TAN 389252",
                tan: {
                    num: 1,
                    value: "389252",
                },
            },
            primaNota: "9310",
            name: "Players-Point GbR",
            text: "ONLINE-UEBERWEISUNG",
        },
    },
];

describe("parse86Structured", () => {
    testData.forEach(({ str, parsed }, index) => {
        test(`Parsing the 86 section of MT940 data, test data set ${index}`, () => {
            expect(parse86Structured(str)).toEqual(parsed);
        });
    });
});

describe("is86Structured", () => {
    testData.forEach(({ str }, index) => {
        test(`detectes test data set ${index} as valid`, () => {
            expect(is86Structured(str)).toBe(true);
        });
    });

    [
        "",
        "MIETE November 2018",
        "/Something/Formatted?/In/a:different:way?",
        "012abc?a321423?abc231234421231?bde",
    ].forEach(str => {
        test(`detects "${str}" as invalid`, () => {
            expect(is86Structured(str)).toBe(false);
        });
    });
});
