import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {MethodInformationInterface} from "../interfaces/method-information.interface";
import {MethodInformationEnum} from "../enums/method-information.enum";
import {BaseMetadata} from "./base.metadata";

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
            parameterTypes: [],
            parameterTypeObjects:[],
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
        // We don't pass target.prototype here since when we set metadata on the class, we want to set it on the target
        // Therefore, ClassMetadata expects the target and not the prototype.
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Methods, propertyKey, true)
    }

    static getMetadata(target: any, propertyKey: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.getMetadata(metadataKeyname, target.prototype, propertyKey);
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
        MethodMetadata.methodSeen(target, propertyKey);

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

        // Save to the target that we have seen this property.
        MethodMetadata.methodSeen(target, propertyKey);
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
        MethodMetadata.setToMetadata(target, propertyKey, metadataKeyname, -1, element, skipIfDuplicate);
    }
}