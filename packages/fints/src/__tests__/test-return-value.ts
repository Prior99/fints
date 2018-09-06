import { ReturnValue } from "../return-value";

test("success", () => {
    const returnValue = new ReturnValue({ code: "0010", message: "Some message", parameters: [] });
    expect(returnValue.success).toBe(true);
    expect(returnValue.warning).toBe(false);
    expect(returnValue.error).toBe(false);
});

test("success", () => {
    const returnValue = new ReturnValue({ code: "3020", message: "Some message", parameters: [] });
    expect(returnValue.success).toBe(false);
    expect(returnValue.warning).toBe(true);
    expect(returnValue.error).toBe(false);
});

test("success", () => {
    const returnValue = new ReturnValue({ code: "9040", message: "Some message", parameters: [] });
    expect(returnValue.success).toBe(false);
    expect(returnValue.warning).toBe(false);
    expect(returnValue.error).toBe(true);
});
