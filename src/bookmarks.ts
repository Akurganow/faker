import { faker } from '@faker-js/faker'
import { BaseMock } from './types'
import { createBalancedArray } from '@plq/array-functions'

export interface MockBookmarksClass extends BaseMock {
	getItems(): MockBookmarksItem[]
	getItem(): MockBookmarksItem
}

export interface MockBookmarksItem extends chrome.bookmarks.BookmarkTreeNode {
}

export interface MockBookmarksQuery extends chrome.bookmarks.BookmarkSearchQuery {
	limit?: number
}

const DEFAULT_LIMIT = 100

export default class MockBookmarks implements MockBookmarksClass {
	public readonly query: MockBookmarksQuery
	private bookmarks: MockBookmarksItem[] = []

	constructor(query?: MockBookmarksQuery) {
		this.query = query ?? {}
		this.bookmarks = this.createMockBookmarks()
	}

	private createMockBookmarks(): MockBookmarksItem[] {
		const limit = this.query.limit || DEFAULT_LIMIT
		const rootItemsCount = faker.number.int({ min: 1, max: limit })
		const childrenItemsCount = limit - rootItemsCount
		const minCount = Math.min(rootItemsCount, childrenItemsCount)
		const rootItemsChildrenCount = faker.helpers.shuffle(createBalancedArray(minCount, childrenItemsCount))

		return faker.helpers.multiple(
			() => this.createMockBookmarksItem(),
			{ count: rootItemsCount }
		).map((item, index) => {
			return {
				...item,
				children: item.children && rootItemsChildrenCount[index] ? faker.helpers.multiple(
					() => this.createMockBookmarksItem(item.id),
					{ count: rootItemsChildrenCount[index] }
				).map((child, index) => ({
					...child,
					index,
				})) : undefined,
			}
		})
	}

	private createMockBookmarksItem(parentId?: string): MockBookmarksItem {
		return {
			id: faker.string.uuid(),
			parentId,
			url: this.query.url || faker.internet.url(),
			title: this.query.title || faker.lorem.words(),
			dateAdded: faker.date.recent().getTime(),
			dateGroupModified: faker.date.recent().getTime(),
			children: parentId ? undefined : [],
		}
	}

	public getItems(): MockBookmarksItem[] {
		return this.bookmarks
	}

	public getItem(): MockBookmarksItem {
		return faker.helpers.arrayElement(this.bookmarks)
	}

	public reset(): void {
		this.bookmarks = this.createMockBookmarks()
	}
}
