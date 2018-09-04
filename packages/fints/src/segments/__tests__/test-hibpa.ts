import { HIBPA } from "../hibpa";

const testData = [
    {
        serialized: "HIBPA:4:3:4+3+280:10020030+Musterbank in Musterstadt+1+1:2:3+201:210:220:300+100",
        structured: {
            type: "HIBPA",
            segNo: 4,
            version: 3,
            bpdVersion: 3,
            countryCode: 280,
            blz: "10020030",
            bankName: "Musterbank in Musterstadt",
            transactionTypeCount: 1,
            lang: 1,
            hbciVersion: 2,
        },
    },
];

testData.forEach(({ serialized, structured }, index) => {
    test(`Segment "HIBPA" deserializes test data set ${index}`, () => {
        const segment = new HIBPA(serialized);
        expect(segment).toEqual(structured);
    });

    test(`Segment "HIBPA" serializes test data set ${index}`, () => {
        const segment = new HIBPA(structured);
        expect(String(segment)).toEqual(serialized);
    });
});
