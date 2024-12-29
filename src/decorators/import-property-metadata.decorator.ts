import {PropertyMetadata} from "../metadata/property.metadata";

export const importPropertyMetadata = <T>(importTarget: any, importPropertyKey: keyof T, metadataKeysToIgnore: string[] = [] ) => {
    return (target: any, propertyKey: string | symbol) => {
        PropertyMetadata.propertySeen(target, propertyKey);

        // Here we force cast because importPropertyKey will always be a string or symbol. If it's a number, it should go through since JS will probably convert it.
        PropertyMetadata.cloneMetadata(importTarget.prototype, target, importPropertyKey as (string | symbol), propertyKey, metadataKeysToIgnore);
    };
}