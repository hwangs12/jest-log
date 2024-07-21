import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";

describe("RegisterHandler test suite", () => {
    let sut: RegisterHandler;
    const request = {
        method: undefined,
    };

    const responseMock = {};

    const authorizerMock = {};
    beforeEach(() => {
        sut = new RegisterHandler(request as any, responseMock as any, authorizerMock as any);
    });
});
