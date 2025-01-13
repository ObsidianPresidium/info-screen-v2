import type { Component } from "svelte";
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

export const shownDesktopItems = $state<Component[]>([]);

export function toggleDesktopItem(index: number) {
    const item = desktopItems[index];
    if (shownDesktopItems.includes(item.component)) {
        shownDesktopItems.splice(shownDesktopItems.indexOf(item.component), 1);
    } else {
        shownDesktopItems.push(item.component);
    }
};