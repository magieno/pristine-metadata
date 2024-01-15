export interface PropertyMetadataInterface {
    name: string;

    type: string;

    metadata: {[id in string]: any};
}