type Credentials = {
    testCredentials: string;
    owmKey: string;
}

export type InfoScreenOptions = {
    useCursors: boolean;
    followCursor: boolean;
    owmUnits: boolean;
    owmCity: string;
    owmUpdateInterval: number;
    credentials: Credentials;
};