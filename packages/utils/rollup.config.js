import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

const config = [
	{
		cache: false,
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/es/index.mjs',
				format: 'es',
				name: '@yuwena/utils',
				sourcemap: true,
			},
			{
				file: 'dist/umd/index.cjs',
				format: 'cjs',
				name: '@yuwena/utils',
				sourcemap: true,
			},
		],
		plugins: [
			nodeResolve({
				extensions: ['.js', '.ts'],
			}),
			typescript({
				tsconfig: './tsconfig.json',
				outputToFilesystem: false,
			}), // 解析TypeScript
			json(),
			commonjs(),
			babel({
				babelHelpers: 'bundled',
				extensions: ['.js', '.ts'],
				include: ['src/**/*'],
			}),
			terser(),
		],
	},
	{
		input: 'src/index.ts',
		output: [
			{
				file: 'dist/index.d.ts',
				format: 'es',
			},
		],
		plugins: [dts()],
	},
];

export default config;
