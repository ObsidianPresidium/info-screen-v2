export function load({ cookies }) {
    const useCursors = cookies.get("useCursors") === "true";
    return { useCursors: useCursors };
}