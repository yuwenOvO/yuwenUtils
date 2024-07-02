const { ESLint } = require('eslint');

const removeIgnoredFiles = async files => {
	const eslint = new ESLint();
	const ignoredFiles = await Promise.all(files.map(file => eslint.isPathIgnored(file)));
	const filteredFiles = files.filter((_, index) => !ignoredFiles[index]);
	return filteredFiles.join(' ');
};

module.exports = {
	'*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}': async files => {
		const filesToLint = await removeIgnoredFiles(files);
		return [`eslint ${filesToLint} --max-warnings 0 --fix`, 'pretty-quick --staged'];
	},
	'*.{vue,css,less,scss}': ['stylelint --fix --allow-empty-input', 'pretty-quick --staged'],
	'*.md': ['pretty-quick --staged'],
};
