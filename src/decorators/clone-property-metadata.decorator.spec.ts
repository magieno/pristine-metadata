import {PropertyMetadata} from "../metadata/property.metadata";
import {clonePropertyMetadata} from "./clone-property-metadata.decorator";

const propertyDecoratorTest = () => {
    return (target: any, propertyKey: string | symbol) => {
        PropertyMetadata.defineMetadata(target, propertyKey, "keyname", "value");
    }
}
const propertyDecoratorTest2 = () => {
    return (target: any, propertyKey: string | symbol) => {
        PropertyMetadata.appendToMetadata(target, propertyKey, "array", "value");
        PropertyMetadata.appendToMetadata(target, propertyKey, "array", "value2");
    }
}


describe('CloneProperty Metadata', () => {
    it("should clone metadata for a property", () => {
        class ClassWithDecorators {
            @propertyDecoratorTest()
            @propertyDecoratorTest2()
            title?: string;
        }

        class ClassThatImportsDecrators {
            @clonePropertyMetadata<ClassWithDecorators>(ClassWithDecorators, "title")
            description?: string;
        }

        const classThatImportsDecorators = new ClassThatImportsDecrators();

        expect(PropertyMetadata.getMetadata(classThatImportsDecorators, "description", "keyname")).toBe("value")
        let array = PropertyMetadata.getMetadata(classThatImportsDecorators, "description", "array");
        expect(Array.isArray(array)).toBeTruthy()
        expect(array.length).toBe(2)
        expect(array[0]).toBe("value")
        expect(array[1]).toBe("value2")
    })
})