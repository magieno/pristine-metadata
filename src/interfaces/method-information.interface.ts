import {TypeEnum} from "../enums/type.enum";

/**
 * This interface represents the information that we have for a specific method.
 */
export interface MethodInformationInterface {
    /**
     * The name of the method
     */
    name: string | symbol;

    /**
     * The type of the accessor when it's identified as a method (since an accessor can be identified as a property or a method).
     */
    type?: string;

    /**
     * The object representing the type.
     */
    typeObject?: any;

    /**
     * The object representing the type.
     */
    typeEnum?: TypeEnum;

    /**
     * The return type of the method.
     */
    returnType?: string;

    /**
     * The return type of the method.
     */
    returnTypeEnum?: TypeEnum;

    /**
     * The type object representing the return type of the method.
     */
    returnTypeObject?: any;

    /**
     * The list of parameter types for this method (in order).
     */
    parameterTypes: string[];

    /**
     * The list of parameter types for this method (in order).
     */
    parameterTypeEnums: TypeEnum[];

    /**
     * The list of parameter names for this method (in order).
     */
    parameterNames: string[];

    /**
     * The list of parameter type objects for this method (in order).
     */
    parameterTypeObjects: any[];

    decorators?: string[];

    /**
     * This represents all the metadata associated to this method.
     */
    metadata?: {[id in string]: any};
}