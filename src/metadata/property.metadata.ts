import "reflect-metadata"
import {PropertyInformationInterface} from "../interfaces/property-information.interface";
import {PropertyInformationEnum} from "../enums/property-information.enum";
import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";

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
        const keys = Reflect.getMetadataKeys(target.prototype, propertyKey);

        for (const key of keys) {
            const propertyMetadata = PropertyMetadata.getMetadata(target, propertyKey, key);

            if(propertyMetadata === undefined) {
                continue;
            }

            switch (key) {
                case PropertyInformationEnum.Type:
                    propertyInformation.typeObject = propertyMetadata;
                    propertyInformation.type = propertyMetadata.name;
                    break;
                case PropertyInformationEnum.Decorators:
                    propertyInformation.decorators = propertyMetadata;
                    break;
                default:
                    (propertyInformation.metadata as any)[key] = propertyMetadata;
                    break;
            }
        }

        return propertyInformation;
    }

    static propertySeen(target: any, propertyKey: string | symbol) {
        // Here we explicitly don't pass target.prototype because we expect that ClassMetadata will do it for us.
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Properties, propertyKey)
    }

    static getMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string): any {
        return Reflect.getMetadata(metadataKeyname, target.prototype, propertyKey);
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
        PropertyMetadata.propertySeen(target.prototype, propertyKey);

        // Define the element to the metadata using the "reflect-library".
        Reflect.defineMetadata(metadataKeyname, element, target.prototype, propertyKey);
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
    static setToMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string, index: number | string, element: any) {
        let metadata = PropertyMetadata.getMetadata(target.prototype, propertyKey, metadataKeyname);

        if(typeof index === "number") {
            if(metadata === undefined) {
                metadata = [];
            }

            if(index < -1) {
                console.error(`The index '${index}' passed to 'PropertyMetadata.setToMetadata()' cannot be less than '-1'.`);
                return;
            } else if(index === -1) {
                metadata.push(element);
            } else {
                metadata[index] = element;
            }
        } else if(typeof index === "string") {
            if(metadata === undefined) {
                metadata = {};
            }

            metadata[index] = element;
        }
        else {
            console.error(`The type '${typeof index}' for index '${index}' must be either a 'string' or 'number'.`);
            return;
        }

        PropertyMetadata.defineMetadata(target.prototype, propertyKey, metadataKeyname, metadata);
    }

    /**
     * This method assumes that the `metadataKeyname` references metadata that is an array. It will append the element
     * at the end of the array.
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     */
    static appendToMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string, element: any) {
        PropertyMetadata.setToMetadata(target.prototype, propertyKey, metadataKeyname, -1, element);
    }
}