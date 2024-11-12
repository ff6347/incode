import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	integrations: [mdx()],
	markdown: {
		shikiConfig: {
			theme: "github-light",
			// dark: 'github-dark',
			// }
			wrap: true,
		},
		// remarkPlugins: [remarkGfm],
	},
});
