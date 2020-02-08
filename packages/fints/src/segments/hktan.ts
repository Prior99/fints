import { SegmentClass } from "./segment";

export class HKTANProps {
  public segNo: number;
  public version: number;
  public process: string;
  public segmentReference: string;
  public aref: string;
  public medium: string;
}

/**
 * HKTAN (TAN-Verfahren festlegen)
 * Section B.5.1
 */
export class HKTAN extends SegmentClass(HKTANProps) {
  public type = "HKTAN";

  protected deserialize() {
    throw new Error("Not implemented.");
  }

  protected serialize() {
    const { process, segmentReference, aref, medium, version } = this;
    if (!["2", "4"].includes(process)) {
      throw new Error(`HKTAN process ${process} not implemented.`);
    }
    if (![3, 4, 5, 6].includes(version)) {
      throw new Error(`HKTAN version ${process} not implemented.`);
    }
    if (process === "4") {
      if (medium) {
        if (version === 3) {
          return [process, segmentReference, "", "", "", "", "", "", medium];
        }
        if (version === 4) {
          return [process, segmentReference, "", "", "", "", "", "", "", medium];
        }
        if (version === 5) {
          return [process, segmentReference, "", "", "", "", "", "", "", "", "", medium];
        }
        if (version === 6) {
          return [process, segmentReference, "", "", "", "", "", "", "", "", medium];
        }
      } else {
        if (version === 6) {
          return [process, "HKIDN"];
        } else {
          return [process];
        }
      }
    } else if (process === "2") {
      if (version === 6) {
        return [process, "", "", "", aref, "N"];
      }
      if (version === 5) {
        return [process, segmentReference, "", "", aref, "", "N"];
      }
      if (version === 3 || version === 4) {
        return [process, segmentReference, aref, "", "N"];
      }
    }
  }
}
