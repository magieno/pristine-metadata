import {ClassMetadata} from "../metadata/class.metadata";
import {importClassMetadata} from "./import-class-metadata.decorator";

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

describe('Import Class Metadata', () => {
    it("should import metadata for a class", () => {
        @classDecorator()
        class ClassWithDecorators {
        }

        @importClassMetadata(ClassWithDecorators)
        class ClassThatImportsDecrators {
        }

        const classThatImportsDecorators = new ClassThatImportsDecrators();

        expect(ClassMetadata.getMetadata(classThatImportsDecorators, "keyname")).toBe("value")
    })
})