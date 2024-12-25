import "reflect-metadata"
import {BaseMetadata} from "./base.metadata";

describe("Base Metadata", () => {
    it("should retrieve the metadata on the class and object", () => {
        @Reflect.metadata("key", "value")
        class MetadataClass {
            @Reflect.metadata("key_title", "value_title")
            title: string;
        }

        const metadataClass = new MetadataClass();

        let metadata = BaseMetadata.getMetadata("key", MetadataClass);
        expect(metadata).toBe("value");

        // We have to pass `.constructor` here since we are looking for the prototype of the class since that's where the
        // metadata is stored.
        metadata = BaseMetadata.getMetadata("key", metadataClass.constructor);
        expect(metadata).toBe("value");

        // It's weird that we have to do this kind of thing (sometimes putting `.prototype`). However, that's why we
        // have the MethodMetadata and PropertyMetadata.
        metadata = BaseMetadata.getMetadata("key_title", MetadataClass.prototype, "title");
        expect(metadata).toBe("value_title")

        metadata = BaseMetadata.getMetadata("key_title", metadataClass, "title");
        expect(metadata).toBe("value_title")
    })

    it("should set the metadata on the class and property and retrieve it via both the class and object", () => {
        class MetadataClass {
            title: string;
        }

        BaseMetadata.defineMetadata("key", "value", MetadataClass);
        BaseMetadata.defineMetadata("key_title", "value_title", MetadataClass.prototype, "title");

        const metadataClass = new MetadataClass();

        let metadata = BaseMetadata.getMetadata("key", MetadataClass);
        expect(metadata).toBe("value");

        // We have to pass `.constructor` here since we are looking for the prototype of the class since that's where the
        // metadata is stored.
        metadata = BaseMetadata.getMetadata("key", metadataClass.constructor);
        expect(metadata).toBe("value");

        // It's weird that we have to do this kind of thing (sometimes putting `.prototype`). However, that's why we
        // have the MethodMetadata and PropertyMetadata.
        metadata = BaseMetadata.getMetadata("key_title", MetadataClass.prototype, "title");
        expect(metadata).toBe("value_title")

        metadata = BaseMetadata.getMetadata("key_title", metadataClass, "title");
        expect(metadata).toBe("value_title")
    })

    it("should append to the class and property and retrieve for both", () => {
        class MetadataClass {
            title: string;
        }

        const metadataClass = new MetadataClass();

        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass);
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass);

        let metadata = BaseMetadata.getMetadata("array", MetadataClass);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, false, "title");
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass, false, "title");

        metadata = BaseMetadata.getMetadata("array", MetadataClass, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")
    })

    it("should append to the class and property but skip elements that are duplicate and retrieve for both", () => {
        class MetadataClass {
            title: string;
        }

        const metadataClass = new MetadataClass();

        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true);
        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true);
        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true);
        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true);
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass, true);
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass, true);

        let metadata = BaseMetadata.getMetadata("array", MetadataClass);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true, "title");
        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true, "title");
        BaseMetadata.setToMetadata("array", -1, "element1", MetadataClass, true, "title");
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass, true, "title");
        BaseMetadata.setToMetadata("array", -1, "element2", MetadataClass, true, "title");

        metadata = BaseMetadata.getMetadata("array", MetadataClass, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(2);
        expect(metadata[0]).toBe("element1")
        expect(metadata[1]).toBe("element2")
    })

    it("should set to a specific index to the class and property and retrieve for both", () => {
        class MetadataClass {
            title: string;
        }

        const metadataClass = new MetadataClass();

        BaseMetadata.setToMetadata("array", 3, "element1", MetadataClass);
        BaseMetadata.setToMetadata("array", 4, "element2", MetadataClass);

        let metadata = BaseMetadata.getMetadata("array", MetadataClass);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(5);
        expect(metadata[3]).toBe("element1")
        expect(metadata[4]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor);
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(5);
        expect(metadata[3]).toBe("element1")
        expect(metadata[4]).toBe("element2")

        BaseMetadata.setToMetadata("array", 8, "element1", MetadataClass, false, "title");
        BaseMetadata.setToMetadata("array", 2, "element2", MetadataClass, false, "title");

        metadata = BaseMetadata.getMetadata("array", MetadataClass, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(9);
        expect(metadata[8]).toBe("element1")
        expect(metadata[2]).toBe("element2")

        metadata = BaseMetadata.getMetadata("array", metadataClass.constructor, "title");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(9);
        expect(metadata[8]).toBe("element1")
        expect(metadata[2]).toBe("element2")
    })

    it("should set to a string key to the class and property and retrieve for both", () => {
        class MetadataClass {
            title: string;
        }

        const metadataClass = new MetadataClass();

        BaseMetadata.setToMetadata("object", "a", "elementa", MetadataClass);
        BaseMetadata.setToMetadata("object", "b", "elementb", MetadataClass);

        let metadata = BaseMetadata.getMetadata("object", MetadataClass);
        expect(metadata["a"]).toBe("elementa")
        expect(metadata["b"]).toBe("elementb")

        metadata = BaseMetadata.getMetadata("object", metadataClass.constructor);
        expect(metadata["a"]).toBe("elementa")
        expect(metadata["b"]).toBe("elementb")

        BaseMetadata.setToMetadata("object", "a", "elementa", MetadataClass, false, "title");
        BaseMetadata.setToMetadata("object", "b", "elementb", MetadataClass, false, "title");

        metadata = BaseMetadata.getMetadata("object", MetadataClass, "title");
        expect(metadata["a"]).toBe("elementa")
        expect(metadata["b"]).toBe("elementb")

        metadata = BaseMetadata.getMetadata("object", metadataClass.constructor, "title");
        expect(metadata["a"]).toBe("elementa")
        expect(metadata["b"]).toBe("elementb")
    })

    it("should clone the metadata from one object to the other", () => {
        @Reflect.metadata("key", "value")
        class MetadataClass {
            @Reflect.metadata("key_title", "value_title")
            title: string;
        }

        const destination = Object.create({});

        expect(BaseMetadata.hasMetadata("key", destination.constructor.prototype)).toBeFalsy()
        BaseMetadata.cloneMetadata(MetadataClass, destination.constructor.prototype);
        expect(BaseMetadata.hasMetadata("key", destination.constructor.prototype)).toBeTruthy()
    })

    it("should ignore the metadata keys that are passed when cloning", () => {
        expect(false).toBeTruthy()
    })
})