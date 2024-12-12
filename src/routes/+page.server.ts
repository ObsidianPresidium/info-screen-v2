import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export function load({ cookies }) {
    const userLikesCursors = cookies.get("useCursors");
    const userLikesCursorsBool = userLikesCursors === "true";

    return { userLikesCursorsBool };
}

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const size = formData.get("size");
        const useCursors = formData.get("use-cursors");
        console.log("Form submitted");
        console.log(useCursors);

        cookies.set(
            "useCursors", `${useCursors === "on"}`,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
                secure: false
            }
        );

        redirect(302, `/${size}/`);
    }
} satisfies Actions;