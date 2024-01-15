import "reflect-metadata";

export class Metadata {
    static getDecorators(target: any, propertyKey?: string | symbol): string[] {

    }

    static getProperties(target: any): string[] {

    }

    static getPropertyTypes(target: any): string[] {}

    static getParameterTypes(target: any, propertyKey: string | symbol): string[] {

    }

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