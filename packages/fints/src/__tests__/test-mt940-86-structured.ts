import { is86Structured, parse86Structured } from "../mt940-86-structured";

describe("parse86Structured", () => {
    const testData = [
        {
            str: "105?00FOLGELASTSCHRIFT?109248?20EREF+1003760276550 PP.7723.?21PP PAYPAL?22MREF+5Z7J224S5B3QS?23CRED+LU96ZZZ000000000000000?240058?25SVWZ+PP.7723.PP . GOOGLE, I?26hr Einkauf bei GOOGLE?30DEUTDEFFXXX?31DE88500700100175526303?32PayPal (Europe) S.a.r.l. et?33 Cie., S.C.A.?34992", // tslint:disable-line
            parsed: {
                bic: "DEUTDEFFXXX",
                iban: "DE88500700100175526303",
                paymentReference: "PP.7723.PP . GOOGLE, Ihr Einkauf bei GOOGLE",
                recipientName: "PayPal (Europe) S.a.r.l. et Cie., S.C.A.",
                text: "FOLGELASTSCHRIFT",
            },
        },
    ];

    testData.forEach(({ str, parsed }, index) => {
        test(`Parsing the 86 section of MT940 data, test data set ${index}`, () => {
            expect(parse86Structured(str)).toEqual(parsed);
        });
    });
});
