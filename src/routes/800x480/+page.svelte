<style lang="scss">
    @import "$lib/_mixins.scss";

    .desktop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: calc(100% - 10rem);
        margin: 2rem 0;
        overflow-y: hidden;
    }
    .foreground {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .panel {
        width: 100%;
        height: 10rem;
        @include transparent-gradient-background(var(--gradient-8), 0.33, $z-index: 0, $blur: 10rem);
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
    }
    .desktop-items {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
        gap: 1rem;
        margin: 0 1rem;
        box-sizing: border-box;
    }

    .foreground--no-cursor :global {
        cursor: none !important;
    }

    .foreground--no-cursor :global:hover {
        cursor: none !important;
    }
    
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { scale } from "svelte/transition";
    import { elasticOut } from "svelte/easing";
    import Background from "$lib/Background.svelte";
    import Clock from "$lib/Clock.svelte";
    import Button from "$lib/Button.svelte";
    import DesktopItem1 from "$lib/DesktopItem1.svelte";
    import DesktopItem2 from "$lib/DesktopItem2.svelte";
    
    let { data } = $props();
    let foreground: HTMLDivElement;

    let desktopItemButton1Text = $state("Open Desktop Item 1");
    let desktopItemButton2Text = $state("Open Desktop Item 2");
    let desktopItem1Shown = $state(false);
    let desktopItem2Shown = $state(false);

    function toggleDesktopItem1() {
        if (desktopItemButton1Text === "Open Desktop Item 1") {
            desktopItemButton1Text = "Close Desktop Item 1";
            desktopItem1Shown = true;
        } else {
            desktopItemButton1Text = "Open Desktop Item 1";
            desktopItem1Shown = false;
        }
    }

    function toggleDesktopItem2() {
        if (desktopItemButton2Text === "Open Desktop Item 2") {
            desktopItemButton2Text = "Close Desktop Item 2";
            desktopItem2Shown = true;
        } else {
            desktopItemButton2Text = "Open Desktop Item 2";
            desktopItem2Shown = false;
        }
    }

</script>

<Background useCursors={data.useCursors} />
<div class="foreground" class:foreground--no-cursor={!data.useCursors}>
    <div class="desktop">
        <Clock />
        <div class="desktop-items">
            {#if desktopItem1Shown}
                <DesktopItem1 />
            {/if}
            {#if desktopItem2Shown}
                <DesktopItem2 />
            {/if}
        </div>
    </div>
    <div class="panel">
        <Button href={toggleDesktopItem1} text={desktopItemButton1Text} zIndex=1 usePunchyClick />
        <Button href={toggleDesktopItem2} text={desktopItemButton2Text} zIndex=1 usePunchyClick />
    </div>
</div>