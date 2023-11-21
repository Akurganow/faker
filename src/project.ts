import { faker } from '@faker-js/faker'
import { BaseMock } from './types'
import MockDomain, { MockDomainItem } from './domain'

export interface MockProjectClass extends BaseMock {
	getItem(): MockProjectItem
	readonly domain: MockDomainItem
}
export interface MockProjectItem {
	name: string
	shortName: string
	abbreviation: string
}

export default class MockProject implements MockProjectClass {
	private project: MockProjectItem
	public readonly domain: MockDomainItem

	constructor(domain?: MockDomainItem) {
		this.domain = domain ?? new MockDomain().getItem()
		this.project = this.createMockProject()
	}

	private createMockProject(): MockProjectItem {
		const name = this.domain
			? this.domain.name
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
		return this.project
	}

	public reset() {
		this.project = this.createMockProject()
	}
}
