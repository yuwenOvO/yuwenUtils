module.exports = {
	plugins: ['stylelint-prettier'],
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order', 'stylelint-prettier/recommended'],
	rules: {
		'prettier/prettier': true,
	},
	customSyntax: 'postcss-scss',
	overrides: [
		{
			files: ['**/*.{vue,html}'],
			customSyntax: 'postcss-html',
		},
	],
};
