import { SegmentClass } from "./segment";
import { StandingOrder } from "../types";
import { Parse } from "../parse";
import {
    document,
    PaymentInstructionInformationSCT,
    CreditTransferTransactionInformationSCT,
    CustomerCreditTransferInitiationV03,
} from "../pain-formats";

export class HICDBProps {
    public segNo: number;
    public standingOrder: StandingOrder;
}

/**
 * HICDB (SEPA-Dauerauftragsbestand rückmelden)
 * Section C.10.2.3.4
 */
export class HICDB extends SegmentClass(HICDBProps) {
    public type = "HICDB";

    protected serialize(): string[][] { throw new Error("Not implemented."); }

    protected deserialize(input: string[][]) {
        const [
            [],
            [],
            [ sepaMessage ],
            [],
            [ nextOrder, timeUnit, interval, orderDay, lastOrder ],
        ] = input;

        const jsonMessage: CustomerCreditTransferInitiationV03 =
            Parse.xml<document>(sepaMessage).Document.CstmrCdtTrfInitn;
        const instructionInfo: PaymentInstructionInformationSCT = Array.isArray(jsonMessage.PmtInf)
            ? jsonMessage.PmtInf[0]
            : jsonMessage.PmtInf as PaymentInstructionInformationSCT;
        const creditTransaction: CreditTransferTransactionInformationSCT = Array.isArray(instructionInfo.CdtTrfTxInf)
            ? instructionInfo.CdtTrfTxInf[0]
            : instructionInfo.CdtTrfTxInf as CreditTransferTransactionInformationSCT;

        this.standingOrder = {
            nextOrderDate: Parse.date(nextOrder),
            timeUnit,
            interval: Parse.num(interval),
            orderDay: Parse.num(orderDay),
            lastOrderDate: lastOrder ? Parse.date(lastOrder) : null,
            creationDate: Parse.date(jsonMessage.GrpHdr.CreDtTm),
            debitorName: instructionInfo.Dbtr.Nm,
            debitorIban: instructionInfo.DbtrAcct.Id.IBAN,
            debitorBic: instructionInfo.DbtrAgt.FinInstnId.BIC,
            creditorName: creditTransaction.Cdtr.Nm,
            creditorIban: creditTransaction.CdtrAcct.Id.IBAN,
            creditorBic: creditTransaction.CdtrAgt.FinInstnId.BIC,
            amount: jsonMessage.GrpHdr.CtrlSum,
            paymentPurpose: creditTransaction.RmtInf.Ustrd,
        };
    }
}
