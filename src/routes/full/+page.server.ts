export function load({ cookies }) {
    const cookie = cookies.get("options");
    const parsedCookie = cookie === undefined ? undefined : JSON.parse(cookie);
    return parsedCookie;
}