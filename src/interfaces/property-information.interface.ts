export interface PropertyInformationInterface {
    /**
     * The name of the property
     */
    name: string | symbol;

    /**
     * The type of the property.
     */
    type?: string;

    /**
     * The object representing the type of the property.
     */
    typeObject?: any;

    decorators?: string[];

    /**
     * Specifies if the property is nullable or not.
     * Note: `undefined` means we have no visibility into it, not that it isn't.
     */
    isNullable?:boolean;

    /**
     * The type of the element in the array.
     */
    arrayMemberType?: string;

    /**
     * The object representing the type of the element in the array.
     */
    arrayMemberObject?: any;


    metadata?: {[id in string]: any};
}