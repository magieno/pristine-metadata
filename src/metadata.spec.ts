import "reflect-metadata";

const classDecorator = () => (target: any) => {}
const test = () => (target: any,
              propertyKey: string | symbol,
              descriptor: PropertyDescriptor) => {}

describe("Metadata", () =>{
    it("should have the type of each property", () => {
        @classDecorator()
        class ClassWithProperties {
            title: string;

            value: number;

            @test()
            methodWithParameters(firstParam: string, secondParam: number) {}
        }

        const a = Reflect.getMetadataKeys(ClassWithProperties);

        const b = 0;
    })
})