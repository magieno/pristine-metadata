export interface ClassInformationInterface {
    //name: string;

    properties: string[];

    methods: string[];

    metadata: {[id in string]: any};
}