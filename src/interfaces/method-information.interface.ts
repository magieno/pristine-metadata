export interface MethodInformationInterface {
    name: string | symbol;

    type?: string;

    typeObject?: any;

    returnType?: string;

    returnTypeObject?: any;

    parameterTypes: string[];

    parameterTypeObjects: any[];

    decorators?: string[];

    metadata?: {[id in string]: any};
}