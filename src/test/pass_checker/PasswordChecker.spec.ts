import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    it("Password with less than 8 chars is invalid", () => {
        const actual = sut.checkPassword("1234567");
        expect(actual).toBe(false);
    });

    it("Password with more than 8 chars is ok", () => {
        const actual = sut.checkPassword("12345678");
        expect(actual).toBe(true);
    });
});
