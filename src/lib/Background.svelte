<style lang="scss">
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: var(--gradient-1);
        background-size: cover;
        z-index: -1;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { wallpapers } from "$lib/options";
    import { onDestroy } from "svelte";

    let { useCursors = false } = $props();
    let background: HTMLDivElement;

    onMount(() => {
        if (!useCursors) {
            background.style.cursor = "none";
        }

        if ($wallpapers.wallpapers.length === 0) {
            const wallpaperLogic = wallpapers.subscribe((value) => {
                background.style.backgroundImage = `url("/wallpapers/${value.wallpapers[0]}")`;
            });
            onDestroy(wallpaperLogic);
        } else {
            background.style.backgroundImage = `url("/wallpapers/${$wallpapers.wallpapers[0]}")`;
        }
    });
</script>

<div class="background" bind:this={background}>

</div>