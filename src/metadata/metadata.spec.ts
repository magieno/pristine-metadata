import {PropertyMetadata} from "./property.metadata";
import {propertyMetadata} from "../decorators/propertyMetadata.decorator";
import {classMetadata} from "../decorators/classMetadata.decorator";
import {methodMetadata} from "../decorators/methodMetadata.decorator";
import {ClassMetadata} from "./class.metadata";
import {MethodMetadata} from "./method.metadata";



@classMetadata()
class Child {
    name: string;
}

@classMetadata()
class ClassForTestingPurposes {
    @propertyMetadata()
    title: string;

    @propertyMetadata()
    createdAt: Date;

    @propertyMetadata()
    rank: number;

    @propertyMetadata()
    array: string[];

    @propertyMetadata()
    child: Child;

    @propertyMetadata()
    children: Child[];

    @methodMetadata()
    getTitle(capitalize: boolean): string {
        return this.title;
    }
    @methodMetadata()
    get titleAccessor(): string {
        return this.title;
    }
}


describe("Metadata", () =>{
    it("should return the Information fully filled for each property.", () => {
        const propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes, "title");
        const propertyInformation2 = PropertyMetadata.getInformation(ClassForTestingPurposes, "createdAt");
        const propertyInformation3 = PropertyMetadata.getInformation(ClassForTestingPurposes, "child");
        const propertyInformation4 = PropertyMetadata.getInformation(ClassForTestingPurposes, "children");
        const propertyInformation5 = PropertyMetadata.getInformation(ClassForTestingPurposes, "array");

        const classInformation = ClassMetadata.getInformation(ClassForTestingPurposes);

        const methodInformation = MethodMetadata.getInformation(ClassForTestingPurposes, "getTitle");
        const methodInformation2 = MethodMetadata.getInformation(ClassForTestingPurposes, "titleAccessor");


        const a = 0;
    })
})