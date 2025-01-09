type Credentials = {
    testCredentials: string;
    owmKey: string;
}

export type InfoScreenOptions = {
    useCursors: boolean;
    followCursor: boolean;
    credentials: Credentials;
};