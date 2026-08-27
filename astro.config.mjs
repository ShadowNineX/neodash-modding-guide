// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://neodash.shadownine.dev',
	integrations: [
		starlight({
			title: 'Neodash Modding Guide',
			description: 'Practical documentation for installing mods and understanding Neodash Unreal Engine content.',
			favicon: '/favicon.png',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/ShadowNineX/neodash-modding-guide' },
			],
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#00eaf2' } },
				{ tag: 'meta', attrs: { name: 'author', content: 'ShadowNine' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://neodash.shadownine.dev/favicon.png?v=2' } },
				{ tag: 'meta', attrs: { property: 'og:image:secure_url', content: 'https://neodash.shadownine.dev/favicon.png?v=2' } },
				{ tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '800' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '800' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'Neodash Modding Guide logo' } },
				{ tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
				{ tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://neodash.shadownine.dev/favicon.png?v=2' } },
				{ tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Neodash Modding Guide logo' } },
				{ tag: 'meta', attrs: { name: 'twitter:site', content: '@ShadowNineX' } },
			],
			customCss: ['./src/styles/neodash.css'],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Custom Server', slug: 'guides/custom-server' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
