import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./utils";
import { FinTSDialog } from "./dialog";
import { Segment, HKSPA, HISPA, HKKAZ, HIKAZ } from "./segments";
import { Request } from "./request";
import { Response } from "./response";
import { SEPAAccount } from "./types";
import { Statements } from "./statements";
import { read, Statement } from "mt940-js";

export abstract class FinTSClient {
    protected abstract createDialog(): FinTSDialog;
    protected abstract createRequest(dialog: FinTSDialog, segments: Segment<any>[], tan?: string): Request;

    public async getSEPAAccounts(): Promise<SEPAAccount[]> {
        const dialog = this.createDialog();
        await dialog.sync();
        await dialog.init();
        const response = await dialog.send(this.createRequest(dialog, [
            new HKSPA({ segNo: 3 }),
        ]));
        await dialog.end();
        const hispa = response.findSegment(HISPA);
        return hispa.accounts;
    }

    public async getStatements(account: SEPAAccount, startDate: Date, endDate: Date): Promise<any> {
        const dialog = this.createDialog();
        await dialog.sync();
        await dialog.init();
        let touchdowns: Map<string, string>;
        let touchdown: string;
        const responses: Response[] = [];
        do {
            const request = this.createRequest(dialog, [
                new HKKAZ({
                    segNo: 3,
                    version: dialog.hikazsVersion,
                    account,
                    startDate,
                    endDate,
                    touchdown,
                }),
            ]);
            const response = await dialog.send(request);
            touchdowns = response.getTouchdowns(request);
            touchdown = touchdowns.get("HKKAZ");
            responses.push(response);
        } while (touchdown);
        await dialog.end();
        const segments: HIKAZ[] = responses.reduce((result, response: Response) => {
            result.push(...response.findSegments(HIKAZ));
            return result;
        }, []);
        const bookedString = segments.map(segment => segment.bookedTransactions || "").join("");
        const booked: Statement[] = await read(Buffer.from(bookedString, "utf8"));
        const pendingString = segments.map(segment => segment.pendingTransactions || "").join("");
        const pending: Statement[] = await read(Buffer.from(pendingString, "utf8"));
        return new Statements({ booked, pending });
    }
}
