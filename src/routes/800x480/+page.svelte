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

        &--clock-only {
            justify-content: center;
        }
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
        width: 100%;
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
    import { desktopItems, shownDesktopItems, toggleDesktopItem } from "$lib/desktopItemLogic.svelte.ts";
    import Background from "$lib/Background.svelte";
    import Clock from "$lib/Clock.svelte";
    import Button from "$lib/Button.svelte";
    import { options, wallpapers } from "$lib/options";
    import { api } from "$lib/api.svelte.ts";
    import type { CookieProps } from "$lib/types";
    const { data }: { data: CookieProps } = $props();
    $options = data.optionsCookie;
    $wallpapers = data.wallpapersCookie;

    $api.setDryRunMode($options.dryRunMode);
    
    let foreground: HTMLDivElement;
</script>

<Background useCursors={$options.useCursors} />
<div class="foreground" class:foreground--no-cursor={!$options.useCursors}>
    <div class:desktop--clock-only={$shownDesktopItems.length === 0} class="desktop">
        {#if $shownDesktopItems.length !== 0}
            <Clock />
            <div class="desktop-items">
                {#each $shownDesktopItems as desktopItem}
                    <svelte:component this={desktopItem} />
                {/each}
            </div>
        {:else}
            <Clock style="horizontal" large />
        {/if}
    </div>
    <div class="panel">
        {#each desktopItems as desktopItem, index}
            <Button href={() => toggleDesktopItem(index)} text={desktopItem.name} activated={$shownDesktopItems.includes(desktopItem.component)} zIndex=1 usePunchyClick />
        {/each}
    </div>
</div>