import {PropertyMetadata} from "../metadata/property.metadata";
import {PropertyInformationEnum} from "../enums/property-information.enum";

/**
 * This decorator can be used to specify that a property is nullable. This data
 * is currently not available out of the box so it needs to be manually specified.
 */
export const array = (dataType: any) => {
    return (target: any, propertyKey: string | symbol) => {
        if(dataType) {
            PropertyMetadata.defineMetadata(target, propertyKey, PropertyInformationEnum.ArrayMemberType, dataType);
        }

        PropertyMetadata.propertySeen(target, propertyKey);
    };
}