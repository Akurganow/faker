import { faker } from '@faker-js/faker'
import MockDomain, { MockDomainItem } from './domain'
import { BaseItemMock } from './base'

export type MockProjectItem = {
	name: string
	shortName: string
	abbreviation: string
}

export default class MockProject extends BaseItemMock<MockProjectItem, MockDomainItem>{
	constructor(query?: MockDomainItem) {
		super(query, new MockDomain().getItem())

		this.reset()
	}

	createMockItem(): MockProjectItem {
		const name = this.query
			? this.query.name
				.split(/[-_]/i)
				.map((word) => word[0].toUpperCase() + word.slice(1))
				.join(' ')
			: faker.company.name()
		const split = name.split(/\W/i)
		const shortName = split[0]
		const abbreviation = split.length > 1
			? split
				.map((word) =>
					word.match(/[A-Z]/) ? word[0] : '')
				.join('')
				.toUpperCase()
			: split[0]
				.split('')
				.filter(str => !/^[aeiou]/i.test(str))
				.join('')
				.toUpperCase()

		return {
			name,
			shortName,
			abbreviation,
		}
	}

	public getItem(): MockProjectItem {
		return this.item
	}

	public reset() {
		this.item = this.createMockItem()
	}
}
