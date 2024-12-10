export function load({ cookies }) {
    console.log(cookies.get("useCursors"));
    const useCursors = cookies.get("useCursors") === "true";
    return { useCursors: useCursors };
}