export interface PropertyInformationInterface {
    name: string | symbol;

    type?: string;

    typeObject?: any;

    decorators?: string[];

    metadata?: {[id in string]: any};
}