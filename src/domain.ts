import { faker } from '@faker-js/faker'
import { BaseItemMock } from './base.js'

export interface MockDomainItem {
	protocol: string
	name: string
	tld: string
	domainName: string
	full: string
}

export type MockDomainQuery = {
	domain: string
}

export default class MockDomain extends BaseItemMock<MockDomainItem, MockDomainQuery> {
	constructor(query?: MockDomainQuery) {
		super(query, { domain: faker.internet.url() })

		this.reset()
	}

	createMockItem(): MockDomainItem {
		const protocol = this.query.domain?.match(/(https?|ftp):\/\//)?.[1] ?? faker.internet.protocol()

		let domainName = protocol ? this.query.domain?.replace(`${protocol}://`, '') : this.query.domain

		domainName = domainName?.replace(/\/$/im, '')
		const hasWWW = domainName?.match(/^www\./im)

		domainName = hasWWW ? domainName?.replace(/^www\./im, '') : domainName

		const domainNameMatch = domainName?.match(/^(.+)\.(.+)$/im)
		let name: string
		if (domainNameMatch) {
			name = domainNameMatch[1]
		} else if (domainName.length > 0) {
			name = domainName
		} else {
			name = faker.internet.domainWord()
		}
		const tld = domainNameMatch?.[2] ?? faker.internet.domainSuffix()

		return {
			protocol,
			name,
			tld,
			domainName: `${name}.${tld}`,
			full: `${protocol}://${hasWWW ? 'www.' : ''}${name}.${tld}`,
		}
	}
}
