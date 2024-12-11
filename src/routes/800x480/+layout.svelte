<style lang="scss">
    .center {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        margin: 0;
    }
    main {
        border-radius: 20px;
        width: 800px;
        height: 480px;
        overflow: hidden;
        position: relative;
    }
</style>

<div class="center">
    <main>
        <slot />
    </main>
</div>