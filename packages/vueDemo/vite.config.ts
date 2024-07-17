import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';

import ViteCompressionPlugin from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

console.log(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		VueDevTools(),
		ViteCompressionPlugin({
			threshold: 1024, // 只压缩大于 1KB 的文件
			algorithm: 'gzip', // 使用 gzip 算法
			ext: '.gz', // 压缩文件的扩展名
		}),
		visualizer({
			open: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
