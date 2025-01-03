import "reflect-metadata";
import {ClassInformationInterface} from "../interfaces/class-information.interface";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {BaseMetadata} from "./base.metadata";

export class ClassMetadata {
    /**
     * This method structures and return all the metadata information that we have on this target and property.
     * @param target
     */
    static getInformation(target: any): ClassInformationInterface {

        let classInformation: ClassInformationInterface = {
            //name: target.,
            metadata: {},
            properties: [],
            methods: [],
        };

        // Retrieve all the keys from the metadata
        const keys = ClassMetadata.getMetadataKeys(target);

        for (const key of keys) {
            const classMetadata = ClassMetadata.getMetadata(target, key);

            if(classMetadata === undefined) {
                continue;
            }

            switch (key) {
                case ClassInformationEnum.Properties:
                    classInformation.properties = classMetadata;
                    break;
                case ClassInformationEnum.Methods:
                    classInformation.methods = classMetadata;
                    break;
                default:
                    (classInformation.metadata as any)[key] = classMetadata;
                    break;
            }
        }

        return classInformation;
    }

    /**
     * This method clones the metadata from a `sourceTarget`  and moves it to `destinationTarget`.
     *
     * @param sourceTarget
     * @param destinationTarget
     * @param metadataKeysToIgnore
     */
    static cloneMetadata(sourceTarget: any, destinationTarget: any, metadataKeysToIgnore: string[] = [] ) {
        BaseMetadata.cloneMetadata(sourceTarget, destinationTarget, undefined, undefined, metadataKeysToIgnore);
    }

    /**
     * This method simply retrieves the metadata associated to a class.
     * @param target
     * @param metadataKeyname
     */
    static getMetadata(target: any, metadataKeyname: string): any {
        return BaseMetadata.getMetadata(metadataKeyname, target);
    }

    /**
     * This method returns whether there's a metadata or not for this key.
     * @param metadataKeyname
     * @param target
     */
    static hasMetadata(target: any, metadataKeyname: string): any {
        return BaseMetadata.hasMetadata(metadataKeyname, target);
    }

    /**
     * This method returns all the metadata keys.
     * @param target
     */
    static getMetadataKeys(target: any): any {
        return BaseMetadata.getMetadataKeys(target);
    }

    /**
     * This method wraps the `defineMetadata` method of the "reflect-metadata" library. It also keeps track of the
     * property seen and adds them to the target.
     *
     * @param target
     * @param metadataKeyname
     * @param element
     */
    static defineMetadata(target: any, metadataKeyname: string, element: any) {
        // Define the element to the metadata using the "reflect-library".
        BaseMetadata.defineMetadata(metadataKeyname, element, target);
    }

    /**
     * This method assumes that the object at `metadataKeyname` will either be an array of an object. It will be assumed
     * to be an array if the type of index is a number. It will be assumed to be an object if the type is a string.
     *
     * If you pass -1, the element will simply be appended at the end of the array.
     *
     * @param target
     *
     * @param metadataKeyname
     * @param element
     * @param index
     */
    static setToMetadata(target: any, metadataKeyname: string, index: number | string, element: any, skipIfDuplicate: boolean = true) {
        BaseMetadata.setToMetadata(metadataKeyname, index, element, target, skipIfDuplicate)
    }

    /**
     * This method assumes that the `metadataKeyname` references metadata that is an array. It will append the element
     * at the end of the array.
     * @param target
     * @param metadataKeyname
     * @param element
     */
    static appendToMetadata(target: any, metadataKeyname: string, element: any, skipIfDuplicate: boolean = true) {
        ClassMetadata.setToMetadata(target, metadataKeyname, -1, element, skipIfDuplicate);
    }
}