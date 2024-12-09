<style lang="scss">
    @import "@fontsource/cantarell/700";
    @import "@fontsource/inter";
    .time {
        --font: "Inter";
        font-size: 10rem;
        color: white;
        font-family: var(--font);
        margin: 0 2rem;
        &:first-child {
            margin-top: 2rem;
        }
        &:last-child {
            margin-bottom: 2rem;
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;

        align-self: flex-start;
    }

    .debug {
        background-color: #8888;
        box-shadow: inset 0px 0px 0px 10px orangered;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    let { debug = false, style = "vertical", font = "Inter", forceAmPm = false } = $props();
    
    function timeString() {
        return new Date().toLocaleTimeString([], { timeStyle: "short" });
    }

    function timeObj() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let needsAmPm = false || forceAmPm;
        let isPm = date.getHours() > 12;

        return {
            hours,
            minutes,
            needsAmPm,
            isPm
        }
    }

    let timeHorizontal = $state(timeString());
    let timeVertical = $state(timeObj());

    onMount(() => {
        

        function timeObj() {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let hourCycle = new Intl.Locale(window.navigator.language).hourCycle;
            let needsAmPm = hourCycle === "h11" || hourCycle === "h12" || forceAmPm;
            let isPm = date.getHours() > 12;

            return {
                hours,
                minutes,
                needsAmPm,
                isPm
            }
        }
        
        setInterval(() => {
            timeHorizontal = timeString();
            timeVertical = timeObj();
        }, 1000);
    });
    
</script>

{#if style === "vertical"}
    <div class:debug class="container">
        <p class="time">
            {timeVertical.hours}
        </p>
        <p class="time">
            {timeVertical.minutes}
        </p>
        {#if timeVertical.needsAmPm}
            <p class="time">
                {(timeVertical.isPm) ? "PM" : "AM"}
            </p>
        {/if}
    </div>
{:else}
    <div class:debug={debug} class="container">
        <p style="--font: {font}" class="time">
            {timeHorizontal}
        </p>
    </div>
{/if}