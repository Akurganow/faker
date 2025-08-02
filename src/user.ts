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

/**
 * Class representing a mock user.
 */
export default class MockUser extends BaseItemMock<MockUserItem, MockDomainItem>{
	/**
	 * Create a mock user.
	 * @param {MockDomainItem} domain - The domain of the user
	 */
	constructor(domain?: MockDomainItem) {
		super(domain, new MockDomain().getItem())

		this.reset()
	}

	/**
	 * Create a mock user item.
	 * @return {MockUserItem} The mock user item
	 */
	createMockItem(): MockUserItem {
		const firstName = faker.person.firstName()
		const lastName = faker.person.lastName()

		return {
			firstName,
			lastName,
			nickname: faker.internet.username({ firstName, lastName }),
			email: faker.internet.email({ firstName, lastName, provider: this.query.domainName }),
			fullName: `${firstName} ${lastName}`,
		}
	}
}
