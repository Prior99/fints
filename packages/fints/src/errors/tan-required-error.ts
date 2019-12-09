import { Response } from "../response";
import { HITAN } from "../segments/hitan";

export class TanRequiredError extends Error {
    hitan: HITAN;

    constructor(response: Response) {
        const message = response.returnValues().get('0030').message
        const hitan = response.findSegment(HITAN);
        super(message);
        this.hitan = hitan;
    }
}