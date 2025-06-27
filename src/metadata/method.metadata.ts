import {ClassMetadata} from "./class.metadata";
import {ClassInformationEnum} from "../enums/class-information.enum";
import {MethodInformationInterface} from "../interfaces/method-information.interface";
import {MethodInformationEnum} from "../enums/method-information.enum";
import {BaseMetadata} from "./base.metadata";
import {TypeUtils} from "../utils/type.utils";

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES_REGEX = /([^\s,]+)/g;

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
            parameterTypeObjects: [],
            parameterTypeEnums: [],
            parameterNames: [],
        };

        // Retrieve all the keys from the metadata
        const keys = MethodMetadata.getMetadataKeys(target, methodName);

        for (const key of keys) {
            const methodMetadata = MethodMetadata.getMetadata(target, methodName, key);

            if (methodMetadata === undefined) {
                continue;
            }

            switch (key) {
                case MethodInformationEnum.ReturnType:
                    methodInformation.returnTypeObject = methodMetadata;
                    methodInformation.returnType = methodMetadata.name;
                    methodInformation.returnTypeEnum = TypeUtils.getTypeFromMetadataStringRepresentation(methodMetadata.name);
                    break;
                case MethodInformationEnum.Decorators:
                    methodInformation.decorators = methodMetadata;
                    break;
                case MethodInformationEnum.ParameterTypes:
                    methodInformation.parameterTypes = methodMetadata.map((element: any) => element.name);
                    methodInformation.parameterTypeEnums = methodMetadata.map((element: any) => TypeUtils.getTypeFromMetadataStringRepresentation(element.name));
                    methodInformation.parameterTypeObjects = methodMetadata;
                    break;
                case MethodInformationEnum.ParameterNames:
                    methodInformation.parameterNames = methodMetadata
                    break;
                case MethodInformationEnum.Type:
                    methodInformation.typeObject = methodMetadata;
                    methodInformation.type = methodMetadata.name;
                    methodInformation.typeEnum = TypeUtils.getTypeFromMetadataStringRepresentation(methodMetadata.name);
                    break;
                default:
                    (methodInformation.metadata as any)[key] = methodMetadata;
                    break;
            }
        }

        return methodInformation;
    }

    /**
     * This method clones the metadata from a `sourceTarget` and `sourceMethodKey (optional)` and moves it to
     * `destinationTarget` and `destinationMethodKey`.
     *
     * If you pass the `sourceMethodKey` but not the `destinationMethodKey`, the `sourceMethodKey` will be used
     * instead.
     *
     * @param sourceTarget
     * @param destinationTarget
     * @param sourceMethodKey
     * @param destinationMethodKey
     * @param metadataKeysToIgnore
     */
    static cloneMetadata(sourceTarget: any, destinationTarget: any, sourceMethodKey: string | symbol, destinationMethodKey?: string | symbol, metadataKeysToIgnore: string[] = []) {
        BaseMetadata.cloneMetadata(sourceTarget, destinationTarget, sourceMethodKey, destinationMethodKey, metadataKeysToIgnore)
    }

    /**
     * This method is used to add to the target's metadata that a method has been discovered in a
     * decorator. Methods are not "saved" in the metadata and this library does it.
     * @param target
     * @param methodName
     * @param descriptor
     */
    static methodSeen(target: any, methodName: string | symbol, descriptor?: PropertyDescriptor) {
        ClassMetadata.appendToMetadata(target, ClassInformationEnum.Methods, methodName, true)

        if (descriptor && descriptor.value) {
            const method = descriptor.value;
            // Convert the method to its string representation.
            // e.g., "function(param1, param2) { ... }"
            const functionString = method.toString();

            // Strip comments and extract the parameter names.
            const stripped = functionString.replace(STRIP_COMMENTS, '');
            const paramsMatch = stripped.slice(stripped.indexOf('(') + 1, stripped.indexOf(')'));
            const paramNames = paramsMatch.match(ARGUMENT_NAMES_REGEX) || [];

            BaseMetadata.defineMetadata(MethodInformationEnum.ParameterNames, paramNames, target.prototype, methodName);
        }

        // Add this to ensure that the method is properly registered with the class
        if (target && target.constructor) {
            // Save to the target that we have seen this property.
            ClassMetadata.appendToMetadata(target.constructor, ClassInformationEnum.Methods, methodName, true)
        }
    }

    /**
     * This method simply retrieves the metadata associated to a method.
     * @param target
     * @param methodName
     * @param metadataKeyname
     */
    static getMetadata(target: any, methodName: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.getMetadata(metadataKeyname, target, methodName);
    }

    /**
     * This method returns whether there's a metadata or not for this key.
     * @param metadataKeyname
     * @param target
     * @param methodName
     */
    static hasMetadata(target: any, methodName: string | symbol, metadataKeyname: string): any {
        return BaseMetadata.hasMetadata(metadataKeyname, target, methodName);
    }

    /**
     * This method returns all the metadata keys.
     * @param target
     * @param methodName
     */
    static getMetadataKeys(target: any, methodName: string | symbol): any {
        return BaseMetadata.getMetadataKeys(target, methodName);
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