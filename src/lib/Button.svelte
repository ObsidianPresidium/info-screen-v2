<style lang="scss">
    @import "@fontsource/cantarell/700";

    .button-wrap {
        perspective: 15rem;
        perspective-origin: center;
    }
    .btn,
    button {
        --gradient-default: linear-gradient(135deg, rgba(46,161,255,1) 10%, rgb(116, 195, 255) 40%, rgba(0,161,255,1) 100%);
        color: white;
        padding: 1rem 2rem;
        font-family: "Cantarell", sans-serif;
        border-radius: 2rem;
        font-weight: bold;
        font-size: 3rem;
        background-image: var(--gradient-default);
        background-size: 400% 100%;
        background-position-x: 0%;
        transition: background-position-x 300ms cubic-bezier(0,0,0,1), transform 300ms ease-out;

        &:active {
            background-position-x: 100%;
        }
    }
    .btn {
        &,
        &:link,
        &:visited {
            text-decoration: none;
            display: inline-block;
            position: relative;
            border-radius: 2rem;
        }
    }

    button {
        border: none;
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    let { text, href = "#", gradient = true, isButtonElement = true, zIndex = "auto", usePunchyClick = true } = $props();

    let callback: string | ((event: MouseEvent) => void) = href;
    let elButton: HTMLAnchorElement | HTMLButtonElement;
    
    let punchyClick: EventListener = (event) => {
        if (!usePunchyClick) {
            elButton.style.transform = "translateZ(-0.5rem)";
            return;
        }
        const mouseEvent = event as MouseEvent;
        const targetSizeW = Number(getComputedStyle(elButton).width.replace("px", ""));
        const targetSizeH = Number(getComputedStyle(elButton).height.replace("px", ""));
        const x = mouseEvent.offsetX;
        const y = mouseEvent.offsetY;

        elButton.style.transform = `\
            translateZ(-0.5rem) \
            rotateX(${((y - targetSizeH / 2) / targetSizeH * 10) * -1}deg) \
            rotateY(${(x - targetSizeW / 2) / targetSizeW * 10}deg)\
        `;
    };

    let unpunch: EventListener = () => {
        elButton.style.transform = "";
    }

    if (gradient === true) {
        // some logic
    }

    

    onMount(() => {
        if (zIndex !== "auto") {
            elButton.style.zIndex = zIndex;
        }
        if (!isButtonElement) {
            if (typeof callback === 'function') {
                elButton.addEventListener('click', callback as EventListener);
            } else {
                (elButton as HTMLAnchorElement).href = href;
            }
        } else {
            if (typeof callback === 'function') {
                elButton.addEventListener('click', callback as EventListener);
            } else if (href !== "#") {
                elButton.addEventListener('click', (event) => {
                    window.location.href = href;
                });
            } else if (href === "#") {

            } else {
                elButton.type = "submit";
            }
        }
    });
</script>

<!-- svelte-ignore a11y_missing_attribute, a11y_no_static_element_interactions -->
<div class="button-wrap" onmousedown={punchyClick} onmouseup={unpunch} onmouseleave={unpunch}>
    {#if isButtonElement}
        <button bind:this={elButton}>{text}</button>
    {:else}
        <!-- 
            There is a problem with anchor elements showing cursors despite inheriting
            a Svelte globally styled class with cursor: none, even though it has higher
            specificity than default classes. Anchor elements should therefore preferably
            not be used.
        -->
        <a class="btn" bind:this={elButton}>{text}</a>
    {/if}
</div>