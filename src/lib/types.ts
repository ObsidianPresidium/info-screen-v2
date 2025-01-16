type Credentials = {
    testCredentials: string;
    owmKey: string;
}

export type InfoScreenOptions = {
    useCursors: boolean;
    followCursor: boolean;
    dryRunMode: boolean;
    owmUnits: boolean;
    owmCity: string;
    owmUpdateInterval: number;
    credentials: Credentials;
};

export type Wallpapers = {
    wallpapers: string[];
};

export type CookieProps = {
    optionsCookie: InfoScreenOptions;
    wallpapersCookie: Wallpapers;
};