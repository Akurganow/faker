import { faker } from '@faker-js/faker'
import MockDomain from './domain'
import type { BaseMock } from './types'
import type { MockDomainItem } from './domain'

export interface MockUserClass extends BaseMock {
	getUser(): MockUserItem
	readonly domain: MockDomainItem
}
export interface MockUserItem {
	nickname: string
	email: string
	firstName: string
	lastName: string
	fullName: string
}
export default class MockUser implements MockUserClass {
	private user: MockUserItem
	public readonly domain: MockDomainItem

	constructor(domain?: MockDomainItem) {
		this.domain = domain ?? new MockDomain().getDomain()
		this.user = this.createUser()
	}

	private createUser(): MockUserItem {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()

		return {
			firstName,
			lastName,
			nickname: faker.internet.userName({ firstName, lastName }),
			email: faker.internet.email({ firstName, lastName, provider: this.domain.domainName }),
			fullName: `${firstName} ${lastName}`,
		}
	}

	public getUser(): MockUserItem {
		return this.user
	}
	public reset() {
		this.user = this.createUser()
	}
}
