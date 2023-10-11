import { faker } from '@faker-js/faker'
import Downloads from '../src/downloads'

// https://developer.chrome.com/docs/extensions/reference/downloads/
describe('faker/downloads', () => {
	test('should be defined', () => {
		const downloads = new Downloads()

		expect(downloads).toBeDefined()
		expect(downloads).toBeInstanceOf(Downloads)
		expect(downloads).toHaveProperty('getDownloads')
		expect(downloads).toHaveProperty('getItem')
		expect(downloads).toHaveProperty('reset')
	})
	test('should return an array', () => {
		const downloads = new Downloads().getDownloads()

		expect(downloads).toBeDefined()
		expect(downloads).toBeInstanceOf(Array)
	})
	test('should return a download item', () => {
		const download = new Downloads().getItem()

		expect(download).toBeDefined()
		expect(download).toHaveProperty('id')
		expect(download).toHaveProperty('mime')
		expect(download).toHaveProperty('state')
		expect(download).toHaveProperty('referrer')
		expect(download).toHaveProperty('url')
		expect(download).toHaveProperty('finalUrl')
		expect(download).toHaveProperty('filename')
		expect(download).toHaveProperty('fileSize')
		expect(download).toHaveProperty('danger')
		expect(download).toHaveProperty('bytesReceived')
		expect(download).toHaveProperty('totalBytes')
		expect(download).toHaveProperty('startTime')
		expect(download).toHaveProperty('estimatedEndTime')
		expect(download).toHaveProperty('endTime')
		expect(download).toHaveProperty('canResume')
		expect(download).toHaveProperty('exists')
		expect(download).toHaveProperty('incognito')
		expect(download).toHaveProperty('paused')
	})

	describe('time', () => {
		describe('startTime', () => {
			test('startTime should be ISO string', () => {
				const item = new Downloads().getItem()
				expect(new Date(item.startTime).toISOString()).toBe(item.startTime)
			})
			test('startTime should be greater than year ago', () => {
				const item = new Downloads().getItem()
				expect(new Date(item.startTime).getTime()).toBeGreaterThan(new Date().getTime() - 1000 * 60 * 60 * 24 * 365)
			})
			test('startTime should be greater to query.startedAfter', () => {
				const now = new Date().getTime()
				const startedAfter = faker.date.between({
					from: now - 1000 * 60 * 60 * 24 * 365,
					to: now - 1000 * 60,
				}).toISOString()
				const item = new Downloads({ startedAfter }).getItem()

				expect(new Date(item.startTime).getTime()).toBeGreaterThan(new Date(startedAfter).getTime())
			})
			test('startTime should be less than query.startedBefore', () => {
				const startedBefore = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
				}).toISOString()
				const item = new Downloads({ startedBefore }).getItem()

				expect(new Date(item.startTime).getTime()).toBeLessThan(new Date(startedBefore).getTime())
			})
			test('startTime should be equal to query.startTime', () => {
				const startTime = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
				}).toISOString()
				const item = new Downloads({ startTime }).getItem()

				expect(new Date(item.startTime).getTime()).toEqual(new Date(startTime).getTime())
			})
			test('startTime should be greater than query.endedAfter', () => {
				const endedAfter = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
				}).toISOString()
				const item = new Downloads({ endedAfter }).getItem()

				expect(new Date(item.startTime).getTime()).toBeGreaterThan(new Date(endedAfter).getTime())
			})
			test('startTime should be less than query.endedBefore', () => {
				const endedBefore = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
				}).toISOString()
				const item = new Downloads({ endedBefore }).getItem()

				expect(new Date(item.startTime).getTime()).toBeLessThan(new Date(endedBefore).getTime())
			})
		})

		describe('estimatedEndTime', () => {
			test('estimatedEndTime should be ISO string', () => {
				const item = new Downloads({ state: 'in_progress' }).getItem()
				expect(new Date(item.estimatedEndTime as string).toISOString()).toBe(item.estimatedEndTime)
			})
			test('estimatedEndTime should be greater than startTime', () => {
				const item = new Downloads({ state: 'in_progress' }).getItem()
				expect(new Date(item.estimatedEndTime as string).getTime()).toBeGreaterThan(new Date(item.startTime).getTime())
			})
			test('estimatedEndTime should be undefined when query.endedBefore', () => {
				const item = new Downloads({
					endedBefore: new Date().toISOString(),
				}).getItem()

				expect(item.estimatedEndTime).toBeUndefined()
			})
			test('estimatedEndTime should be undefined when query.endedAfter', () => {
				const item = new Downloads({
					endedAfter: new Date().toISOString(),
				}).getItem()

				expect(item.estimatedEndTime).toBeUndefined()
			})
			test('estimatedEndTime should be undefined when query.endTime', () => {
				const item = new Downloads({
					endTime: new Date().toISOString(),
				}).getItem()

				expect(item.estimatedEndTime).toBeUndefined()
			})
			test('estimatedEndTime should be undefined when query.state === "complete"', () => {
				const item = new Downloads({
					state: 'complete',
				}).getItem()

				expect(item.estimatedEndTime).toBeUndefined()
			})
		})

		describe('endTime', () => {
			test('endTime should be defined only when state === "complete"', () => {
				const item1 = new Downloads({ state: 'in_progress' }).getItem()
				expect(item1.endTime).toBeUndefined()
				const item2 = new Downloads({ state: 'interrupted' }).getItem()
				expect(item2.endTime).toBeUndefined()
				const item3 = new Downloads({ state: 'complete' }).getItem()
				expect(item3.endTime).toBeDefined()
			})
			test('endTime should be ISO string', () => {
				const item = new Downloads({ state: 'complete', endTime: new Date().toISOString() }).getItem()

				expect(new Date(item.endTime as string).toISOString()).toBe(item.endTime)
			})
			test('endTime should be greater than startTime', () => {
				const item = new Downloads({ state: 'complete' }).getItem()
				expect(new Date(item.endTime as string).getTime()).toBeGreaterThan(new Date(item.startTime).getTime())
			})
			test('endTime should be greater than query.startTime', () => {
				const startTime = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000,
				}).toISOString()
				const item = new Downloads({ state: 'complete', startTime }).getItem()

				expect(new Date(item.endTime as string).getTime()).toBeGreaterThan(new Date(startTime).getTime())
			})
			test('endTime should be undefined when state === "in_progress"', () => {
				const item = new Downloads({ state: 'in_progress' }).getItem()

				expect(item.endTime).toBeUndefined()
			})
			test('endTime should be less than query.endedBefore', () => {
				const endedBefore = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000,
				}).toISOString()
				const item = new Downloads({ state: 'complete', endedBefore }).getItem()

				expect(new Date(item.endTime as string).getTime()).toBeLessThan(new Date(endedBefore).getTime())
			})
			test('endTime should be greater than query.endedAfter', () => {
				const endedAfter = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000,
				}).toISOString()
				const item = new Downloads({ state: 'complete', endedAfter }).getItem()

				expect(new Date(item.endTime as string).getTime()).toBeGreaterThan(new Date(endedAfter).getTime())
			})
			test('endTime should be equal to query.endTime', () => {
				const endTime = faker.date.between({
					from: new Date().getTime() - 1000 * 60 * 60 * 24 * 365,
					to: new Date().getTime() - 1000,
				}).toISOString()
				const item = new Downloads({ state: 'complete', endTime }).getItem()

				expect(new Date(item.endTime as string).getTime()).toEqual(new Date(endTime).getTime())
			})
		})
	})

	describe('url', () => {
		test('url should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.url).toBeDefined()
		})
		test('url should be string', () => {
			const item = new Downloads().getItem()
			expect(typeof item.url).toBe('string')
		})
		test('url should be valid url', () => {
			const item = new Downloads().getItem()
			expect(item.url).toMatch(/^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(:[0-9]+)?(\/.*)?$/i)
		})
		test('url should be equal to query.url', () => {
			const url = faker.internet.url()
			const item = new Downloads({ url }).getItem()
			expect(item.url).toBe(url)
		})
	})

	describe('finalUrl', () => {
		test('finalUrl should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.finalUrl).toBeDefined()
		})
		test('finalUrl should be string', () => {
			const item = new Downloads().getItem()
			expect(typeof item.finalUrl).toBe('string')
		})
		test('finalUrl should be valid url', () => {
			const item = new Downloads().getItem()
			expect(item.finalUrl).toMatch(/^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(:[0-9]+)?(\/.*)?$/i)
		})
	})

	describe('referrer', () => {
		test('referrer should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.referrer).toBeDefined()
		})
		test('referrer should be string', () => {
			const item = new Downloads().getItem()
			expect(typeof item.referrer).toBe('string')
		})
		test('referrer should be valid url', () => {
			const item = new Downloads().getItem()
			expect(item.referrer).toMatch(/^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(:[0-9]+)?(\/.*)?$/i)
		})
	})

	describe('state = "in_progress"', () => {
		test('state should be "in_progress"', () => {
			const item = new Downloads({ state: 'in_progress' }).getItem()
			expect(item.state).toBe('in_progress')
		})
		test('endTime should be undefined', () => {
			const item = new Downloads({ state: 'in_progress' }).getItem()
			expect(item.endTime).toBeUndefined()
		})
		test('estimatedEndTime should be defined', () => {
			const item = new Downloads({ state: 'in_progress' }).getItem()
			expect(item.estimatedEndTime).toBeDefined()
		})
	})

	describe('state = "interrupted"', () => {
		test('state should be "interrupted"', () => {
			const item = new Downloads({ state: 'interrupted' }).getItem()
			expect(item.state).toBe('interrupted')
		})
		test('endTime should be undefined', () => {
			const item = new Downloads({ state: 'interrupted' }).getItem()
			expect(item.endTime).toBeUndefined()
		})
		test('estimatedEndTime should be undefined', () => {
			const item = new Downloads({ state: 'interrupted' }).getItem()
			expect(item.estimatedEndTime).toBeUndefined()
		})
		test('error should be defined', () => {
			const item = new Downloads({ state: 'interrupted' }).getItem()
			expect(item.error).toBeDefined()
		})
	})

	describe('state = "complete"', () => {
		test('state should be "complete"', () => {
			const item = new Downloads({ state: 'complete' }).getItem()
			expect(item.state).toBe('complete')
		})
		test('endTime should be defined', () => {
			const item = new Downloads({ state: 'complete' }).getItem()
			expect(item.endTime).toBeDefined()
		})
		test('estimatedEndTime should be undefined', () => {
			const item = new Downloads({ state: 'complete' }).getItem()
			expect(item.estimatedEndTime).toBeUndefined()
		})
		test('bytesReceived should be equal to fileSize', () => {
			const item = new Downloads({ state: 'complete' }).getItem()
			expect(item.bytesReceived).toBeDefined()
			expect(item.bytesReceived).toEqual(item.fileSize)
		})
	})

	describe('fileSize', () => {
		test('fileSize should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.fileSize).toBeDefined()
		})
		test('fileSize should be greater than 0', () => {
			const item = new Downloads().getItem()
			expect(item.fileSize).toBeGreaterThan(0)
		})
		test('fileSize should be equal to query.fileSize', () => {
			const fileSize = faker.number.int({ min: 1, max: 100000000 })
			const item = new Downloads({ fileSize }).getItem()
			expect(item.fileSize).toEqual(fileSize)
		})
		test('fileSize should be greater than bytesReceived if state === "in_progress"', () => {
			const item = new Downloads({ state: 'in_progress' }).getItem()
			expect(item.fileSize).toBeGreaterThan(item.bytesReceived)
		})
	})

	describe('bytesReceived', () => {
		test('bytesReceived should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.bytesReceived).toBeDefined()
		})
		test('bytesReceived should be greater than 0', () => {
			const item = new Downloads().getItem()
			expect(item.bytesReceived).toBeGreaterThan(0)
		})
		test('bytesReceived should be equal to query.bytesReceived', () => {
			const bytesReceived = faker.number.int({ min: 1, max: 100000000 })
			const item = new Downloads({ bytesReceived }).getItem()
			expect(item.bytesReceived).toEqual(bytesReceived)
		})
		test('bytesReceived should be less than or equal to fileSize', () => {
			const item = new Downloads().getItem()
			expect(item.bytesReceived).toBeLessThanOrEqual(item.fileSize)
		})
		test('bytesReceived should be less than query.totalBytes', () => {
			const totalBytes = faker.number.int({ min: 1, max: 100000000 })
			const item = new Downloads({ totalBytes }).getItem()
			expect(item.bytesReceived).toBeLessThanOrEqual(totalBytes)
		})
		test('bytesReceived should be less than or equal to fileSize if state === "complete"', () => {
			const item = new Downloads({ state: 'complete' }).getItem()
			expect(item.bytesReceived).toBeLessThanOrEqual(item.fileSize)
		})
		test('bytesReceived should be less than fileSize if state === "in_progress"', () => {
			const item = new Downloads({ state: 'in_progress' }).getItem()
			expect(item.bytesReceived).toBeLessThan(item.fileSize)
		})
	})

	describe('totalBytes', () => {
		test('totalBytes should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.totalBytes).toBeDefined()
		})
		test('totalBytes should be greater than 0', () => {
			const item = new Downloads().getItem()
			expect(item.totalBytes).toBeGreaterThan(0)
		})
		test('totalBytes should be greater than or equal to fileSize', () => {
			const item = new Downloads().getItem()
			expect(item.totalBytes).toBeGreaterThanOrEqual(item.fileSize)
		})
		test('totalBytes should be equal to query.totalBytes', () => {
			const totalBytes = faker.number.int({ min: 1, max: 100000000 })
			const item = new Downloads({ totalBytes }).getItem()
			expect(item.totalBytes).toEqual(totalBytes)
		})
	})

	describe('danger', () => {
		test('danger should be defined', () => {
			const item = new Downloads().getItem()
			expect(item.danger).toBeDefined()
		})
		test('danger should be string', () => {
			const item = new Downloads().getItem()
			expect(typeof item.danger).toBe('string')
		})
		test('danger should be equal to query.danger', () => {
			const danger = faker.helpers.arrayElement([
				'file',
				'may_be_dangerous',
				'dangerous',
				'uncommon',
				'hosted',
				'potentially_unwanted',
				'safe',
			])
			const item = new Downloads({ danger }).getItem()
			expect(item.danger).toEqual(danger)
		})
	})
})
