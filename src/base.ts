import { faker } from '@faker-js/faker'

export abstract class BaseItemsMock<T extends object, Q extends object> {
	query: Q
	items: T[] = []

	protected abstract createMockItem(): T
	protected abstract createMockItems(): T[]

	constructor(query?: Q, defaultQuery: Q = {} as Q) {
		this.query = query ?? defaultQuery
	}

	public getItem(): T {
		return faker.helpers.arrayElement(this.items)
	}

	public getItems(): T[] {
		return this.items
	}

	public reset(): void {
		this.items = this.createMockItems()
	}
}

export abstract class BaseItemMock<T extends object, Q extends object> {
	query: Q
	item: T = {} as T

	protected abstract createMockItem(): T

	constructor(query?: Q, defaultQuery: Q = {} as Q) {
		this.query = query ?? defaultQuery
	}

	public getItem(): T {
		return this.item
	}

	public reset(): void {
		this.item = this.createMockItem()
	}
}

