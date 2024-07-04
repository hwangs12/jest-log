import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    });

    it("Should do nothing for the moment", () => {
        const actual = sut.checkPassword("1234567");
        expect(actual).toBe(false);
    });
});
