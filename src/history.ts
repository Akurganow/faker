import { faker } from '@faker-js/faker'
import MockDomain from './domain'
import MockUser from './user'
import MockProject from './project'
import MockRepository from './repository'
import MockTracker from './tracker'
import type { MockDomainItem } from './domain'
import type { MockUserItem } from './user'
import type { MockProjectItem } from './project'
import type { MockRepositoryItem } from './repository'
import type { MockTrackerItem } from './tracker'
import type { BaseMock } from './types'

export interface MockHistoryClass extends BaseMock {
	getItems(): MockHistoryItem[]
	getItem(): MockHistoryItem
}
export interface MockHistoryQuery extends chrome.history.HistoryQuery {}
export interface MockHistoryItem extends chrome.history.HistoryItem {}

type HistoryVariables = Record<string, string>

export default class MockHistory implements MockHistoryClass {
	public readonly query?: MockHistoryQuery
	private readonly domain: MockDomainItem
	private readonly user: MockUserItem
	private readonly project: MockProjectItem
	private readonly repository: MockRepositoryItem
	private readonly tracker: MockTrackerItem
	private variables: HistoryVariables
	private history: MockHistoryItem[]

	private templates = {
		default: [
			['{{url}}/{{fakePath}}', '{{lorem.sentence}} - {{fakePath}}']
		],
		google: [
			['https://www.google.com/search?q={{search}}', '{{search}} - Google Search'],
			['https://www.google.com/search?q={{search}}', '{{search}} - Google Search'],
		],
		reddit: [
			['https://www.reddit.com/r/{{sub}}', '{{title}} : {{sub}}'],
			['https://www.reddit.com/r/{{sub}}', '{{title}} : {{sub}}'],
		],
		'web.dev': [
			['https://web.dev/{{sub}}', '{{title}} - {{sub}}'],
			['https://web.dev/{{sub}}', '{{title}} - {{sub}}'],
		],
	}

	constructor(query?: MockHistoryQuery) {
		this.query = query
		this.domain = new MockDomain(this.query?.text).getItem()
		this.user = new MockUser(this.domain).getItem()
		this.project = new MockProject(this.domain).getItem()
		this.repository = new MockRepository(this.user, this.project, this.domain).getItem()
		this.tracker = new MockTracker(this.user, this.project, this.domain).getItem()
		this.variables = this.createVariables()
		this.history = this.createMockHistory()
	}

	private createVariables() {
		return {
			url: this.domain.full,
			fakePath: `${faker.lorem.word()}/${faker.lorem.word()}/${faker.lorem.word()}`,
			search: faker.lorem.sentence(),
			sub: faker.lorem.word(),
			title: faker.lorem.sentence(),
		}
	}

	private getHistoryTemplates(): string[][] {
		const text = this.query?.text
		const foundKey = Object.keys(this.templates).find(key => text?.includes(key))

		return text
			? foundKey
				? this.templates[foundKey as keyof typeof this.templates]
				: this.templates.default
			: this.templates.default
	}

	private getTemplates(): string[] {
		const repositoryTemplates = this.repository.isSupported
			? this.repository.templates
			: null
		const trackerTemplates = this.tracker.isSupported
			? this.tracker.templates
			: null
		const finalTemplates = repositoryTemplates || trackerTemplates || this.getHistoryTemplates()

		return faker.helpers.arrayElement(finalTemplates)
	}

	private getTitle(): string {
		const [, titleTemplate] = this.getTemplates()

		return faker.helpers.mustache(titleTemplate, this.variables)
	}

	private getUrl(): string {
		const [urlTemplate] = this.getTemplates()

		return faker.helpers.mustache(urlTemplate, this.variables)
	}

	private createMockHistoryItem(): MockHistoryItem {
		const title = this.getTitle()
		const url = this.getUrl()
		const from = this.query?.startTime
			? new Date(this.query.startTime)
			: faker.date.recent()
		const to = this.query?.endTime
			? new Date(this.query.endTime)
			: new Date()

		return {
			id: faker.string.nanoid(),
			title,
			url,
			lastVisitTime: faker.date.between({ from, to, }).getTime(),
			visitCount: faker.number.int(9999),
			typedCount: faker.number.int(9999),
		}
	}

	private createMockHistory(): MockHistoryItem[] {
		return faker.helpers.multiple(
			() => this.createMockHistoryItem(),
			{ count: this.query?.maxResults ?? 10 }
		)
	}

	public getItems(): MockHistoryItem[] {
		return this.history
	}

	public getItem(): MockHistoryItem {
		return faker.helpers.arrayElement(this.history)
	}

	public reset() {
		this.variables = this.createVariables()
		this.history = this.createMockHistory()
	}
}
