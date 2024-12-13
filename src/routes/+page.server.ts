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

        const cookie = JSON.stringify({
            useCursors: formData.get("use-cursors") === "on",
            followCursor: formData.get("follow-cursor") === "on"
        });


        cookies.set(
            "options", cookie,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 365
            },
        );

        redirect(302, `/${size}/`);
    }
} satisfies Actions;