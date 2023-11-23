import MockUser, { MockUserItem } from './user'
import MockProject, { MockProjectItem } from './project'
import MockDomain, { MockDomainItem } from './domain'
import { BaseItemMock } from './base'
import { faker } from '@faker-js/faker'

export type SiteQuery = {
	domain?: MockDomainItem
	user?: MockUserItem
	project?: MockProjectItem
}

/**
 * Class representing a base site mock.
 * @extends BaseItemMock
 */
export abstract class BaseSiteMock<T extends object> extends BaseItemMock<T, SiteQuery> {
	public readonly user: MockUserItem
	public readonly project: MockProjectItem
	public readonly domain: MockDomainItem

	/**
	 * The templates of the site.
	 */
	protected abstract readonly templates: Record<string, string[][]>

	constructor(query?: SiteQuery) {
		super(query)

		this.domain = this.query.domain ?? new MockDomain().getItem()
		this.user = this.query?.user ?? new MockUser(this.domain).getItem()
		this.project = this.query?.project ?? new MockProject(this.domain).getItem()
	}

	/**
	 * Get the available templates of the site.
	 */
	public get providers() {
		return Object.keys(this.templates)
	}
}

/**
 * Class representing a base items mock.
 * @extends BaseItemsMock
 */
export abstract class BaseItemsMock<T extends object, Q extends object> extends BaseItemMock<T, Q> {
	items: T[] = []

	/**
	 * Abstract method to create a mock item.
	 * @abstract
	 * @return The mock item
	 */
	protected abstract createMockItem(): T

	/**
	 * Abstract method to create an array of mock items.
	 * @abstract
	 * @return The array of mock items
	 */
	protected abstract createMockItems(): T[]

	/**
	 * Get a random item from the items array.
	 */
	public getItem(): T {
		return faker.helpers.arrayElement(this.items)
	}

	/**
	 * Get all items.
	 */
	public getItems(): T[] {
		return this.items
	}

	/**
	 * Reset the items array.
	 */
	public reset(): void {
		this.items = this.createMockItems()
	}
}
