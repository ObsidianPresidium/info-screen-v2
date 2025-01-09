import { redirect } from "@sveltejs/kit";
import fs from "node:fs";
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

        let credentials;
        
        if (formData.get("refresh-credentials") === "on") {
            const testCredentials = formData.get("test-credentials");
            const owmKey = formData.get("owm-key");

            credentials = {
                testCredentials,
                owmKey
            };
            if (!fs.existsSync("runtime-data")) {
                fs.mkdirSync("runtime-data");
            }
            fs.writeFileSync("runtime-data/credentials.json", JSON.stringify(credentials));
        } else {
            try {
                credentials = JSON.parse(fs.readFileSync("runtime-data/credentials.json", "utf8"));
            } catch {
                credentials = {};
            }
        }
        
        const cookie = JSON.stringify({
            useCursors: formData.get("use-cursors") === "on",
            followCursor: formData.get("follow-cursor") === "on",
            credentials: credentials
        });

        cookies.set(
            "options", cookie,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
                secure: false
            },
        );

        redirect(302, `/${size}/`);
    }
} satisfies Actions;