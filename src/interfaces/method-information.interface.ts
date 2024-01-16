export interface MethodInformationInterface {
    name: string | symbol;

    type?: string;

    typeObject?: any;

    returnType?: string;

    returnTypeObject?: any;

    parameterTypes?: string[];

    parameterTypeObjects?: any[];

    //decorators?: string[]; // todo: find a way to support that.

    metadata?: {[id in string]: any};
}