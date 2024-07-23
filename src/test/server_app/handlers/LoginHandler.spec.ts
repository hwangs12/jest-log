import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { IncomingMessage, ServerResponse } from "http";
import { Account } from "../../../app/server_app/model/AuthModel";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
    getRequestBody: () => getRequestBodyMock(),
}));

describe("Login Handler Test Suite", () => {
    let sut: LoginHandler;
    const request = {
        method: undefined,
    };

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn(),
    };

    const authorizerMock = {
        registerUser: jest.fn(),
        login: jest.fn(),
    };

    const someAccount: Account = {
        id: "",
        password: "somePassword",
        userName: "someUserName",
    };

    const someId = "1234";
    beforeEach(() => {
        sut = new LoginHandler(request as IncomingMessage, responseMock as any as ServerResponse, authorizerMock as any as Authorizer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should login valid accounts in requests", async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        await sut.handleRequest();
        expect(authorizerMock.login).toHaveBeenCalledWith(someAccount.userName, someAccount.password);
    });

    test("should not login invalid accounts in requests", async () => {});

    test("should do nothing for not supported http methods", async () => {});
});
