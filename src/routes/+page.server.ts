import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const userLikesCursors = cookies.get("useCursors");
}

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const size = formData.get("size");
        const useCursors = formData.get("use-cursors");

        if (useCursors) {
            cookies.set(
                "useCursors", "true",
                {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 365
                }
            );
            redirect(302, `/${size}/`);
        }
    }
}