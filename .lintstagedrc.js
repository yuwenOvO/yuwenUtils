const { ESLint } = require('eslint');

const removeIgnoredFiles = async files => {
	const eslint = new ESLint();
	const ignoredFiles = await Promise.all(
		files.map(file => eslint.isPathIgnored(file)),
	);
	const filteredFiles = files.filter((_, index) => !ignoredFiles[index]);
	return filteredFiles.join(' ');
};

module.exports = {
	'*': async files => {
		const filesToLint = await removeIgnoredFiles(files);
		console.log('filesToLint:', filesToLint);
		return [`eslint ${filesToLint} --max-warnings 0 --fix`];
	},
};
