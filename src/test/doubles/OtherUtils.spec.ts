import { calculateComplexity, toUpperCaseWithCb } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", () => {
    describe.only("Tracking callbacks", () => {
        let cbArgs = [];
        let timesCalled = 0;

        function callbackMock(arg: string) {
            cbArgs.push(arg);
            timesCalled++;
        }

        afterEach(() => {
            // clear tracking fields
            cbArgs = [];
            timesCalled = 0;
        });

        it("ToUpperCase - calls callback for invalid ", () => {
            const actual = toUpperCaseWithCb("", callbackMock);
            expect(actual).toBe(undefined);
            expect(cbArgs).toContain("invalid argument!");
            expect(timesCalled).toBe(1);
        });

        it("ToUpperCase - calls callback for valid argument ", () => {
            const actual = toUpperCaseWithCb("abc", callbackMock);
            expect(actual).toBe("ABC");
            expect(cbArgs).toContain("called function with abc");
            expect(timesCalled).toBe(1);
        });
    });

    it("Calculates complexity", () => {
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: "someInfo",
                field2: "someOtherInfo",
            },
        };

        const actual = calculateComplexity(someInfo);
        expect(actual).toBe(10);
    });
});
