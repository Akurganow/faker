// import { faker } from '@faker-js/faker'
import Bookmarks from '../src/bookmarks'

// https://developer.chrome.com/docs/extensions/reference/bookmarks/
describe('faker/bookmarks', () => {
	test('should be defined', () => {
		const bookmarks = new Bookmarks()

		expect(bookmarks).toBeDefined()
		expect(bookmarks).toBeInstanceOf(Bookmarks)
		expect(bookmarks).toHaveProperty('getBookmarks')
		expect(bookmarks).toHaveProperty('getItem')
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
})
