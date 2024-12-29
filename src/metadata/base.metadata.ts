export abstract class BaseMetadata {
    /**
     * This method clones the metadata from a `sourceTarget` and `sourcePropertyKey (optional)` and moves it to
     * `destinationTarget` and `destinationPropertyKey`.
     *
     * If you pass the `sourcePropertyKey` but not the `destinationPropertyKey`, the `sourcePropertyKey` will be used
     * instead.
     *
     * @param sourceTarget
     * @param destinationTarget
     * @param sourcePropertyKey
     * @param destinationPropertyKey
     * @param metadataKeysToIgnore
     */
    static cloneMetadata(sourceTarget: any, destinationTarget: any, sourcePropertyKey?: string | symbol, destinationPropertyKey?: string | symbol, metadataKeysToIgnore: string[] = [] ) {
        if(sourcePropertyKey) {
            const keys = BaseMetadata.getMetadataKeys(sourceTarget, sourcePropertyKey);

            keys.filter(key => !metadataKeysToIgnore.includes(key)).forEach( (key:string) => {
                const metadata = BaseMetadata.getMetadata(key, sourceTarget, sourcePropertyKey);

                if(metadata === undefined) {
                    return;
                }

                BaseMetadata.defineMetadata(key, metadata, destinationTarget, destinationPropertyKey ?? sourcePropertyKey);
            });
        } else {
            const keys = BaseMetadata.getMetadataKeys(sourceTarget);

            keys.filter(key => !metadataKeysToIgnore.includes(key)).forEach( (key:string) => {
                const metadata = BaseMetadata.getMetadata(key, sourceTarget);
                BaseMetadata.defineMetadata(key, metadata, destinationTarget);
            });
        }
    }

    /**
     * This method retrieves the metadata from the class. This means that you must pass the name of the class, not the
     * object.
     *
     * If you have an object, pass `object.constructor` to the target.
     * @param metadataKeyname
     * @param target
     * @param propertyKey
     */
    static getMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol): any {
        if(propertyKey) {
            return Reflect.getMetadata(metadataKeyname, target, propertyKey);
        } else {
            return Reflect.getMetadata(metadataKeyname, target);
        }
    }

    /**
     * This method returns whether there's a metadata or not for this key.
     * @param metadataKeyname
     * @param target
     * @param propertyKey
     */
    static hasMetadata(metadataKeyname: string, target: any, propertyKey?: string | symbol): boolean {
        if(propertyKey) {
            return Reflect.hasMetadata(metadataKeyname, target, propertyKey);
        } else {
            return Reflect.hasMetadata(metadataKeyname, target);
        }
    }

    /**
     * This method returns all the metadata keys.
     * @param target
     * @param propertyKey
     */
    static getMetadataKeys(target: any, propertyKey?: string | symbol): string[] {
        if(propertyKey) {
            return Reflect.getMetadataKeys( target, propertyKey);
        } else {
            return Reflect.getMetadataKeys(target);
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