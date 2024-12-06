<style lang="scss">
    main {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        margin: 0;
        font-family: var(--font-system-ui);
    }
    h1 {
        font-size: 7rem;
        color: white;
    }
    li {
        font-size: 3rem;
    }
    a {
        text-decoration: none;
        color: var(--blue-4);
    }
</style>

<main>
    <h1>Select a screen size to simulate</h1>
    <ul>
        <a href="800x480"><li>800x480</li></a>
        <a href="full"><li>Full size (don't simulate)</li></a>
    </ul>
</main>