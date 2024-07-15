import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
    id: string;
    name: string;
    color: string;
};

describe("Database test suite", () => {
    let sut: DataBase<someTypeWithId>;

    const fakeId = "1234";

    const someObject = {
        id: "",
        name: "someName",
        color: "blue",
    };

    beforeEach(() => {
        sut = new DataBase<someTypeWithId>();
        jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
    });

    test("should return id after insert", async () => {
        const actual = await sut.insert({
            id: "",
        } as any);

        expect(actual).toBe(fakeId);
    });

    test("should get element after insert", async () => {
        const id = await sut.insert(someObject);
        const actual = await sut.getBy("id", id);

        expect(actual).toBe(someObject);
    });

    test("should find all elements with the same property", async () => {
        const id = await sut.insert(someObject);
        const actual = await sut.getBy("id", id);

        expect(actual).toBe(someObject);
    });
});
