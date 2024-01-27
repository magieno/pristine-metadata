import {TypeEnum} from "../enums/type.enum";

export class TypeUtils {
    static getTypeFromMetadataStringRepresentation(type: string): TypeEnum{
        const lowercaseType = type.toLowerCase();
        const keys = Object.keys(TypeEnum);
        const value = keys.map( (key: string) => {
            // @ts-ignore
            const value = TypeEnum[key];
            return value;
        }).find(value => value === lowercaseType);

        // If the value is something else, we assume it's the class name, therefore we return an object.
        if(value === undefined) {
            return TypeEnum.Object;
        }

        return value;
    }

    static getTypeOfValue(value: any): TypeEnum | undefined {
        if(this.isDate(value)) {
            return TypeEnum.Date;
        }

        if(Array.isArray(value)) {
            return TypeEnum.Array;
        }

        if(value instanceof Set) {
            return TypeEnum.Set;
        }

        return this.getTypeFromMetadataStringRepresentation(typeof value);
    }

    static isDate(value: any): boolean {
        return value && Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value);
    }
}