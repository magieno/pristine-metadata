import {PropertyMetadata} from "./property.metadata";

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


describe("Property Metadata", () => {
    it("should define the metadata coming from a decorator", () => {
        class ClassWithDecorators {
            @propertyDecoratorTest()
            @propertyDecoratorTest2()
            title: string;
        }

        const classWithDecorators = new ClassWithDecorators();

        expect(PropertyMetadata.getMetadata(classWithDecorators, "title", "keyname")).toBe("value")
        let array = PropertyMetadata.getMetadata(classWithDecorators, "title", "array");
        expect(Array.isArray(array)).toBeTruthy()
        expect(array.length).toBe(2)
        expect(array[0]).toBe("value")
        expect(array[1]).toBe("value2")

        expect(PropertyMetadata.getMetadata(ClassWithDecorators.prototype, "title", "keyname")).toBe("value")
        array = PropertyMetadata.getMetadata(ClassWithDecorators.prototype, "title", "array");
        expect(Array.isArray(array)).toBeTruthy()
        expect(array.length).toBe(2)
        expect(array[0]).toBe("value")
        expect(array[1]).toBe("value2")
    })
})