<style lang="scss">
    @import "$lib/_mixins.scss";

    .desktop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
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
        position: relative;
        @include transparent-gradient-background(var(--gradient-8), 0.33);
        display: flex;
        align-items: center;
    }
    .testelement {
        @include set-flex-size-and-margin(25rem, 100%, 2rem);
        display: block;
        position: relative;
        @include transparent-gradient-background(var(--gradient-8), 0.33);
    }
</style>

<script lang="ts">
    import Background from "$lib/Background.svelte";
    import Clock from "$lib/Clock.svelte";
    import Button from "$lib/Button.svelte";
</script>

<Background />
<div class="foreground">
    <div class="desktop">
        <Clock />
        <div class="testelement">

        </div>
    </div>
    <div class="panel">
        <Button text="Test button" />
    </div>
</div>