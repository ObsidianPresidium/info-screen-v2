<style lang="scss">
    @import "@fontsource/cantarell/400";
    @import "@fontsource/inter";

    .content {
        margin: 1rem;
        flex-grow: 1;
        box-sizing: border-box;
    }

    h1 {
        font-size: 5rem;
        font-family: "Cantarell", sans-serif;
        color: white;
        text-align: center;
    }
    p {
        font-size: 2rem;
        font-family: "Inter", sans-serif;
        color: white;
    }
</style>

<script lang="ts">
    import DesktopItemGeneric from "$lib/DesktopItemGeneric.svelte";
    import { options } from "$lib/options";
    import { api } from "$lib/api.svelte.ts";
    import { onMount } from "svelte";

    let temp = $state(0);
    let weatherDescription = $state("");

    async function getWeather() {
        const response = await $api.fetch.weather($options.credentials.owmKey, $options.owmCity, $options.owmUnits);
        const data = await response.json();
        temp = data.main.temp;
        weatherDescription = data.weather[0].description;
    };

    onMount(() => {
        getWeather();
        setInterval(getWeather, $options.owmUpdateInterval * 60000);
    });

</script>

<DesktopItemGeneric>
    <div class="content">
        <h1>Weather</h1>
        <p>Current temperature: {temp}°C</p>
        <p>{weatherDescription}</p>
    </div>
</DesktopItemGeneric>