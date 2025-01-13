import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: [
				searchForWorkspaceRoot(process.cwd()),
				"/static/dryrun-data/*",
				"/static/wallpapers/*"
			]
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				quietDeps: true,
				silenceDeprecations: ["global-builtin", "color-functions", "import"]
			}
		}
	}
});
