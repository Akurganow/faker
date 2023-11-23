import { faker } from '@faker-js/faker'
import { WithRequired } from './types'
import { createBalancedArray } from '@plq/array-functions'
import { BaseItemsMock } from './base'

export interface MockBookmarksItem extends chrome.bookmarks.BookmarkTreeNode {}
export interface MockBookmarksQuery extends chrome.bookmarks.BookmarkSearchQuery {
	limit?: number
}

const DEFAULT_LIMIT = 100

export default class MockBookmarks extends BaseItemsMock<MockBookmarksItem, MockBookmarksQuery> {
	constructor(query?: MockBookmarksQuery) {
		super(query)

		this.reset()
	}

	createMockItems(): MockBookmarksItem[] {
		const limit = this.query.limit || DEFAULT_LIMIT
		const rootItemsCount = faker.number.int({ min: 1, max: limit })
		const childrenItemsCount = limit - rootItemsCount
		const minCount = Math.min(rootItemsCount, childrenItemsCount)
		const rootItemsChildrenCount = faker.helpers.shuffle(createBalancedArray(minCount, childrenItemsCount))

		return faker.helpers.multiple(
			() => this.createMockItem(),
			{ count: rootItemsCount }
		).map((item, index) => {
			return {
				...item,
				children: item.children && rootItemsChildrenCount[index] ? faker.helpers.multiple(
					() => this.createMockItem(item.id),
					{ count: rootItemsChildrenCount[index] }
				).map((child, index) => ({
					...child,
					index,
				})) : undefined,
			}
		})
	}

	createMockItem(parentId?: string): MockBookmarksItem {
		return {
			id: faker.string.uuid(),
			parentId,
			url: parentId ? this.query.url || faker.internet.url() : undefined,
			title: this.query.title || faker.lorem.words(),
			dateAdded: faker.date.recent().getTime(),
			dateGroupModified: faker.date.recent().getTime(),
			children: parentId ? undefined : [],
		}
	}

	public getRootItem(): WithRequired<MockBookmarksItem, 'children'> {
		return faker.helpers.arrayElement(
			this.items.filter(
				item => item.children && item.children.length > 0
			) as WithRequired<MockBookmarksItem, 'children'>[]
		)
	}
}
