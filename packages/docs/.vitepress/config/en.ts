import { createRequire } from 'module';
import { defineConfig, type DefaultTheme } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('@yuwen/ui/package.json');

export default defineConfig({
	lang: 'en-US',
	description: 'Front-end learning notes.',

	themeConfig: {
		nav: nav(),

		sidebar: {
			'/en/docs/': { base: '/en/docs/', items: sidebarGuide() },
			'/en/components/': { base: '/en/components/', items: sidebarReference() },
			'/en/tools/': { base: '/en/tools/', items: sidebarTools() },
		},

		editLink: {
			pattern: 'https://github.com/yuwenOvO/yuwenUtils/edit/master/packages/docs/:path',
			text: 'Edit this page on GitHub',
		},

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2024-present yuwen',
		},
	},
});

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: 'Docs',
			link: '/en/docs/introduction',
			activeMatch: '/en/docs/',
		},
		{
			text: 'Components',
			link: '/en/components/button',
			activeMatch: '/en/components/',
		},
		{
			text: 'toolsDocs',
			link: '/en/tools/docker',
			activeMatch: '/en/tools/',
		},
		{
			text: pkg.version,
			items: [
				{
					text: 'Changelog',
					link: 'https://github.com/yuwenOvO/yuwenUtils/releases',
				},
				{
					text: 'Contributing',
					link: 'https://github.com/yuwenOvO/yuwenUtils/graphs/contributors',
				},
			],
		},
	];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Introduction',
			link: 'introduction',
		},
		{
			text: 'echarts',
			link: 'echartsClick',
		},
		{
			text: 'BaiduMapAsync',
			link: 'baiduMapAsync',
		},
	];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Button',
			link: 'button',
		},

		{
			text: 'Radio',
			link: 'radio',
		},
	];
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'Docker install',
			link: 'docker',
		},
	];
}
