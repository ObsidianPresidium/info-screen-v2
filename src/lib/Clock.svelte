<style lang="scss">
    @import "@fontsource/cantarell/700";
    @import "@fontsource/inter";
    .time {
        --font: "Inter";
        font-size: 10rem;
        color: white;
        font-family: var(--font);
        margin: 0 2rem;
        line-height: 1;
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
        min-width: 10rem * 2;
    }

    .large {
        font-size: 25rem;
        &--needs-am-pm {
            font-size: 15rem;
        }
    }

    .debug {
        background-color: #8888;
        box-shadow: inset 0px 0px 0px 10px orangered;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    let { debug = false, style = "vertical", large = false, scale = false, font = "Inter", forceAmPm = false } = $props();
    
    let usesAmPm = $state(false);
    let timeHorizontal = $state(timeString());
    let timeVertical = $state(timeObj());
    let orientation = $state("landscape");

    function timeString() {
        const date = new Date().toLocaleTimeString([], { timeStyle: "short" });
        usesAmPm = date.includes("AM") || date.includes("PM");
        return date;
    }

    function timeObj() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let minutesLeadingZero = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        let needsAmPm = false || forceAmPm;
        let isPm = date.getHours() > 12;

        return {
            hours,
            minutesLeadingZero,
            needsAmPm,
            isPm
        }
    }

    onMount(() => {
        function timeObj() {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let minutesLeadingZero = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
            let hourCycle = new Intl.Locale(window.navigator.language).hourCycle;
            let needsAmPm = hourCycle === "h11" || hourCycle === "h12" || forceAmPm;
            let isPm = date.getHours() > 12;

            return {
                hours,
                minutesLeadingZero,
                needsAmPm,
                isPm
            }
        };
        
        function updateOrientation() {
            orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
        };
        updateOrientation();
        
        window.addEventListener("resize", () => {
            updateOrientation();
        });

        setInterval(() => {
            timeHorizontal = timeString();
            timeVertical = timeObj();
        }, 1000);
    });
    
</script>

{#if style === "vertical" || orientation === "portrait"}
    <div class:debug class="container">
        <p class="time">
            {timeVertical.hours}
        </p>
        <p class="time">
            {timeVertical.minutesLeadingZero}
        </p>
        {#if timeVertical.needsAmPm}
            <p class="time">
                {(timeVertical.isPm) ? "PM" : "AM"}
            </p>
        {/if}
    </div>
{:else}
    <div class:debug={debug} class="container">
        <p style="--font: {font}; {usesAmPm ? 'font-size: 15rem' : ''}" class="time" class:large>
            {timeHorizontal}
        </p>
    </div>
{/if}