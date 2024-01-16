export abstract class BaseMetadata {
    static getMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol): any {
        if(propertyKey) {
            return Reflect.getMetadata(metadataKeyname, target, propertyKey);
        } else {
            return Reflect.getMetadata(metadataKeyname, target);
        }
    }

    /**
     * This method wraps the `defineMetadata` method of the "reflect-metadata" library. It also keeps track of the
     * property seen and adds them to the target.
     *
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     */
    static defineMetadata(metadataKeyname: string, element: any, target: any, propertyKey?: string | symbol) {
        if(propertyKey) {
            // Define the element to the metadata using the "reflect-library".
            Reflect.defineMetadata(metadataKeyname, element, target, propertyKey);
        } else {
            Reflect.defineMetadata(metadataKeyname, element, target);
        }
    }

    /**
     * This method assumes that the object at `metadataKeyname` will either be an array of an object. It will be assumed
     * to be an array if the type of index is a number. It will be assumed to be an object if the type is a string.
     *
     * If you pass -1, the element will simply be appended at the end of the array.
     *
     * @param target
     * @param propertyKey
     * @param metadataKeyname
     * @param element
     * @param index
     * @param skipIfDuplicate Indicates if the insertion should be skipped if it already exists
     */
    static setToMetadata(metadataKeyname: string, index: number | string, element: any, target: any, skipIfDuplicate: boolean = true, propertyKey?: string | symbol) {
        let metadata = BaseMetadata.getMetadata(metadataKeyname, target, propertyKey);

        if(typeof index === "number") {
            if(metadata === undefined) {
                metadata = [];
            }

            if(index < -1) {
                console.error(`The index '${index}' passed to '**Metadata.setToMetadata()' cannot be less than '-1'.`);
                return;
            } else if(index === -1) {
                const found = (metadata as any[]).includes(element);

                if(found && skipIfDuplicate) {
                    return;
                }

                metadata.push(element);
            } else {
                metadata[index] = element;
            }
        } else if(typeof index === "string") {
            if(metadata === undefined) {
                metadata = {};
            }

            metadata[index] = element;
        }
        else {
            console.error(`The type '${typeof index}' for index '${index}' must be either a 'string' or 'number'.`);
            return;
        }

        BaseMetadata.defineMetadata(metadataKeyname, metadata, target, propertyKey);
    }
}