import { History } from '../src'

describe('faker/history', () => {
	test('history', () => {
		expect(History).toBeDefined()

		const mockHistory = new History()

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "google"', () => {
		const mockHistory = new History({
			text: 'google',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "https://github.com"', () => {
		const mockHistory = new History({
			text: 'https://github.com',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "https://gitlab.com"', () => {
		const mockHistory = new History({
			text: 'https://gitlab.com',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "https://jira.atlassian.com"', () => {
		const mockHistory = new History({
			text: 'https://jira.atlassian.com',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "https://youtrack.jetbrains.com"', () => {
		const mockHistory = new History({
			text: 'https://youtrack.jetbrains.com',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "reddit.com/r/dev"', () => {
		const mockHistory = new History({
			text: 'reddit.com/r/dev',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})

	test('history for "https://web.dev"', () => {
		const mockHistory = new History({
			text: 'https://web.dev',
			maxResults: 15,
			startTime: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
		})

		expect(mockHistory).toBeDefined()
		expect(mockHistory.getHistory).toBeDefined()
	})
})
