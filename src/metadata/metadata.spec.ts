import {PropertyMetadata} from "./property.metadata";
import {property} from "../decorators/property.decorator";
import {classMetadata} from "../decorators/classMetadata.decorator";
import {method} from "../decorators/method.decorator";
import {ClassMetadata} from "./class.metadata";
import {MethodMetadata} from "./method.metadata";
import {array} from "../decorators/array.decorator";

@classMetadata()
class Child {
    name: string;
}

@classMetadata()
class ClassForTestingPurposes {
    @property()
    title: string;

    @property()
    createdAt: Date;

    @property()
    rank: number;

    @property({nullable: true})
    nullableField?: string;

    @array(String)
    array: string[];

    @property()
    child: Child;

    @array(Child)
    children: Child[];

    @method()
    getTitle(capitalize: boolean): string {
        return this.title;
    }

    @method()
    get childAccessor(): Child {
        return this.child;
    }

    @method()
    set rankAccessor(rank: number) {
        this.rank = rank;
    }
}

describe("Metadata", () =>{
    it("should return the Information fully filled for each property.", () => {
        let propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "title");
        expect(propertyInformation.type).toBe("String");
        expect(propertyInformation.name).toBe("title");

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "createdAt");
        expect(propertyInformation.type).toBe("Date");
        expect(propertyInformation.name).toBe("createdAt");

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "child");
        expect(propertyInformation.type).toBe("Child");
        expect(propertyInformation.name).toBe("child");

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "rank");
        expect(propertyInformation.type).toBe("Number");
        expect(propertyInformation.name).toBe("rank");

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "array");
        expect(propertyInformation.type).toBe("Array");
        expect(propertyInformation.name).toBe("array");
        expect(propertyInformation.arrayMemberType).toBe("String");

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "nullableField");
        expect(propertyInformation.type).toBe("String");
        expect(propertyInformation.name).toBe("nullableField");
        expect(propertyInformation.isNullable).toBeTruthy();

        propertyInformation = PropertyMetadata.getInformation(ClassForTestingPurposes.prototype, "children");
        expect(propertyInformation.type).toBe("Array");
        expect(propertyInformation.name).toBe("children");
        expect(propertyInformation.arrayMemberType).toBe("Child");

        let methodInformation = MethodMetadata.getInformation(ClassForTestingPurposes.prototype, "getTitle");
        expect(methodInformation.returnType).toBe("String")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(1)
        expect(methodInformation.parameterTypes![0]).toBe("Boolean")

        methodInformation = MethodMetadata.getInformation(ClassForTestingPurposes.prototype, "childAccessor");
        // Since this is a getter, there is no return type but only the type of the "property" since it should technically be treated as one
        expect(methodInformation.type).toBe("Child")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(0)

        methodInformation = MethodMetadata.getInformation(ClassForTestingPurposes.prototype, "rankAccessor");
        // Since this is a getter, there is no return type but only the type of the "property" since it should technically be treated as one
        expect(methodInformation.type).toBe("Number")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(1)

        const classInformation = ClassMetadata.getInformation(ClassForTestingPurposes);
        expect(classInformation.properties.length).toBe(7);
        expect(classInformation.methods.length).toBe(3)
    })

    it("should return the Information fully filled for each property.", () => {
        const classForTestingPurposes = new ClassForTestingPurposes();

        let propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "title");
        expect(propertyInformation.type).toBe("String");
        expect(propertyInformation.name).toBe("title");

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "createdAt");
        expect(propertyInformation.type).toBe("Date");
        expect(propertyInformation.name).toBe("createdAt");

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "child");
        expect(propertyInformation.type).toBe("Child");
        expect(propertyInformation.name).toBe("child");

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "rank");
        expect(propertyInformation.type).toBe("Number");
        expect(propertyInformation.name).toBe("rank");

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "array");
        expect(propertyInformation.type).toBe("Array");
        expect(propertyInformation.name).toBe("array");
        expect(propertyInformation.arrayMemberType).toBe("String");

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "nullableField");
        expect(propertyInformation.type).toBe("String");
        expect(propertyInformation.name).toBe("nullableField");
        expect(propertyInformation.isNullable).toBeTruthy();

        propertyInformation = PropertyMetadata.getInformation(classForTestingPurposes, "children");
        expect(propertyInformation.type).toBe("Array");
        expect(propertyInformation.name).toBe("children");
        expect(propertyInformation.arrayMemberType).toBe("Child");

        let methodInformation = MethodMetadata.getInformation(classForTestingPurposes, "getTitle");
        expect(methodInformation.returnType).toBe("String")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(1)
        expect(methodInformation.parameterTypes![0]).toBe("Boolean")

        methodInformation = MethodMetadata.getInformation(classForTestingPurposes, "childAccessor");
        // Since this is a getter, there is no return type but only the type of the "property" since it should technically be treated as one
        expect(methodInformation.type).toBe("Child")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(0)

        methodInformation = MethodMetadata.getInformation(classForTestingPurposes, "rankAccessor");
        // Since this is a getter, there is no return type but only the type of the "property" since it should technically be treated as one
        expect(methodInformation.type).toBe("Number")
        expect(methodInformation.parameterTypes).toBeDefined()
        expect(methodInformation.parameterTypes!.length).toBe(1)

        const classInformation = ClassMetadata.getInformation(classForTestingPurposes.constructor);
        expect(classInformation.properties.length).toBe(7);
        expect(classInformation.methods.length).toBe(3)
    })
})