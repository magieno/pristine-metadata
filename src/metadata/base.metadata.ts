export abstract class BaseMetadata {
    static setToMetadata(metadataKeyname: string, target: any, index: number | string, element: any, propertyKey?: string | symbol) {
        let metadata = Reflect.getMetadata(metadataKeyname, target, propertyKey);

        if(typeof index === "number") {
            if(metadata === undefined) {
                metadata = [];
            }

            if(index < -1) {
                console.error(`The index '${index}' passed to '**Metadata.setToMetadata()' cannot be less than '-1'.`);
                return;
            } else if(index === -1) {
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

        PropertyMetadata.defineMetadata(target.prototype, propertyKey, metadataKeyname, metadata);
    }
}