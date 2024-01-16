export interface PropertyInformationInterface {
    name: string | symbol;

    type?: string;

    typeObject?: any;

    decorators?: string[];

    isNullable?:boolean;

    arrayMemberType?: string;

    arrayMemberObject?: any;

    metadata?: {[id in string]: any};
}