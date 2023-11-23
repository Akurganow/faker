import { faker } from '@faker-js/faker'
import MockDomain from './domain'
import type { MockDomainItem } from './domain'
import { BaseItemMock } from './base'

export interface MockUserItem {
	nickname: string
	email: string
	firstName: string
	lastName: string
	fullName: string
}

export default class MockUser extends BaseItemMock<MockUserItem, MockDomainItem>{
	constructor(domain?: MockDomainItem) {
		super(domain, new MockDomain().getItem())

		this.reset()
	}

	createMockItem(): MockUserItem {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()

		return {
			firstName,
			lastName,
			nickname: faker.internet.userName({ firstName, lastName }),
			email: faker.internet.email({ firstName, lastName, provider: this.query.domainName }),
			fullName: `${firstName} ${lastName}`,
		}
	}
}
