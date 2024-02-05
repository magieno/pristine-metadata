import "reflect-metadata"
import {TypeUtils} from "./type.utils";
import {TypeEnum} from "../enums/type.enum";
import {classMetadata} from "../decorators/classMetadata.decorator";
import {ClassMetadata} from "../metadata/class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {property} from "../decorators/property.decorator";
import {PropertyMetadata} from "../metadata/property.metadata";
import {PropertyInformationEnum} from "../enums/property-information.enum";

describe("Type Utils", () => {
    describe("Type of Value", () => {

        it("should return the type for a string", () => {
            expect(TypeUtils.getTypeOfValue(String)).toBe(TypeEnum.String);
            expect(TypeUtils.getTypeOfValue("")).toBe(TypeEnum.String);
        })

        it("should return the type for an array", () => {
            expect(TypeUtils.getTypeOfValue([])).toBe(TypeEnum.Array);
        })

        it("should return the type for a Date", () => {
            expect(TypeUtils.getTypeOfValue(new Date())).toBe(TypeEnum.Date);
        })

        it("should return the type for an object", () => {
            class Test {}

            expect(TypeUtils.getTypeOfValue(new Test())).toBe(TypeEnum.Object);
        })
        it("should return the type for a class type", () => {
            class Test {}

            expect(TypeUtils.getTypeOfValue(Test)).toBe(TypeEnum.Object);
        })

        it("should return the type for a function", () => {
            expect(TypeUtils.getTypeOfValue(() => {})).toBe(TypeEnum.Function);
        })

        it("should return the type for a Symbol", () => {
            expect(TypeUtils.getTypeOfValue(Symbol("symbol"))).toBe(TypeEnum.Symbol);
        })

        it("should return the type for a Set", () => {
            expect(TypeUtils.getTypeOfValue(new Set())).toBe(TypeEnum.Set);
        })
    })

    // Since `getTypeOfValue()` uses `getTypeFromMetadataStringRepresentation()` we don't need to test it.
})