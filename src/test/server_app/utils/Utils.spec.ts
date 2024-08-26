const requestMock = {
    on: jest.fn(),
};

const someObject = {
    name: "John",
    age: 30,
    city: "Paris",
};

const someObjectAsString = JSON.stringify(someObject);

describe("getRequestBody test suite", () => {
    test("should return object for valid JSON", async () => {
        requestMock.on.mockImplementation();
    });
    test("should throw error for invalid JSON", async () => {});
    test("should throw error for unexpected error", async () => {});
});
