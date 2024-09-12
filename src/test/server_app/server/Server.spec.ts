import { Server } from "../../../app/server_app/server/Server";

const requestMock = {
    url: "",
    headers: {
        "user-agent": "jest",
    },
};

const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn(),
};

const serverMock = {
    listen: jest.fn(),
    close: jest.fn(),
};

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
