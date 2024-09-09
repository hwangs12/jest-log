import { Server } from "../../../app/server_app/server/Server";

const requestMock = {};

const responseMock = {};

const serverMock = {};

jest.mock("http", () => ({
    createServer: (cb: Function) => {
        cb(requestMock, responseMock);
        return serverMock;
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
