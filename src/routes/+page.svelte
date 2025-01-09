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
    h2 {
        color: white;
        font-size: 2rem;
        text-align: center;
    }
    form > div {
        margin-bottom: 2rem;
    }
    .submit {
        margin-top: 2rem;
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
    input[type="text"] {
        display: block;
        font-size: 2rem;
        margin: 1rem 0;
    }
</style>

<script lang="ts">
    import Button from "$lib/Button.svelte";
    import Slider from "$lib/Slider.svelte";
    import TextField from "$lib/TextField.svelte";
    import { onMount } from "svelte";
    import { options } from "$lib/options";
    let { owmKey } = $props();
    let useCursorsCheckboxChecked = $state(false);
    let followCursor = $state(false);
    let refreshCredentials = $state(false);
    let form : HTMLFormElement;
    let formSubmitFunction: () => void;
    
    if ($options.followCursor === undefined ) {
        $options = {
            useCursors: true,
            followCursor: true,
            credentials: {
                testCredentials: "",
                owmKey: ""
            }
        }
    }

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
        <Slider text="Display cursor (enable this if not using touchscreen)" bind:checked={useCursorsCheckboxChecked} defaultChecked={false} submittedName="use-cursors" />
        <Slider text="Punchy click follows cursor" bind:checked={followCursor} defaultChecked={false} submittedName="follow-cursor" />
        <Slider text="Refresh credentials" bind:checked={refreshCredentials} defaultChecked={false} submittedName="refresh-credentials" />
        <input type="text" name="test-credentials" placeholder="Test credentials" />
        <hr>
        <h2>OpenWeatherMap settings</h2>
        <TextField submittedName="owm-city" title="City" value="Copenhagen" />
        <Slider text="Use imperial units" defaultChecked={false} submittedName="owm-units" />
        <TextField submittedName="owm-update-interval" title="Update interval (in minutes):" value="30" />
        <TextField submittedName="owm-key" title="API key:" value={owmKey} />
        <div class="submit">
            <Button text="Start info-screen-v2" isButtonElement />
        </div>
    </form>
</main>