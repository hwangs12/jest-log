import { IncomingMessage, ServerResponse } from "http";
import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
    getRequestBody: () => getRequestBodyMock(),
}));

describe("Reservation Handler Test Suite", () => {
    let sut: ReservationsHandler;
    const request = {
        method: undefined,
        headers: {
            authorization: undefined,
        },
        url: undefined,
    };

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn(),
    };

    const authorizerMock = {
        registerUser: jest.fn(),
        validateToken: jest.fn(),
    };

    const reservationsDataAccessMock = {
        createReservation: jest.fn(),
        updateReservation: jest.fn(),
        deleteReservation: jest.fn(),
        getReservation: jest.fn(),
        getAllReservations: jest.fn(),
    };

    const someAccount: Account = {
        id: "",
        password: "somePassword",
        userName: "someUserName",
    };

    const someId = "1234";

    const someToken = "abcd";

    beforeEach(() => {
        sut = new ReservationsHandler(
            request as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizerMock as any as Authorizer,
            reservationsDataAccessMock as any as ReservationsDataAccess
        );
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
        await sut.handleRequest();

        expect(authorizerMock.login).toBeCalledWith(someAccount.userName, someAccount.password);
        expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
        expect(responseMock.write).toBeCalledWith(JSON.stringify("wrong username or password"));
    });

    test("should return bad request for invalid requests", async () => {
        request.method = HTTP_METHODS.POST;
        getRequestBodyMock.mockResolvedValueOnce({});
        await sut.handleRequest();
        expect(authorizerMock.login).not.toBeCalled();
        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseMock.write).toBeCalledWith(JSON.stringify("userName and password required"));
    });
    test("should do nothing for not supported http methods", async () => {
        request.method = HTTP_METHODS.GET;
        await sut.handleRequest();

        expect(responseMock.writeHead).not.toBeCalled();
        expect(responseMock.write).not.toBeCalled();
        expect(getRequestBodyMock).not.toBeCalled();
    });
});
