import {PropertyMetadata} from "../metadata/property.metadata";

export const clonePropertyMetadata = <T>(cloneTarget: any, clonePropertyKey: keyof T, metadataKeysToIgnore: string[] = [] ) => {
    return (target: any, propertyKey: string | symbol) => {
        PropertyMetadata.propertySeen(target, propertyKey);

        // Here we force cast because clonePropertyKey will always be a string or symbol. If it's a number, it should go through since JS will probably convert it.
        PropertyMetadata.cloneMetadata(cloneTarget.prototype, target, clonePropertyKey as (string | symbol), propertyKey, metadataKeysToIgnore);
    };
}