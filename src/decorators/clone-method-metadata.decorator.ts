import {PropertyMetadata} from "../metadata/property.metadata";
import {MethodMetadata} from "../metadata/method.metadata";

export const cloneMethodMetadata = <T>(cloneTarget: any, cloneMethodKey: keyof T, metadataKeysToIgnore: string[] = [] ) => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        MethodMetadata.methodSeen(target.constructor, propertyKey, descriptor);

        // Here we force cast because cloneMethodKey will always be a string or symbol. If it's a number, it should go through since JS will probably convert it.
        MethodMetadata.cloneMetadata(cloneTarget.prototype, target, cloneMethodKey as (string | symbol), propertyKey, metadataKeysToIgnore);
    };
}