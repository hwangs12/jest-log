const requestMock = {
    on: jest.fn(),
};

const someObject = {
    name: "John",
    age: 30,
    city: "Paris",
};

describe("getRequestBody test suite", () => {
    test("should return object for valid JS");
    test("should throw error for invalid JSON");
    test("should throw error for unexpected error");
});
