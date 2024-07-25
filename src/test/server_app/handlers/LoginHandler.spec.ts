import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { IncomingMessage, ServerResponse } from "http";
import { Account } from "../../../app/server_app/model/AuthModel";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

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

    const someToken = "abcd";

    beforeEach(() => {
        sut = new LoginHandler(request as IncomingMessage, responseMock as any as ServerResponse, authorizerMock as any as Authorizer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should return token for valid accounts in requests", async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizerMock.login.mockResolvedValueOnce(someToken);
        await sut.handleRequest();
        expect(authorizerMock.login).toBeCalledWith(someAccount.userName, someAccount.password);
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, { "Content-Type": "application/json" });
        expect(responseMock.write).toBeCalledWith(JSON.stringify({ token: someToken }));
    });

    test("should return not found for invalid accounts in requests", async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizerMock.login.mockResolvedValueOnce(undefined);
    });

    test("should do nothing for not supported http methods", async () => {});
});
