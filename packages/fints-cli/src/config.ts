import { option, Options } from "clime";
import { FinTSClientConfiguration } from "fints";

export class BaseFinTSConfig extends Options implements FinTSClientConfiguration {
    @option({ flag: "u", description: "FinTS endpoint URL." })
    public url: string;

    @option({ flag: "n", description: "Username used for connecting." })
    public name: string;

    @option({ flag: "p", description: "Pin used for connecting." })
    public pin: string;

    @option({ flag: "b", description: "BLZ od the bank to connect to." })
    public blz: string;
}
