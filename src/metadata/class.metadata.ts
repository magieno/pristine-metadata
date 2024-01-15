import {ClassInformationInterface} from "../interfaces/class-information.interface";
import {ClassInformationEnum} from "../enums/class-information.enum";

export class ClassMetadata {
    /**
     * This method structures and return all the metadata information that we have on this target and property.
     * @param target
     * @param propertyKey
     */
    static getInformation(target: any): ClassInformationInterface {

        let classInformation: ClassInformationInterface = {
            //name: target.,
            metadata: {},
            properties: [],
            methods: [],
        };

        // Retrieve all the keys from the metadata
        const keys = Reflect.getMetadataKeys(target.prototype);

        for (const key of keys) {
            const classMetadata = ClassMetadata.getMetadata(target.prototype, key);

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

    static getMetadata(target: any, metadataKeyname: string): any {
        return Reflect.getMetadata(metadataKeyname, target);
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
        Reflect.defineMetadata(metadataKeyname, element, target);
    }

    /**
     * This method assumes that the object at `metadataKeyname` will either be an array of an object. It will be assumed
     * to be an array if the type of index is a number. It will be assumed to be an object if the type is a string.
     *
     * If you pass -1, the element will simply be appended at the end of the array.
     *
     * @param target
     * @param metadataKeyname
     * @param element
     * @param index
     */
    static setToMetadata(target: any, metadataKeyname: string, index: number | string, element: any) {
        let metadata = ClassMetadata.getMetadata(target, metadataKeyname);

        if(typeof index === "number") {
            if(metadata === undefined) {
                metadata = [];
            }

            if(index < -1) {
                console.error(`The index '${index}' passed to 'ClassMetadata.setToMetadata()' cannot be less than '-1'.`);
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

        ClassMetadata.defineMetadata(target, metadataKeyname, metadata);
    }

    /**
     * This method assumes that the `metadataKeyname` references metadata that is an array. It will append the element
     * at the end of the array.
     * @param target
     * @param metadataKeyname
     * @param element
     */
    static appendToMetadata(target: any, metadataKeyname: string, element: any) {
        ClassMetadata.setToMetadata(target, metadataKeyname, -1, element);
    }
}