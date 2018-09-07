import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./utils";
import { Dialog } from "./dialog";
import { Segment, HKSPA, HISPA, HKKAZ, HIKAZ } from "./segments";
import { Request } from "./request";
import { Response } from "./response";
import { SEPAAccount, Statement } from "./types";
import { read } from "mt940-js";
import { is86Structured, parse86Structured } from "./mt940-86-structured";

export abstract class Client {
    protected abstract createDialog(): Dialog;
    protected abstract createRequest(dialog: Dialog, segments: Segment<any>[], tan?: string): Request;

    public async accounts(): Promise<SEPAAccount[]> {
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

    public async statements(account: SEPAAccount, startDate: Date, endDate: Date): Promise<Statement[]> {
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
        const unprocessedStatements = await read(Buffer.from(bookedString, "utf8"));
        return unprocessedStatements.map(statement => {
            const transactions = statement.transactions.map(transaction => {
                if (!is86Structured(transaction.description)) { return transaction; }
                const descriptionStructured = parse86Structured(transaction.description);
                return { ...transaction, descriptionStructured };
            });
            return { ...statement, transactions };
        });
    }
}
