import { createRequire } from 'module';
import { defineConfig, type DefaultTheme } from 'vitepress';

const require = createRequire(import.meta.url);
const pkg = require('@yuwena/ui/package.json');

export default defineConfig({
	lang: 'zh-CN',
	description: '前端学习笔记',

	themeConfig: {
		nav: nav(),

		sidebar: {
			'/docs/': { base: '/docs/', items: sidebarGuide() },
			'/components/': { base: '/components/', items: sidebarReference() },
			'/tools/': { base: '/tools/', items: sidebarTools() },
		},

		editLink: {
			pattern: 'https://github.com/yuwenOvO/yuwenUtils/edit/master/packages/docs/:path',
			text: '在 GitHub 上编辑此页面',
		},

		footer: {
			message: '基于 MIT 许可发布',
			copyright: `版权所有 © 2024-${new Date().getFullYear()} yuwen  <a href='https://beian.miit.gov.cn' target='_blank'>赣ICP备2023005388号-2</a>`,
		},

		docFooter: {
			prev: '上一页',
			next: '下一页',
		},

		outline: {
			label: '页面导航',
		},

		lastUpdated: {
			text: '最后更新于',
			formatOptions: {
				dateStyle: 'short',
				timeStyle: 'medium',
			},
		},

		langMenuLabel: '多语言',
		returnToTopLabel: '回到顶部',
		sidebarMenuLabel: '菜单',
		darkModeSwitchLabel: '主题',
		lightModeSwitchTitle: '切换到浅色模式',
		darkModeSwitchTitle: '切换到深色模式',
	},
});

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: '文档',
			link: '/docs/introduction',
			activeMatch: '/docs/',
		},
		{
			text: '组件',
			link: '/components/button',
			activeMatch: '/components/',
		},
		{
			text: '工具文档',
			link: '/tools/docker',
			activeMatch: '/tools/',
		},
		{
			text: pkg.version,
			items: [
				{
					text: '更新日志',
					link: 'https://github.com/yuwenOvO/yuwenUtils/releases',
				},
				{
					text: '参与贡献',
					link: 'https://github.com/yuwenOvO/yuwenUtils/graphs/contributors',
				},
			],
		},
	];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: '简介',
			link: 'introduction',
		},
		{
			text: 'echarts柱状图阴影添加点击事件',
			link: 'echartsClick',
		},
		{
			text: '百度地图异步加载',
			link: 'baiduMapAsync',
		},
	];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'button组件',
			link: 'button',
		},
		{
			text: 'radio组件',
			link: 'radio',
		},
	];
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
	return [
		{
			text: 'docker安装和使用',
			link: 'docker',
		},
		{
			text: 'minio安装和使用',
			link: 'minio',
		},
		{
			text: 'nvm安装和使用',
			link: 'nvm',
		},
		{
			text: 'Nginx安装和使用',
			link: 'nginx',
		},
	];
}
