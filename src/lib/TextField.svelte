<style lang="scss">
    p {
        color: white;
        font-size: 3rem;
    }

    input {
        border-radius: 0.25rem;
        font-size: 2rem;
    }
</style>

<script lang="ts">
    let { title, titleStyles = "", styles = "", submittedName, value = $bindable() } = $props();


</script>
{#if title}
    <p style={titleStyles}>{title} <input type="text" style={styles} name="{submittedName}" id="input" bind:value={value}></p>
{:else}
    <input type="text" style={styles} name="{submittedName}" id="input" bind:value={value}>
{/if}