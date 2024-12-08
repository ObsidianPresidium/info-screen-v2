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
            transition: background-position-x 300ms cubic-bezier(0,0,0,1); 
        }

        &:active {
            background-position-x: 100%;
        }
    }
</style>

<script lang="ts">
    let { text, href = "#", gradient = true } = $props();

    if (gradient === true) {
        // some logic
    }
</script>

<a class="btn" href="{href}">{text}</a>