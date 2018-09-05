import "isomorphic-fetch";
import { encodeBase64, decodeBase64 } from "./base64";
import { FinTSDialog } from "./dialog";
import { Segment, HKSPA, HISPA, HKKAZ, HIKAZ } from "./segments";
import { Request } from "./request";
import { SEPAAccount } from "./sepa-account";
import { Response } from "./";

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

    public async getStatements(account: SEPAAccount): Promise<any[]> {
        const startDate = new Date("2018-05-01T12:00:00Z");
        const endDate = new Date("2018-09-01T12:00:00Z");
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
                    version: dialog.hikazVersion,
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
        const segments = responses.reduce((result, response: Response) => {
            result.push(...response.findSegments(HIKAZ));
            return result;
        }, []);
        return segments;
    }
}
