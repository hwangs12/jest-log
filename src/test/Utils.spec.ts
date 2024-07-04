import { getStringInfo, toUpperCase, StringUtils } from "../app/Utils";

describe("Utils test suite", () => {
    describe("StringUtils test", () => {
        let sut: StringUtils;

        beforeEach(() => {
            sut = new StringUtils();
        });

        it("Should return correct upperCase", () => {
            const actual = sut.toUpperCase("abc");
            expect(actual).toBe("ABC");
        });

        it("Should throw error on invalid argument - function", () => {
            function expectError() {
                const actual = sut.toUpperCase("");
            }
            expect(expectError).toThrow();
            expect(expectError).toThrow("Invalid!");
        });

        it("Should throw error on invalid argument - arrow function", () => {
            expect(() => {
                sut.toUpperCase("");
            }).toThrow("Invalid!");
        });

        it("Should throw error on invalid argument - try catch block", (done) => {
            // the issue with try catch test is that if the throw is removed from the function it will still pass the test because they will not hit the catch block.
            try {
                sut.toUpperCase("");
                done("argument should be of valid string");
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty("message", "Invalid!");
                done();
            }
        });
    });

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

    describe("ToUpperCase exapmles", () => {
        it.each([
            { input: "abc", expected: "ABC" },
            { input: "My-String", expected: "MY-STRING" },
            { input: "def", expected: "DEF" },
        ])("$input toUpperCase should be $expected", ({ input, expected }) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
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
