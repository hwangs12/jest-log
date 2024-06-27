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

    describe("getStringInfo for arg My-String should", () => {
        test("return right length", () => {
            const actual = getStringInfo("My-String");
            expect(actual.characters).toHaveLength(9);
        });
        test("return right lower case", () => {
            const actual = getStringInfo("My-String");
            expect(actual.lowerCase).toBe("my-string");
        });
        test("return right upper case", () => {
            const actual = getStringInfo("My-String");
            expect(actual.upperCase).toBe("MY-STRING");
        });
        test("return right characters", () => {
            const actual = getStringInfo("My-String");
            expect(actual.characters).toEqual(["M", "y", "-", "S", "t", "r", "i", "n", "g"]);
            expect(actual.characters).toContain<string>("M");
            expect(actual.characters).toEqual(expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"]));
        });
        test("return defined extra info", () => {
            const actual = getStringInfo("My-String");
            expect(actual.extraInfo).toBeDefined();
        });
    });

    it("should return info for valid string", () => {
        const actual = getStringInfo("My-String");

        expect(actual.lowerCase).toBe("my-string");
        expect(actual.extraInfo).toEqual({}); //toBe won't work on object equality
        expect(actual.characters.length).toBe(9);
        expect(actual.characters).toHaveLength(9);

        expect(actual.extraInfo).not.toBe(undefined);
        expect(actual.extraInfo).not.toBeUndefined();
        expect(actual.extraInfo).toBeDefined();
        expect(actual.extraInfo).toBeTruthy();
    });
});
