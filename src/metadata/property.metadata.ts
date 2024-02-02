import "reflect-metadata"
import {PropertyInformationInterface} from "../interfaces/property-information.interface";
import {PropertyInformationEnum} from "../enums/property-information.enum";
import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {BaseMetadata} from "./base.metadata";
import {TypeUtils} from "../utils/type.utils";

export class PropertyMetadata {
    /**
     * This method structures and return all the metadata information that we have on this target and property.
     * @param target
     * @param propertyKey
     */
    static getInformation(target: any, propertyKey: string | symbol): PropertyInformationInterface {

        let propertyInformation: PropertyInformationInterface = {
            name: propertyKey,
            metadata: {},
        };

        // Retrieve all the keys from the metadata
        const keys = PropertyMetadata.getMetadataKeys(target, propertyKey);

        for (const key of keys) {
            const propertyMetadata = PropertyMetadata.getMetadata(target, propertyKey, key);

            if(propertyMetadata === undefined) {
                continue;
            }

            switch (key) {
                case PropertyInformationEnum.Type:
                    propertyInformation.typeObject = propertyMetadata;
                    propertyInformation.type = propertyMetadata.name;
                    propertyInformation.typeEnum = TypeUtils.getTypeFromMetadataStringRepresentation(propertyMetadata.name);
                    break;
                case PropertyInformationEnum.Decorators:
                    propertyInformation.decorators = propertyMetadata;
                    break;
                case PropertyInformationEnum.Nullable:
                    propertyInformation.isNullable = propertyMetadata;
                    break;
                case PropertyInformationEnum.ArrayMemberType:
                    propertyInformation.arrayMemberObject = propertyMetadata;
                    propertyInformation.arrayMemberType = propertyMetadata.name;
                    propertyInformation.arrayMemberTypeEnum = TypeUtils.getTypeFromMetadataStringRepresentation(propertyMetadata.name);
                    break;
                default:
                    (propertyInformation.metadata as any)[key] = propertyMetadata;
                    break;
            }
        }

        return propertyInformation;
    }

    /**
     * This method clones the metadata from a `sourceTarget` and `sourcePropertyKey (optional)` and moves it to
     * `destinationTarget` and `destinationPropertyKey`.
     *
     * If you pass the `sourcePropertyKey` but not the `destinationPropertyKey`, the `sourcePropertyKey` will be used
     * instead.
     *
     * @param sourceTarget
     * @param destinationTarget
     * @param sourcePropertyKey
     * @param destinationPropertyKey
     */
    static cloneMetadata(sourceTarget: any, destinationTarget: any, sourcePropertyKey: string | symbol, destinationPropertyKey?: string | symbol ) {
        BaseMetadata.cloneMetadata(sourceTarget, destinationTarget, sourcePropertyKey, destinationPropertyKey)
    }

    static propertySeen(target: any, propertyKey: string | symbol) {
        // We don't pass target.prototype here since when we set metadata on the class, we want to set it on the target
        // Therefore, ClassMetadata expects the target and not the prototype.
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Properties, propertyKey, true)
    }

    /**
     * This method returns whether there's a metadata or not for this key.
     * @param metadataKeyname
     * @param target
     * @param propertyKey
     */
    static hasMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.hasMetadata(metadataKeyname, target, propertyKey);
    }

    /**
     * This method returns all the metadata keys.
     * @param target
     * @param propertyKey
     */
    static getMetadataKeys(target: any, propertyKey: string | symbol): any {
        return BaseMetadata.getMetadataKeys(target, propertyKey);
    }

    /**
     * This method simply retrieves the metadata associated to a property.
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     */
    static getMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.getMetadata(metadataKeyname, target, propertyKey);
    }

    /**
     * This method wraps the `defineMetadata` method of the "reflect-metadata" library. It also keeps track of the
     * property seen and adds them to the target.
     *
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     */
    static defineMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string, element: any) {
        // Save to the target that we have seen this property.
        PropertyMetadata.propertySeen(target, propertyKey);

        // Define the element to the metadata using the "reflect-library".
        BaseMetadata.defineMetadata(metadataKeyname, element, target, propertyKey);
    }

    /**
     * This method assumes that the object at `metadataKeyname` will either be an array of an object. It will be assumed
     * to be an array if the type of index is a number. It will be assumed to be an object if the type is a string.
     *
     * If you pass -1, the element will simply be appended at the end of the array.
     *
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     * @param index
     */
    static setToMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string, index: number | string, element: any, skipIfDuplicate: boolean = true) {
        BaseMetadata.setToMetadata(metadataKeyname, index, element, target, skipIfDuplicate, propertyKey)

        // We have seen this property.
        PropertyMetadata.propertySeen(target, propertyKey);
    }

    /**
     * This method assumes that the `metadataKeyname` references metadata that is an array. It will append the element
     * at the end of the array.
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     */
    static appendToMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string, element: any, skipIfDuplicate: boolean = true) {
        PropertyMetadata.setToMetadata(target, propertyKey, metadataKeyname, -1, element, skipIfDuplicate);
    }
}