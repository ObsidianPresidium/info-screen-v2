<style lang="scss">
    @import "@fontsource/cantarell/700";

    @mixin common-button-styles {
        color: white;
        padding: 1rem 2rem;
        font-family: "Cantarell", sans-serif;
        border-radius: 2rem;
        font-weight: bold;
        font-size: 3rem;
        background-size: 400% 100%;
        background-position-x: 0%;
    }

    .button-wrap {
        width: max-content;
        height: max-content;
        perspective: 15rem;
        perspective-origin: center;
    }
    .btn {
        --gradient-default: linear-gradient(135deg, rgba(46,161,255,1) 10%, rgb(116, 195, 255) 40%, rgba(0,161,255,1) 100%);
        --gradient-disabled: linear-gradient(135deg, rgba(98,98,98,1) 10%, rgba(150,150,150,1) 40%, rgba(23,23,23,1) 100%);
        @include common-button-styles();
        background-image: var(--gradient-default);
        transition: background-position-x 300ms cubic-bezier(0,0,0,1), transform 300ms ease-out;
        position: relative;

        &:active {
            background-position-x: 100%;
        }

        &--to-disabled {
            cursor: not-allowed;
            
            &::after {
                @include common-button-styles();
                content: "";
                background-image: var(--gradient-disabled);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                animation: fade-in 300ms ease-out;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
            }
        }

        &--to-enabled {
            cursor: default;
            &::after {
                content: "";
                @include common-button-styles();
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: var(--gradient-enabled);
                animation: fade-in 300ms ease-out;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
            }
        }
    }
    a.btn {
        &,
        &:link,
        &:visited {
            text-decoration: none;
            display: inline-block;
            position: relative;
            border-radius: 2rem;
        }
    }
    button.btn {
        border: none;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>

<script lang="ts">
    import { onMount } from 'svelte';
    import { options } from "$lib/options";
    let { text, href = "#", gradient = true, isButtonElement = true, zIndex = "auto", usePunchyClick = true } = $props();

    const perspectiveFactor = 0.75;  // Increase this for a smaller FoV

    let callback: string | ((event: MouseEvent) => void) = href;
    let elButton: HTMLAnchorElement | HTMLButtonElement;
    let elDiv: HTMLDivElement;
    const followCursor = $options.followCursor;

    let punchyClick: EventListener = (event) => {
        if (!usePunchyClick) {
            elButton.style.transform = "translateZ(-0.5rem)";
            return;
        }

        if (followCursor) {
            elDiv.onmousemove = punchyClick;
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
        elDiv.onmousemove = null;
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
                elDiv.addEventListener('click', callback as EventListener);
            } else {
                (elButton as HTMLAnchorElement).href = href;
            }
        } else {
            if (typeof callback === 'function') {
                elDiv.addEventListener('click', callback as EventListener);
            } else if (href !== "#") {
                elDiv.addEventListener('click', (event) => {
                    window.location.href = href;
                });
            } else if (href === "#") {

            } else {
                elButton.type = "submit";
            }
        }
        elDiv.style.perspective = `${Number(getComputedStyle(elButton).width.replace("px", "")) * perspectiveFactor}px`;
    });
</script>

<!-- svelte-ignore a11y_missing_attribute, a11y_no_static_element_interactions -->
<div class="button-wrap" bind:this={elDiv} onmousedown={punchyClick} onmouseup={unpunch} onmouseleave={unpunch}>
    {#if isButtonElement}
        <button class="btn" bind:this={elButton}>{text}</button>
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