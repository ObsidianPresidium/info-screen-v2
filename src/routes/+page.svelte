<style lang="scss">
    main {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        margin: 0;
        font-family: var(--font-system-ui);
    }
    h1 {
        font-size: 7rem;
        color: white;
    }
    .radio-div {
        display: flex;
        align-items: center;
        label {
            color: var(--blue-4);
            font-size: 3rem;
            margin-left: 1rem;
        }
    }
</style>

<script lang="ts">
    import Button from "$lib/Button.svelte";
    import Slider from "$lib/Slider.svelte";
    import { onMount } from "svelte";
    let { userLikesCursorsBool } = $props();
    let useCursorsCheckboxChecked = $state(userLikesCursorsBool);
    let form : HTMLFormElement;
    let formSubmitFunction: () => void;

    onMount(() => {
        formSubmitFunction = () => {
            form.submit();
        }
    });
</script>

<main>
    <h1>Apply customizations</h1>
    <form method="POST" bind:this={form}>
        <div>
            <div class="radio-div">
                <input type="radio" name="size" id="size-800x480" value="800x480"><label for="size-800x480">800x480</label>
            </div>
            <div class="radio-div">
                <input type="radio" name="size" id="size-full" value="full"><label for="size-full">Full size (scale with browser viewport)</label>
            </div>
        </div>
        <Slider text="Display cursor (enable this if not using touchscreen)" bind:checked={useCursorsCheckboxChecked} defaultChecked={userLikesCursorsBool} />
        <Button text="Start info-screen-v2" isButtonElement />
    </form>
</main>