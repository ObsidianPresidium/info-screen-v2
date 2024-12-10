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
        @include transparent-gradient-background(var(--gradient-8), 0.33, $z-index: -1);
        display: flex;
        align-items: center;
    }
    .testelement {
        // @include set-flex-size-and-margin(25rem, 100%, 2rem);
        margin: 0 2rem;
        display: block;
        @include transparent-gradient-background(var(--gradient-8), 0.33);
        width: calc(50% - 4rem);
        height: 100%;
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
    
    let { data } = $props();
    let foreground: HTMLDivElement
</script>

<Background useCursors={data.useCursors} />
<div class="foreground" class:foreground--no-cursor={!data.useCursors}>
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
        <Button href="#" text="Test button" />
    </div>
</div>