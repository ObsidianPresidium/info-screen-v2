<style lang="scss">
    @import "$lib/_mixins.scss";
    .desktop-item {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        @include transparent-gradient-background(var(--gradient-8), 0.33, $z-index: -1);
        flex-grow: 1;
        box-sizing: border-box;
    }
</style>

<script lang="ts">
    import { scale } from "svelte/transition";
</script>

<div class="desktop-item" transition:scale>
    <slot />
</div>