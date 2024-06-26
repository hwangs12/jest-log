import { getStringInfo, toUpperCase } from "../app/Utils";

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

    it("should return uppercase of valid string", () => {
        const sut = toUpperCase;
        const expected = "ABC";

        const actual = sut("abc");

        expect(actual).toBe(expected);
    });

    it("should return info for valid string", () => {
        const actual = getStringInfo("My-String");

        expect(actual.lowerCase).toBe("my-string");
        expect(actual.extraInfo).toEqual({}); //toBe won't work on object equality
        expect(actual.characters.length).toBe(9);
        expect(actual.characters).toHaveLength(9);
    });
});
