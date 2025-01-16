import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

class InfoScreenApiHandler {
    private dryRunMode = false;

    public setDryRunMode(dryRunMode: boolean) {
        this.dryRunMode = dryRunMode;
    }

    public fetch = {
        weather: async (key: string, city: string, useImperial: boolean) => {
            if (this.dryRunMode) {
                return fetch("/dryrun-data/weather.json");
            }
            return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${useImperial ? "imperial" : "metric"}`);
        }
    }
}

const apiInternal = new InfoScreenApiHandler();
export const api = writable(apiInternal);