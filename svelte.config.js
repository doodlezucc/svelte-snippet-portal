import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import MagicString from 'magic-string';
import { createHighlighter } from 'shiki';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), shikiPreprocess()],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function shikiPreprocess() {
	const shikiPromise = createHighlighter({
		langs: ['ts', 'svelte'],
		themes: ['github-light', 'dark-plus']
	});

	return {
		name: 'shiki-preprocess',
		markup: async ({ content }) => {
			const shiki = await shikiPromise;

			const s = new MagicString(content);
			const matches = content.matchAll(/^{`(\S+)(.+?)`}/gms);

			for (const match of matches) {
				const [substring, language, code] = match;

				const start = match.index;
				const end = start + substring.length;

				const shikiHtml = shiki.codeToHtml(code.trim(), {
					lang: language,
					themes: { light: 'github-light', dark: 'dark-plus' },
					tabindex: false
				});
				s.update(start, end, `{@html \`${shikiHtml}\`}`);
			}

			return {
				code: s.toString(),
				map: s.generateMap()
			};
		}
	};
}

export default config;
