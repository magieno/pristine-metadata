/**
 * This interface represents the information that we have for a specific class.
 */
export interface ClassInformationInterface {
    /**
     * This represents the list of properties that are to be found in this class. To be found, there must be a decorator
     * on the property and it must call `PropertyMetadata.propertySeen(...)`. Use the included decorators for that out-of-the-box.
     */
    properties: string[];

    /**
     * This represents the list of methods that are to be found in this class. To be found, there must be a decorator
     * on the method and it must call `MethodMetadata.methodSeen(...)`. Use the included decorators for that out-of-the-box.
     */
    methods: string[];

    /**
     * This represents all the metadata (except the metadata for the properties and method) associated to this class.
     */
    metadata: {[id in string]: any};
}