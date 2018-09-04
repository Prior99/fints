import { option, Options } from "clime";
import { FinTSClientConfiguration } from "fints";
import * as YAML from "yamljs";

export class BaseFinTSConfig extends Options implements FinTSClientConfiguration {
    @option({ required: true, flag: "u", description: "FinTS endpoint URL." })
    public url: string;

    @option({ required: true, flag: "n", description: "Username used for connecting." })
    public name: string;

    @option({ required: true, flag: "p", description: "Pin used for connecting." })
    public pin: string;

    @option({ required: true, flag: "b", description: "BLZ od the bank to connect to." })
    public blz: string;

    @option({ toggle: true, flag: "d" })
    public debug: boolean;

    @option({ toggle: true, flag: "v" })
    public verbose: boolean;

    @option({ toggle: true, flag: "j" })
    public json: boolean;

    public get serializer() {
        return this.json ? JSON.stringify : (obj: any) => YAML.stringify(obj, 4);
    }
}
