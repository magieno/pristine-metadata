import "reflect-metadata";
import {ClassInformationInterface} from "./interfaces/class-information.interface";

export * from "./decorators/decorators"
export * from "./enums/enums"
export * from "./interfaces/interfaces";
export * from "./metadata/metadata";

export class Metadata {
    static getDecorators(target: any, propertyKey?: string | symbol): string[] {

    }

    /*static getClassInformation(target: any): ClassInformationInterface {

    }*/

    /**
     * This method returns all the properties for the target.
     * Note: Each class property must at least be tagged with a decorator that uses this library (or have a default value).
     *
     * @param target
     */
    /*static getProperties(target: any): string[] {

    }

    static getPropertyTypes(target: any): string[] {}

    static getParameterTypes(target: any, propertyKey: string | symbol): string[] {

    }

    static propertySeen(target: any, propertyKey: string | symbol) {

    }*/

    static appendToMetadata(metadataKeyname: string, metadata: any, target: any, propertyKey?: string | symbol) {
        if(propertyKey === undefined) {
            const targetElements = Reflect.getMetadata(metadataKeyname, target) ?? [];

            targetElements.push(metadata);

            Reflect.defineMetadata(metadataKeyname, targetElements, target.prototype);
        } else {
            const targetElements = Reflect.getMetadata(metadataKeyname, target, propertyKey) ?? [];

            targetElements.push(metadata);

            Reflect.defineMetadata(metadataKeyname, targetElements, target, propertyKey);
        }
    }

    static defineMetadata(metadataKeyname: string, metadata:any, target: any, propertyKey?: string | symbol) {

    }

    static hasMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol) {

    }

    static getMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol) {

    }

    static getOwnMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol) {

    }
}