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

    let credentials = $options.credentials.testCredentials;
</script>

<DesktopItemGeneric>
    <div class="content">
        <h1>Desktop Item 2</h1>
        <p>This is the second desktop item. This can also be shown, or hidden, via its button from the panel below.</p>
        <p>Credentials: {credentials}</p>
    </div>
</DesktopItemGeneric>