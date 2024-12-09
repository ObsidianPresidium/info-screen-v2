<style lang="scss">
    @import "@fontsource/cantarell/700";

    .btn {
        --gradient-default: linear-gradient(135deg, rgba(46,161,255,1) 10%, rgb(116, 195, 255) 40%, rgba(0,161,255,1) 100%);
        &,
        &:link,
        &:visited {
            color: white;
            text-decoration: none;
            padding: 1rem 2rem;
            display: inline-block;
            position: relative;
            font-family: "Cantarell", sans-serif;
            border-radius: 2rem;
            font-weight: bold;
            font-size: 3rem;
            background-image: var(--gradient-default);
            background-size: 400% 100%;
            background-position-x: 0%;
            transition: background-position-x 300ms cubic-bezier(0,0,0,1), transform 300ms ease-out;
            cursor: none;
        }

        &:active {
            background-position-x: 100%;
            transform: scale(0.98);
        }
    }

    button {
        display: none;
    }
</style>

<script lang="ts">
    let { text, href = "#", gradient = true, showCursor = false, submit = false } = $props();
    let submitButton : HTMLButtonElement;

    if (gradient === true) {
        // some logic
    }

    const submitForm = () => {
        if (submit) submitButton.click();
    }
</script>
<button bind:this={submitButton} type="submit">{text}</button>

<a style="cursor: {(showCursor) ? 'default':'none'}" class="btn" href="{href}" on:click={submitForm}>{text}</a>