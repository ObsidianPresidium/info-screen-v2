function parseCookie(cookie: string | undefined) {
    return cookie === undefined ? undefined : JSON.parse(cookie);
}

export function load({ cookies }) {
    const optionsCookie = parseCookie(cookies.get("options"));
    const wallpapersCookie = parseCookie(cookies.get("wallpapers"));
    return {optionsCookie, wallpapersCookie};
}