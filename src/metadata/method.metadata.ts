import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {MethodInformationInterface} from "../interfaces/method-information.interface";
import {MethodInformationEnum} from "../enums/method-information.enum";
import {BaseMetadata} from "./base.metadata";

export class MethodMetadata {
    /**
     * This method structures and return all the metadata information that we have on this target and method.
     * @param target
     * @param methodName
     */
    static getInformation(target: any, methodName: string | symbol): MethodInformationInterface {

        let methodInformation: MethodInformationInterface = {
            name: methodName,
            metadata: {},
            parameterTypes: [],
            parameterTypeObjects:[],
        };

        // Retrieve all the keys from the metadata
        const keys = Reflect.getMetadataKeys(target.prototype, methodName);

        for (const key of keys) {
            const methodMetadata = MethodMetadata.getMetadata(target, methodName, key);

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

    /**
     * This method is used to add to the target's metadata that a method has been discovered in a
     * decorator. Methods are not "saved" in the metadata and this library does it.
     * @param target
     * @param methodName
     */
    static methodSeen(target: any, methodName: string | symbol) {
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Methods, methodName, true)
    }

    /**
     * This method simply retrieves the metadata associated to a method.
     * @param target
     * @param methodName
     * @param metadataKeyname
     */
    static getMetadata(target: any, methodName: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.getMetadata(metadataKeyname, target.prototype, methodName);
    }

    /**
     * This method wraps the `defineMetadata` method of the "reflect-metadata" library. It also keeps track of the
     * method seen and adds them to the target.
     *
     * @param target
     * @param methodName
     * @param metadataKeyname
     * @param element
     */
    static defineMetadata(target: any, methodName: string | symbol, metadataKeyname: string, element: any) {
        // Save to the target that we have seen this method.
        MethodMetadata.methodSeen(target, methodName);

        // Define the element to the metadata using the "reflect-library".
        BaseMetadata.defineMetadata(metadataKeyname, element, target, methodName);
    }

    /**
     * This method assumes that the object at `metadataKeyname` will either be an array of an object. It will be assumed
     * to be an array if the type of index is a number. It will be assumed to be an object if the type is a string.
     *
     * If you pass -1, the element will simply be appended at the end of the array.
     *
     * @param target
     * @param methodName
     * @param metadataKeyname
     * @param element
     * @param index
     */
    static setToMetadata(target: any, methodName: string | symbol, metadataKeyname: string, index: number | string, element: any, skipIfDuplicate: boolean = true) {
        BaseMetadata.setToMetadata(metadataKeyname, index, element, target, skipIfDuplicate, methodName)

        // Save to the target that we have seen this method.
        MethodMetadata.methodSeen(target, methodName);
    }

    /**
     * This method assumes that the `metadataKeyname` references metadata that is an array. It will append the element
     * at the end of the array.
     * @param target
     * @param methodName
     * @param metadataKeyname
     * @param element
     */
    static appendToMetadata(target: any, methodName: string | symbol, metadataKeyname: string, element: any, skipIfDuplicate: boolean = true) {
        MethodMetadata.setToMetadata(target, methodName, metadataKeyname, -1, element, skipIfDuplicate);
    }
}