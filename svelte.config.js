import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import MagicString from 'magic-string';
import * as nodeFs from 'node:fs';
import * as nodePath from 'node:path';
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
		adapter: adapter(),

		alias: {
			'svelte-tether': 'src/lib/index.js',
			$docs: 'src/docs'
		}
	}
};

/**
 * @returns {import('svelte/compiler').PreprocessorGroup}
 */
export function shikiPreprocess() {
	const shikiPromise = createHighlighter({
		langs: ['ts', 'svelte', 'shell'],
		themes: ['github-light', 'dark-plus']
	});

	return {
		name: 'shiki-preprocess',
		markup: async ({ content, filename }) => {
			const shiki = await shikiPromise;
			const s = new MagicString(content);

			function replace(match, language, code) {
				const start = match.index;
				const end = start + match[0].length;

				let shikiHtml = shiki.codeToHtml(code.trim(), {
					lang: language,
					themes: { light: 'github-light', dark: 'dark-plus' },
					tabindex: false
				});
				shikiHtml = shikiHtml.replaceAll(/`/gm, '\\`');
				shikiHtml = shikiHtml.replaceAll(/{/gm, '\\{');

				s.update(start, end, `{@html \`${shikiHtml}\`}`);
			}

			const inlineMatches = content.matchAll(/^\s*{`([a-z]+)(.+?)`}/gms);

			for (const match of inlineMatches) {
				const [, language, code] = match;

				replace(match, language, code);
			}

			const fileMatches = content.matchAll(/^\s*{`(\.\S+)`}/gms);
			const fileDependencies = [];

			for (const match of fileMatches) {
				const [, path] = match;

				const mentionedFilePath = nodePath.resolve(nodePath.dirname(filename), path);
				const fileContent = nodeFs.readFileSync(mentionedFilePath, { encoding: 'utf-8' });

				const mentionedFileExtension = nodePath.extname(mentionedFilePath);
				const guessedLanguage = mentionedFileExtension.slice(1);

				replace(match, guessedLanguage, fileContent);
				fileDependencies.push(mentionedFilePath);
			}

			return {
				code: s.toString(),
				map: s.generateMap(),
				dependencies: fileDependencies
			};
		}
	};
}

export default config;
