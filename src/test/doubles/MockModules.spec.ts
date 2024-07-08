jest.mock("../../app/doubles/OtherUtils", () => ({
    ...jest.requireActual("../../app/doubles/OtherUtils"), // this allows functions are kept as is
    calculateComplexity: () => {
        return 10;
    },
}));

jest.mock("uuid", () => ({
    v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe.only("modules tests", () => {
    test("calculate complexity", () => {
        const result = OtherUtils.calculateComplexity({} as any);
        console.log(result);
        // result is undefined because everything from otherutils is now empty function (mocked)
        expect(result).toBe(10);
        // to work this out, you specify in the second arg, with callback
    });

    test("keep other functions", () => {
        const result = OtherUtils.toUpperCase("abc");
        expect(result).toBe("ABC");
    });

    test("string with id", () => {
        const result = OtherUtils.toLowerCaseWithId("ABC");
        expect(result).toBe("abc123");
    });
});
