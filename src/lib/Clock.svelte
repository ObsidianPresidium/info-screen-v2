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
    let timeHorizontal = $state(timeString());
    let timeVertical = $state(timeObj());
    let orientation = $state("landscape");
    let is12HourLocale = $state(false);

    function timeString() {
        return new Date().toLocaleTimeString([], { timeStyle: "short" });
    }

    function get12HourLocale() {
        try {
            const sample = timeString();
            return sample.includes("AM") || sample.includes("PM");
        } catch {
            return false;
        }
    }

    function timeObj() {
        let date = new Date();
        let resTimeString = timeString();
        let timeArray = resTimeString.split(/[:\. ]/);
        let localeHours = timeArray[0];
        let localeMinutes = timeArray[1];
        let needsAmPm = false || forceAmPm;
        let isPm = date.getHours() > 12;

        return {
            localeHours,
            localeMinutes,
            needsAmPm,
            isPm
        }
    }

    onMount(() => {
        is12HourLocale = get12HourLocale();

        function timeObj() {
            let date = new Date();
            let resTimeString = timeString();
            let timeArray = resTimeString.split(/[:\. ]/);
            let localeHours = timeArray[0];
            let localeMinutes = timeArray[1];
            let needsAmPm = is12HourLocale || forceAmPm;
            let isPm = date.getHours() > 12;

            return {
                localeHours,
                localeMinutes,
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
            {timeVertical.localeHours}
        </p>
        <p class="time">
            {timeVertical.localeMinutes}
        </p>
        {#if is12HourLocale}
            <p class="time">
                {(timeVertical.isPm) ? "PM" : "AM"}
            </p>
        {/if}
    </div>
{:else}
    <div class:debug={debug} class="container">
        <p style="--font: {font}; {is12HourLocale ? 'font-size: 15rem' : ''}" class="time" class:large>
            {timeHorizontal}
        </p>
    </div>
{/if}