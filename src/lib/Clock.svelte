<style lang="scss">
    @import "@fontsource/cantarell/700";
    .time {
        font-size: 10rem;
        color: white;
        font-family: "Cantarell";
        margin: 2rem;
    }
    .container {
        display: inline-block;
        align-self: flex-start;
    }

    .debug {
        background-color: #8888;
        box-shadow: inset 0px 0px 0px 10px orangered;
    }
</style>

<script lang="ts">
    let { debug = false } = $props();

    function timeString() {
        return new Date().toLocaleTimeString([], { timeStyle: "short" });
    }

    let time = $state(timeString());
    setInterval(() => {
        time = timeString();
    }, 1000);
</script>

<div class:debug={debug} class="container">
    <p class="time">
        {time}
    </p>
</div>