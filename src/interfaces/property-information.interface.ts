export interface PropertyInformationInterface {
    name: string | symbol;

    type?: string;

    typeObject?: any;

    //decorators?: string[]; // todo: find a way to support that.

    isNullable?:boolean;

    arrayMemberType?: string;

    arrayMemberObject?: any;

    metadata?: {[id in string]: any};
}