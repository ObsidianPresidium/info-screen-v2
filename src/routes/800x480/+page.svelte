<style lang="scss">
    @import "$lib/_mixins.scss";

    .desktop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 2rem 0;
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
        padding-left: 1rem;
    }
    .testelement {
        display: block;
        @include transparent-gradient-background(var(--gradient-8), 0.33);
        width: 100%;
        height: 100%;
        margin: 0 1rem;

        &:first-child {
            margin-left: 2rem;
        }

        &:last-child {
            margin-right: 2rem;
        }
    }
    .desktop-items {
        display: flex;
        height: 100%;
        width: 100%;
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
    import Background from "$lib/Background.svelte";
    import Clock from "$lib/Clock.svelte";
    import Button from "$lib/Button.svelte";
    import { options } from "$lib/options";
    import type { InfoScreenOptions } from "$lib/types";
    const { data }: { data: InfoScreenOptions } = $props();

    $options = data;
    let foreground: HTMLDivElement;
</script>

<Background useCursors={$options.useCursors} />
<div class="foreground" class:foreground--no-cursor={!$options.useCursors}>
    <div class="desktop">
        <Clock />
        <div class="desktop-items">
            <div class="testelement">

            </div>
            <div class="testelement">

            </div>
        </div>
    </div>
    <div class="panel">
        <Button href="#" text="Test button" zIndex=1 usePunchyClick />
    </div>
</div>