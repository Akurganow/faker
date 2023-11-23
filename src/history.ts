import { faker } from '@faker-js/faker'
import MockDomain from './domain'
import MockUser from './user'
import MockProject from './project'
import MockRepository from './repository'
import MockTracker from './tracker'
import type { MockDomainItem } from './domain'
import type { MockUserItem } from './user'
import type { MockProjectItem } from './project'

import { BaseItemsMock } from './base'
import { isEmpty } from '@plq/is'

export interface MockHistoryQuery extends chrome.history.HistoryQuery {}
export interface MockHistoryItem extends chrome.history.HistoryItem {}

type HistoryVariables = Record<string, string>

export default class MockHistory extends BaseItemsMock<MockHistoryItem, MockHistoryQuery>{
	private readonly domain: MockDomainItem
	private user?: MockUserItem
	private project?: MockProjectItem
	private variables: HistoryVariables

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
		super(query)

		const text = this.query?.text ?? faker.internet.url()

		this.domain = new MockDomain({ domain: text }).getItem()
		this.variables = this.createVariables()
		this.items = this.createMockItems()

		this.reset()
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
		this.user = this.user ?? new MockUser(this.domain).getItem()
		this.project = this.project ?? new MockProject(this.domain).getItem()

		const siteQuery = {
			domain: isEmpty(this.domain) ? undefined : this.domain,
			user: isEmpty(this.user) ? undefined : this.user,
			project: isEmpty(this.project) ? undefined : this.project,
		}

		const repository = new MockRepository(siteQuery).getItem()
		const tracker = new MockTracker(siteQuery).getItem()

		const repositoryTemplates = repository.isSupported
			? repository.templates
			: null
		const trackerTemplates = tracker.isSupported
			? tracker.templates
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

	createMockItem(): MockHistoryItem {
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

	createMockItems(): MockHistoryItem[] {
		return faker.helpers.multiple(
			() => this.createMockItem(),
			{ count: this.query?.maxResults ?? 10 }
		)
	}

	reset() {
		this.variables = this.createVariables()
		this.items = this.createMockItems()
	}
}
