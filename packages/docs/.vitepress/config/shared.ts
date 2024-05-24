import { defineConfig } from 'vitepress';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock';

declare module 'vitepress' {
	export namespace DefaultTheme {
		interface Config {
			demoblock?: {
				root: Record<string, string>;
				en: Record<string, string>;
			};
		}
	}
}

export const shared = defineConfig({
	title: 'YuwenDocs',

	lastUpdated: true,
	cleanUrls: false,
	metaChunk: true,

	markdown: {
		math: true,
		codeTransformers: [
			{
				postprocess(code) {
					return code.replace(/\[\!\!code/g, '[!code');
				},
			},
		],
		config: md => {
			md.use(demoblockPlugin as any);
		},
	},

	themeConfig: {
		logo: { src: '/vitepress-logo-mini.svg', width: 24, height: 24 },
		socialLinks: [{ icon: 'github', link: 'https://github.com/yuwenOvO/yuwenUtils' }],

		search: {
			provider: 'local',
			options: {
				translations: {
					button: {
						buttonText: '搜索文档',
						buttonAriaLabel: '搜索文档',
					},
					modal: {
						noResultsText: '无法找到相关结果',
						resetButtonTitle: '清除查询条件',
						displayDetails: '显示详细列表',
						footer: {
							selectText: '选择',
							navigateText: '切换',
							closeText: '关闭',
						},
					},
				},
				locales: {
					en: {
						translations: {
							button: {
								buttonText: 'Search',
								buttonAriaLabel: 'Search',
							},
							modal: {
								noResultsText: 'No results for',
								resetButtonTitle: 'Reset search',
								displayDetails: 'Display detailed list',
								footer: {
									selectText: 'to select',
									navigateText: 'to navigate',
									closeText: 'to close',
								},
							},
						},
					},
				},
			},
		},

		demoblock: {
			root: {
				'view-source': '查看源代码',
				'hide-source': '隐藏源代码',
				'edit-in-editor': '在 Playground 中编辑',
				'edit-on-github': '在 Github 中编辑',
				'copy-code': '复制代码',
				'copy-success': '复制成功',
				'copy-error': '复制失败',
			},
			en: {
				'view-source': 'View source',
				'hide-source': 'Hide source',
				'edit-in-editor': 'Edit in Playground',
				'edit-on-github': 'Edit on GitHub',
				'copy-code': 'Copy code',
				'copy-success': 'Copy success',
				'copy-error': 'Copy error',
			},
		},
	},

	head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }]],

	vite: {
		plugins: [demoblockVitePlugin()],
	},
});
