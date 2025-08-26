/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
	testEnvironment: 'jest-environment-node',
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.tsx?$': ['ts-jest', {
			useESM: true,
			tsconfig: 'tsconfig.test.json',
		}],
		'^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'node_modules/(?!@faker-js/faker)',
	],
}

export default config
