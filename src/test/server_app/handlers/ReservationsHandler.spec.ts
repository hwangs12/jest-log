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

    const someReservation: Reservation = {
        id: undefined,
        endDate: new Date().toDateString(),
        startDate: new Date().toDateString(),
        room: "someRoom",
        user: "someUser",
    };

    const someReservationId = "1234";

    beforeEach(() => {
        sut = new ReservationsHandler(
            request as IncomingMessage,
            responseMock as any as ServerResponse,
            authorizerMock as any as Authorizer,
            reservationsDataAccessMock as any as ReservationsDataAccess
        );
        request.headers.authorization = "abcd";
        authorizerMock.validateToken.mockResolvedValueOnce(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
        request.url = undefined;
        responseMock.statusCode = 0;
    });

    describe("POST reqeusts", () => {
        beforeEach(() => {
            request.method = HTTP_METHODS.POST;
        });

        test("should create reservation from valid request", async () => {
            getRequestBodyMock.mockResolvedValueOnce(someReservation);
            reservationsDataAccessMock.createReservation.mockResolvedValueOnce(someReservationId);

            await sut.handleRequest();

            expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
        });
    });
});
