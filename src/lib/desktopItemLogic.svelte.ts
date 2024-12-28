import type { Component } from "svelte";
import DesktopItem1 from "./DesktopItem1.svelte";
import DesktopItem2 from "./DesktopItem2.svelte";

type TDesktopItem = {
    component: Component,
    name: string
};

export const desktopItems: TDesktopItem[] = [
    {component: DesktopItem1, name: "Desktop Item 1"},
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