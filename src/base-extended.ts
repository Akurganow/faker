import MockUser, { MockUserItem } from './user'
import MockProject, { MockProjectItem } from './project'
import MockDomain, { MockDomainItem } from './domain'
import { BaseItemMock } from './base'

export type SiteQuery = {
	domain?: MockDomainItem
	user?: MockUserItem
	project?: MockProjectItem
}

export abstract class BaseSiteMock<T extends object> extends BaseItemMock<T, SiteQuery> {
	public readonly user: MockUserItem
	public readonly project: MockProjectItem
	public readonly domain: MockDomainItem

	protected abstract readonly templates: Record<string, string[][]>

	constructor(query?: SiteQuery) {
		super(query)

		this.domain = this.query.domain ?? new MockDomain().getItem()
		this.user = this.query?.user ?? new MockUser(this.domain).getItem()
		this.project = this.query?.project ?? new MockProject(this.domain).getItem()
	}

	public get providers() {
		return Object.keys(this.templates)
	}
}
