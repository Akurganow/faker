// import { faker } from '@faker-js/faker'
import Bookmarks from '../src/bookmarks'
import { detect } from '@plq/is'
import { faker } from '@faker-js/faker'

// https://developer.chrome.com/docs/extensions/reference/bookmarks/
describe('faker/bookmarks', () => {
	test('should be defined', () => {
		const bookmarks = new Bookmarks()

		expect(bookmarks).toBeDefined()
		expect(bookmarks).toBeInstanceOf(Bookmarks)
		expect(bookmarks).toHaveProperty('getItems')
		expect(bookmarks).toHaveProperty('getItem')
		expect(bookmarks).toHaveProperty('getRootItems')
		expect(bookmarks).toHaveProperty('getChildrenItems')
		expect(bookmarks).toHaveProperty('getRootItem')
		expect(bookmarks).toHaveProperty('getChildItem')
		expect(bookmarks).toHaveProperty('reset')
	})
	test('if bookmark has children, each child should have a parentId equals to id of the bookmark', () => {
		const bookmarks = new Bookmarks()
		const items = bookmarks.getItems()

		for (const item of items) {
			if (item.children) {
				for (const child of item.children) {
					expect(child.parentId).toBe(item.id)
				}
			}
		}
	})
	test('should return a bookmark with type of chrome.bookmarks.BookmarkTreeNode', () => {
		const bookmarks = new Bookmarks()
		const root = bookmarks.getRootItem()
		const item = faker.helpers.arrayElement(root.children)

		expect(item).toBeDefined()
		expect(item).toHaveProperty('id')
		expect(detect(item.id)).toBe('string')
		expect(item).toHaveProperty('parentId')
		expect(item.parentId).toEqual(root.id)
		expect(item).toHaveProperty('url')
		expect(item.url).toMatch(/^https?:\/\//)
		expect(item).toHaveProperty('title')
		expect(detect(item.title)).toBe('string')
		expect(item).toHaveProperty('dateAdded')
		expect(item.dateAdded).toBeLessThanOrEqual(Date.now())
		expect(item).toHaveProperty('dateGroupModified')
		expect(item.dateGroupModified).toBeLessThanOrEqual(Date.now())
	})
})
