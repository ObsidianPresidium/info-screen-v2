<style lang="scss">
    .common {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: -1;
    }

    .image {
        background-image: var(--gradient-1);
    }

    .loader {
        opacity: 0;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { wallpapers, wallpaperChangeRequested } from "$lib/options";
    let { useCursors = false } = $props();
    const fadeTime = 1000;  // In milliseconds. Can't be more than imageDuration
    const imageDuration = 60; // In seconds. Can't be less than fadeTime

    let image: HTMLDivElement;
    let loader: HTMLDivElement;
    let wallpaperPlaylist: number[] = [];
    let currentWallpaper = Math.round(Math.random() * $wallpapers.wallpapers.length);
    let fadeAnimation: Animation;
    const wallpaperIdArray = generateWallpaperIdArray();

    function generateWallpaperIdArray() {
        const wallpaperIds = [];
        for (let i = 0; i < $wallpapers.wallpapers.length; i++) {
            wallpaperIds.push(i);
        }
        return wallpaperIds;
    };

    function generateWallpaperPlaylist() {
        const wallpapersLeft = wallpaperIdArray.slice();
        wallpaperPlaylist = [];

        // Prevent the same wallpaper from being displayed twice in a row
        let _randomIndex = Math.floor(Math.random() * wallpapersLeft.length);
        while (_randomIndex === currentWallpaper) {
            _randomIndex = Math.floor(Math.random() * wallpapersLeft.length);
        }
        wallpaperPlaylist.push(wallpapersLeft[_randomIndex]);
        wallpapersLeft.splice(_randomIndex, 1);

        for (let i = 1; i < $wallpapers.wallpapers.length; i++) {
            const randomIndex = Math.floor(Math.random() * wallpapersLeft.length);
            wallpaperPlaylist.push(wallpapersLeft[randomIndex]);
            wallpapersLeft.splice(randomIndex, 1);
        }
    };

    function loaderFaded() {
        loader.style.backgroundImage = `url("/wallpapers/${$wallpapers.wallpapers[currentWallpaper]}")`;
    };

    function changeWallpaper() {
        if (wallpaperPlaylist.length === 0) {
            generateWallpaperPlaylist();
        }

        const wallpaperIndex = wallpaperPlaylist.shift() as number;
        currentWallpaper = wallpaperIndex;
        image.style.backgroundImage = `url("/wallpapers/${$wallpapers.wallpapers[currentWallpaper]}")`;
        fadeAnimation = loader.animate([{ opacity: 1 }, { opacity: 0 }], { fill: "backwards", iterations: 1, duration: fadeTime });
        fadeAnimation.addEventListener("finish", loaderFaded);
    };

    function changeWallpaperNow() {
        if (loader.getAnimations().length === 0) {
            changeWallpaper();
        } else {
            fadeAnimation.finish();
        }
    };

    onMount(() => {
        if (!useCursors) {
            image.style.cursor = "none";
            loader.style.cursor = "none";
        }
        loader.style.animationDuration = `${fadeTime}ms`;
        loader.style.backgroundImage, image.style.backgroundImage = `url("/wallpapers/${$wallpapers.wallpapers[currentWallpaper]}")`;

        let wallpaperSlideshow = setInterval(() => {
            changeWallpaper();
        }, imageDuration * 1000);

        wallpaperChangeRequested.subscribe(() => {
            clearInterval(wallpaperSlideshow);
            wallpaperSlideshow = setInterval(() => {
                changeWallpaper();
            }, imageDuration * 1000);
            changeWallpaperNow();
        });
    });
</script>
<div class="background">
    <div class="preload">
        {#each $wallpapers.wallpapers as wallpaper}
            <img src="/wallpapers/{wallpaper}" alt="This should be hidden but apparently isnt lol" style="display: none;" />
        {/each}
    </div>

    <div class="common image" bind:this={image}></div>

    <div class="common loader" bind:this={loader}></div>
</div>