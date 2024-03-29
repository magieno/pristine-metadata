import {PropertyMetadata} from "../metadata/property.metadata";
import {PropertyInformationEnum} from "../enums/property-information.enum";

/**
 * This decorator does absolutely nothing, except making sure that the types will be properly defined. If you have
 * decorators already on a property or class and they are using this library, then you can remove this.
 *
 * It's used to track for example all the properties and methods on an object so they can be retrieved even if the
 * object is empty.
 */
export const property = (options?:{nullable: boolean}) => {
    return (target: any, propertyKey: string | symbol) => {
        if(options) {
            PropertyMetadata.defineMetadata(target, propertyKey, PropertyInformationEnum.Nullable, options.nullable)
        }

        PropertyMetadata.propertySeen(target.constructor, propertyKey);
    };
}