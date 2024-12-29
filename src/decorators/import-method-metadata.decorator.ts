import {PropertyMetadata} from "../metadata/property.metadata";
import {MethodMetadata} from "../metadata/method.metadata";

export const importMethodMetadata = <T>(importTarget: any, importPropertyKey: keyof T, metadataKeysToIgnore: string[] = [] ) => {
    return (target: any, propertyKey: string | symbol) => {
        MethodMetadata.methodSeen(target.constructor, propertyKey);

        // Here we force cast because importPropertyKey will always be a string or symbol. If it's a number, it should go through since JS will probably convert it.
        MethodMetadata.cloneMetadata(importTarget.prototype, target, importPropertyKey as (string | symbol), propertyKey, metadataKeysToIgnore);
    };
}