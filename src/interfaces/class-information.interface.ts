export interface ClassInformationInterface {
    properties: string[];

    methods: string[];

    metadata: {[id in string]: any};
}