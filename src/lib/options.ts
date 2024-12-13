import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { InfoScreenOptions } from "$lib/types";
export const options: Writable<InfoScreenOptions> = writable<InfoScreenOptions>({
    useCursors: true,
    followCursor: true
});