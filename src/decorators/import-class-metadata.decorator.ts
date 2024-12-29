import {ClassMetadata} from "../metadata/class.metadata";

export const importClassMetadata = (importTarget: any, metadataKeysToIgnore: string[] = [] ) => {
    return (target: any) => {
        // Here we force cast because importPropertyKey will always be a string or symbol. If it's a number, it should go through since JS will probably convert it.
        ClassMetadata.cloneMetadata(importTarget, target.prototype, metadataKeysToIgnore);
    };
}