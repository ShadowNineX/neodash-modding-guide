// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://neodash.shadownine.dev',
	integrations: [
		starlight({
			title: 'Neodash Modding Guide',
			favicon: '/favicon.png',
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
