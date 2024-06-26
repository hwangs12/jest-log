import { toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
    test("should return uppercase", () => {
        // arrange:
        const sut = toUpperCase; // sut: structure under test
        const expected = "ABC";

        // act:
        const actual = toUpperCase("abc");

        // assertion:
        expect(actual).toBe(expected);
    });
});
