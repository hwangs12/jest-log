import { Server } from "../../../app/server_app/server/Server";

jest.mock("http", () => ({
    createServer: (cb: Function) => {
        cb();
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
