module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.ts'],
			},
			alias: {
				map: [
					['@modules', './src/modules'],
					['@common', './src/common'],
				],
				extensions: ['.ts'],
			},
		},
	},
};
