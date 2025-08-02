// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	// Base JS rules
	eslint.configs.recommended,

	// TypeScript rules
	...tseslint.configs.recommended,

	// Project-specific configuration
	{
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			// Preserve existing formatting rules
			'no-tabs': 'off',
			'block-spacing': ['error', 'always'],
			'object-curly-spacing': ['error', 'always'],
			'semi': ['error', 'never'],
			'quotes': ['error', 'single'],
			'indent': ['error', 'tab'], // Use standard indent rule for now
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-empty-object-type': 'off', // Allow empty interfaces extending other types
			'complexity': 'error',
		},
	},

	// Ignore patterns
	{
		ignores: ['lib/', 'node_modules/', 'coverage/'],
	},
);