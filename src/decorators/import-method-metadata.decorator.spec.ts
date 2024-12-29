import {MethodMetadata} from "../metadata/method.metadata";
import {importMethodMetadata} from "./import-method-metadata.decorator";

const methodDecoratorTest = () => {
    return (target: any, propertyKey: string | symbol) => {
        MethodMetadata.defineMetadata(target, propertyKey, "keyname", "value");
    }
}
const methodDecoratorTest2 = () => {
    return (target: any, propertyKey: string | symbol) => {
        MethodMetadata.appendToMetadata(target, propertyKey, "array", "value");
        MethodMetadata.appendToMetadata(target, propertyKey, "array", "value2");
    }
}


describe('Import Method Metadata', () => {
    it("should import metadata for a method", () => {
        class ClassWithDecorators {
            @methodDecoratorTest()
            @methodDecoratorTest2()
            getTitle(): string {
                return "title";
            }
        }

        class ClassThatImportsDecrators {
            @importMethodMetadata<ClassWithDecorators>(ClassWithDecorators, "getTitle")
            getDescription(): string {
                return "description";
            }
        }

        const classThatImportsDecorators = new ClassThatImportsDecrators();

        expect(MethodMetadata.getMetadata(classThatImportsDecorators, "getDescription", "keyname")).toBe("value")
        let array = MethodMetadata.getMetadata(classThatImportsDecorators, "getDescription", "array");
        expect(Array.isArray(array)).toBeTruthy()
        expect(array.length).toBe(2)
        expect(array[0]).toBe("value")
        expect(array[1]).toBe("value2")
    })
})