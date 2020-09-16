import { HICDB } from "../hicdb";
import { testSegment } from "./utils";
import { StandingOrder } from "../../types";

const standingOrder: StandingOrder = {
    nextOrderDate: new Date("2019-01-31"),
    timeUnit: "M",
    interval: 1,
    orderDay: 29,
    lastOrderDate: new Date("2020-06-30T00:00:00"),
    creationDate: new Date("2014-12-01T00:00:00"),
    amount: 90.2,
    paymentPurpose: "Common Order",
    debitor: {
        name: "Max Mustermann",
        iban: "DE27100777770209299700",
        bic: "DEUTDEFF500",
    },
    creditor: {
        name: "John Doe",
        iban: "DE58140369180198038800",
        bic: "DEU1GFAS800",
    },
};

testSegment(
    HICDB,
    [
        {
            serialized:
                `HICDB:5:1:3+DE27100777770209299700:DEUTDEFF500+sepade.pain.001.001.03.xsd+` +
                `@1031@<?xml version="1.0" encoding="UTF-8"?> ` +
                `<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03"><CstmrCdtTrfInitn><GrpHdr>` +
                `<MsgId>DA-SEPA-2019012616291839</MsgId><CreDtTm>2014-12-01T00:00:00</CreDtTm><NbOfTxs>1</NbOfTxs>` +
                `<CtrlSum>90.20</CtrlSum><InitgPty><Nm>Max Mustermann</Nm></InitgPty></GrpHdr><PmtInf>` +
                `<PmtInfId>241902</PmtInfId><PmtMtd>TRF</PmtMtd><PmtTpInf><SvcLvl><Cd>SEPA</Cd></SvcLvl></PmtTpInf>` +
                `<ReqdExctnDt>2019-01-31</ReqdExctnDt><Dbtr><Nm>Max Mustermann</Nm></Dbtr><DbtrAcct><Id>` +
                `<IBAN>DE27100777770209299700</IBAN></Id></DbtrAcct><DbtrAgt><FinInstnId><BIC>DEUTDEFF500</BIC>` +
                `</FinInstnId></DbtrAgt><ChrgBr>SLEV</ChrgBr><CdtTrfTxInf><PmtId><EndToEndId>NOTPROVIDED</EndToEndId>` +
                `</PmtId><Amt><InstdAmt Ccy="EUR">90.200</InstdAmt></Amt><CdtrAgt><FinInstnId><BIC>DEU1GFAS800</BIC>` +
                `</FinInstnId></CdtrAgt><Cdtr><Nm>John Doe</Nm></Cdtr><CdtrAcct><Id>` +
                `<IBAN>DE58140369180198038800</IBAN></Id></CdtrAcct><Purp><Cd>RINP</Cd></Purp><RmtInf>` +
                `<Ustrd>Common Order</Ustrd></RmtInf></CdtTrfTxInf></PmtInf></CstmrCdtTrfInitn></Document>+` +
                `97841129195143109616+20190131:M:1:29:20200630'`,
            structured: {
                type: "HICDB",
                segNo: 5,
                version: 1,
                reference: 3,
                standingOrder,
            },
        },
    ],
    "in",
);
