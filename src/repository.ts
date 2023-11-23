import { faker } from '@faker-js/faker'

import { BaseSiteMock, SiteQuery } from './base-extended'

export interface MockRepositoryItem {
	provider: string
	user: string
	project: string
	url: string
	templates: string[][]
	isSupported: boolean
}

export default class MockRepository extends BaseSiteMock<MockRepositoryItem>{
	templates = {
		github: [
			['{{url}}/{{user}}/{{project}}', '{{user}}/{{project}}'],
			['{{url}}/{{fakePath}}', '{{fakePath}}'],
		],
		gitlab: [
			['{{url}}/{{user}}/{{project}}', '{{user}} / {{project}} · GitLab'],
			['{{url}}/{{fakePath}}', '{{fakePath}} · GitLab'],
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

	private supportedProvider() {
		const providers = this.providers

		return providers.find(provider => this.domain.name.includes(provider))
			?? faker.helpers.arrayElement(providers)
	}

	createMockItem(): MockRepositoryItem {
		const provider = this.supportedProvider()
		const user = this.user.nickname.toLowerCase()
		const project = this.project.shortName.toLowerCase()
		const templatesArray = this.templates[provider as keyof typeof this.templates]
		const templates = templatesArray.map(templates =>
			templates.map(template => faker.helpers.mustache(template, {
				url: this.domain.full,
				user,
				project,
				summary: faker.lorem.sentence(),
			}))
		)

		return {
			provider,
			user,
			project,
			url: this.isProviderSupported()
				? `${this.domain.full}`
				: `https://${provider}.${project}.${faker.internet.domainSuffix()}}`,
			templates,
			isSupported: this.isProviderSupported(),
		}
	}
}
