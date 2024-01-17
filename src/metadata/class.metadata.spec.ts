import {ClassMetadata} from "./class.metadata";
import {MethodMetadata} from "./method.metadata";



describe("Class Metadata", () => {
    it("should define the metadata on the class and retrieve it", () => {
        class ClassWithMetadata {}

        ClassMetadata.defineMetadata(ClassWithMetadata, "keyname", "value");
        expect(ClassMetadata.getMetadata(ClassWithMetadata, "keyname")).toBe("value");

        const classWithMetadata = new ClassWithMetadata();
        expect(ClassMetadata.getMetadata(classWithMetadata.constructor, "keyname")).toBe("value")
    })

    it("should set and get the metadata from the constructor saved in an array.", () => {
        const registry: any[] = [];
        const classDecorator = () => {
            return (
                /**
                 * The constructor of the class
                 */
                constructor: Function
            ) => {
                registry.push(constructor);

                ClassMetadata.defineMetadata(constructor, "keyname", "value");
            }
        }

        const methodDecorator = () => {
            return (target: any, propertyKey: string,) => {
                MethodMetadata.defineMetadata(target, propertyKey, "keyname", "value");

                ClassMetadata.appendToMetadata(target.constructor, "methods", propertyKey);
            }
        }

        @classDecorator()
        class Test {
            @methodDecorator()
            method() {}
        }

        const element = registry[0];

        let metadata = ClassMetadata.getMetadata(element, "keyname");

        expect(metadata).toBe("value");

        metadata = ClassMetadata.getMetadata(element, "methods");
        expect(Array.isArray(metadata)).toBeTruthy()
        expect(metadata.length).toBe(1)
        expect(metadata[0]).toBe("method")

        expect(MethodMetadata.hasMetadata(element.prototype, "method", "keyname")).toBeTruthy()
    })
})