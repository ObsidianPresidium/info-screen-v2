import type { Component } from "svelte";
import { writable, get } from "svelte/store";
import Weather from "./Weather.svelte";
import DesktopItem2 from "./DesktopItem2.svelte";

type TDesktopItem = {
    component: Component,
    name: string
};

export const desktopItems: TDesktopItem[] = [
    {component: Weather, name: "Weather"},
    {component: DesktopItem2, name: "Desktop Item 2"},
];

export const shownDesktopItems = writable(<Component[]>[]);

export function toggleDesktopItem(index: number) {
    const item = desktopItems[index];
    if (get(shownDesktopItems).includes(item.component)) {
        shownDesktopItems.update((store) => { 
            return store.toSpliced(store.indexOf(item.component), 1);
        })
    } else {
        shownDesktopItems.update((store) => {
            return store.concat([item.component]);
        });
    }
};