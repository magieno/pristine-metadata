import {ClassMetadata} from "../metadata/class.metadata";
import {cloneClassMetadata} from "./clone-class-metadata.decorator";

const classDecorator = () => {
    return (
        /**
         * The constructor of the class
         */
        constructor: Function
    ) => {
        ClassMetadata.defineMetadata(constructor, "keyname", "value");
    }
}

describe('Clone Class Metadata', () => {
    it("should clone metadata for a class", () => {
        @classDecorator()
        class ClassWithDecorators {
        }

        @cloneClassMetadata(ClassWithDecorators)
        class ClassThatImportsDecrators {
        }

        const classThatImportsDecorators = new ClassThatImportsDecrators();

        expect(ClassMetadata.getMetadata(classThatImportsDecorators, "keyname")).toBe("value")
    })
})