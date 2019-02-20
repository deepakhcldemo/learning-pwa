export interface TelemetryPayload {
    actor: any;
    published: any;
    context: any;
    generator: any;
    object: any;
    verb: any;
    storageEstimate: any;
    viewportSize: any;
    orgId: any;
}

export interface TelemetryParams {
    data: any;
    name: String;
    verb: String;
}

export interface TelemetryEventData {
    verb: {
        id: string,
    };
    object: {
        extensions?: any,
        definition: {
            name: string
        },
    };
}
