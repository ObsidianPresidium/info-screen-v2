<style lang="scss">
    .slider-div {
        display: flex;
        align-items: center;
        p {
            color: white;
            font-size: 3rem;
            margin: 0;
        }
    }
    .switch {
        position: relative;
        display: inline-block;
        cursor: pointer;
        width: 6rem;
        height: 3rem;
        margin-right: 1rem;

        input {
            opacity: 0;
            width: 0;
            height: 0;
            
            &:checked + .slider {
                background-color: rgb(80, 156, 255);
            }

            &:checked + .slider:before {
                transform: translateX(2.75rem);
                background-color: white;
            }
        }
        
        .slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            border-radius: 3rem;
            transition: background-color 400ms;

            &:before {
                content: "";
                position: absolute;
                width: 2.5rem;
                height: 2.5rem;
                left: 0.25rem;
                bottom: 0.25rem;
                background-color: #222;
                transition: 400ms;
                border-radius: 50%;
            }
        }
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    let { text, defaultChecked = false, checked = $bindable(), submittedName="" } = $props();

    
    checked = defaultChecked;
    
</script>

<div class="slider-div">
    <label for={submittedName} class="switch">
        <input type="checkbox" name={submittedName} id={submittedName} bind:checked={checked}>
        <span class="slider"></span>
    </label>
    <p>{text}</p>
</div>