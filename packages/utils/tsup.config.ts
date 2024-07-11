import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	sourcemap: true,
	clean: true,
	splitting: true,
	outDir: 'dist',

	dts: true,
	treeshake: true,
	minify: true,
	target: 'esnext',
	format: ['esm', 'cjs'],
});
