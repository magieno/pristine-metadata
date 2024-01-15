import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {MethodInformationInterface} from "../interfaces/method-information.interface";
import {MethodInformationEnum} from "../enums/method-information.enum";

export class MethodMetadata {
    /**
     * This method structures and return all the metadata information that we have on this target and property.
     * @param target
     * @param propertyKey
     */
    static getInformation(target: any, propertyKey: string | symbol): MethodInformationInterface {

        let methodInformation: MethodInformationInterface = {
            name: propertyKey,
            metadata: {},
        };

        // Retrieve all the keys from the metadata
        const keys = Reflect.getMetadataKeys(target.prototype, propertyKey);

        for (const key of keys) {
            const methodMetadata = MethodMetadata.getMetadata(target, propertyKey, key);

            if(methodMetadata === undefined) {
                continue;
            }

            switch (key) {
                case MethodInformationEnum.ReturnType:
                    methodInformation.returnTypeObject = methodMetadata;
                    methodInformation.returnType = methodMetadata.name;
                    break;
                case MethodInformationEnum.Decorators:
                    methodInformation.decorators = methodMetadata;
                    break;
                case MethodInformationEnum.ParameterTypes:
                    methodInformation.parameterTypes = methodMetadata.map((element: any) => element.name);
                    methodInformation.parameterTypeObjects = methodMetadata;
                    break;
                case MethodInformationEnum.Type:
                    methodInformation.typeObject = methodMetadata;
                    methodInformation.type = methodMetadata.name;
                    break;
                default:
                    (methodInformation.metadata as any)[key] = methodMetadata;
                    break;
            }
        }

        return methodInformation;
    }

    static methodSeen(target: any, propertyKey: string | symbol) {
        // Here we explicitly don't pass target.prototype because we expect that ClassMetadata will do it for us.
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Methods, propertyKey)
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
        MethodMetadata.methodSeen(target.prototype, propertyKey);

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
        let metadata = MethodMetadata.getMetadata(target.prototype, propertyKey, metadataKeyname);

        if(typeof index === "number") {
            if(metadata === undefined) {
                metadata = [];
            }

            if(index < -1) {
                console.error(`The index '${index}' passed to 'MethodMetadata.setToMetadata()' cannot be less than '-1'.`);
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

        MethodMetadata.defineMetadata(target.prototype, propertyKey, metadataKeyname, metadata);
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
        MethodMetadata.setToMetadata(target.prototype, propertyKey, metadataKeyname, -1, element);
    }
}