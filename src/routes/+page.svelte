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
    .slider-div {
        display: flex;
        align-items: center;
        p {
            color: white;
            font-size: 3rem;
        }
    }
    .switch {
        position: relative;
        display: inline-block;
        cursor: pointer;
        width: 6rem;
        height: 3rem;
        margin-right: 1rem;

        input {
            opacity: 0;
            width: 0;
            height: 0;
            
            &:checked + .slider {
                background-color: rgb(80, 156, 255);
            }

            &:checked + .slider:before {
                transform: translateX(2.75rem);
                background-color: white;
            }
        }
        
        .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            border-radius: 3rem;
            transition: background-color 400ms;

            &:before {
                content: "";
                position: absolute;
                width: 2.5rem;
                height: 2.5rem;
                left: 0.25rem;
                bottom: 0.25rem;
                background-color: #222;
                transition: 400ms;
                border-radius: 50%;
            }
        }


    }
</style>

<script lang="ts">
    import Button from "$lib/Button.svelte";
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
        <div class="slider-div">
            <label for="use-cursors" class="switch">
                <input type="checkbox" name="use-cursors" id="use-cursors" bind:checked={useCursorsCheckboxChecked}>
                <span class="slider"></span>
            </label>
            <p>Display cursor (enable this if not using touchscreen)</p>
        </div>
        <Button text="Start info-screen-v2" isButtonElement/>
    </form>
</main>