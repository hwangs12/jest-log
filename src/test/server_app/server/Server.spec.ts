import { Server } from "../../../app/server_app/server/Server";

const requestMock = {};

const responseMock = {};

jest.mock("http", () => ({
    createServer: (cb: Function) => {
        cb(requestMock, responseMock);
    },
}));

describe("Server test suite", () => {
    let sut: Server;

    beforeEach(() => {
        sut = new Server();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
