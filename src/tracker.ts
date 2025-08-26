import { faker } from '@faker-js/faker'

import { BaseSiteMock, SiteQuery } from './base-extended.js'

export interface MockTrackerItem {
	provider: string
	user: string
	project: string
	path: string
	url: string
	templates: string[][]
	isSupported: boolean
}

export default class MockTracker extends BaseSiteMock<MockTrackerItem>{
	templates = {
		jira: [
			['{{url}}/browse/{{abbreviation}}-{{issueId}}', '{{abbreviation}}-{{issueId}} - {{summary}} - Atlassian Jira'],
			['{{url}}/{{fakePath}}', '{{fakePath}} - Atlassian Jira'],
		],
		youtrack: [
			['{{url}}/issue/{{abbreviation}}-{{issueId}}', '{{summary}}: YouTrack'],
			['{{url}}/{{fakePath}}', '{{fakePath}}: YouTrack'],
		],
	}

	constructor(query?: SiteQuery) {
		super(query)

		this.reset()
	}

	private isProviderSupported() {
		return Boolean(this.providers
			.find(provider =>
				this.domain.name.includes(provider)
			)
		)
	}

	public supportedProvider() {
		const providers = this.providers

		return providers.find(provider => this.domain.name.includes(provider))
			?? providers[Math.floor(Math.random() * providers.length)]
	}

	createMockItem(): MockTrackerItem {
		const provider = this.supportedProvider()
		const user = this.user.nickname.toLowerCase()
		const project = this.project.shortName.toLowerCase()
		const templatesArray = this.templates[provider as keyof typeof this.templates]
		const templates = templatesArray.map(templates =>
			templates.map(template => faker.helpers.mustache(template, {
				url: this.domain.full,
				abbreviation: this.project.abbreviation,
				issueId: faker.string.numeric(5),
				summary: faker.lorem.sentence(),
			}))
		)

		return {
			provider,
			user,
			project,
			path: `${user}/${project}`,
			url: this.isProviderSupported()
				? `${this.domain.full}/${user}/${project}`
				: `https://${provider}.${faker.internet.domainSuffix()}/${user}/${project}`,
			templates,
			isSupported: this.isProviderSupported(),
		}
	}
}
