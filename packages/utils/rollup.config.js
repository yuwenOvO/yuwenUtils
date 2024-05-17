import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
	cache: false,
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'umd',
			name: '@yuwen/utils',
			sourcemap: true,
		},
	],
	plugins: [
		nodeResolve({
			extensions: ['.js', '.ts'],
		}),
		commonjs(),
		typescript({
			tsconfig: 'tsconfig.json',
		}), // 解析TypeScript
		babel({
			babelHelpers: 'bundled',
			extensions: ['.js', '.ts'],
			include: ['src/**/*'],
		}),
	],
};
