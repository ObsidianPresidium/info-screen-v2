<style lang="scss">
    .background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: var(--gradient-1);
        z-index: -1;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    let { useCursors = false } = $props();
    let background: HTMLDivElement;

    onMount(() => {
        if (!useCursors) {
            background.style.cursor = "none";
        }
    });
</script>

<div class="background" bind:this={background}>

</div>