import {ClassMetadata} from "./class.metadata";

describe("Class Metadata", () => {
    it("should define the metadata on the class and retrieve it", () => {
        class ClassWithMetadata {}

        ClassMetadata.defineMetadata(ClassWithMetadata, "keyname", "value");
        expect(ClassMetadata.getMetadata(ClassWithMetadata, "keyname")).toBe("value");

        const classWithMetadata = new ClassWithMetadata();
        expect(ClassMetadata.getMetadata(classWithMetadata.constructor, "keyname")).toBe("value")
    })
})