/* eslint-disable no-undef */
/*
 * 这个脚本检查用户是否使用 pnpm 来安装包。
 */
const fs = require('fs');
const path = require('path');

if (!/pnpm/.test(process.env.npm_execpath || '')) {
	console.warn(
		`\u001b[33m✨ 请使用 pnpm 来安装包，以确保依赖正确安装😃😃😃\u001b[39m\n\n`,
	);

	// 删除 package-lock.json 文件
	const packageLockPath = path.resolve(__dirname, '../package-lock.json');
	if (fs.existsSync(packageLockPath)) {
		fs.unlinkSync(packageLockPath);
	}

	process.exit(1);
}
