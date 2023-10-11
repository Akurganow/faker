import User from '../src/user'

describe('faker/user', () => {
	test('should be defined', () => {
		const user = new User()
		expect(user).toBeDefined()
		expect(user).toBeInstanceOf(User)
		expect(user).toHaveProperty('getUser')
		expect(user).toHaveProperty('reset')
		expect(user).toHaveProperty('domain')
	})
	test('should return a user', () => {
		const user = new User().getUser()
		expect(user).toBeDefined()
		expect(user).toHaveProperty('firstName')
		expect(user).toHaveProperty('lastName')
		expect(user).toHaveProperty('nickname')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('fullName')
		expect(user.firstName).toBeDefined()
		expect(user.firstName).not.toBeNull()
		expect(user.firstName).not.toBe('')
		expect(user.lastName).toBeDefined()
		expect(user.lastName).not.toBeNull()
		expect(user.lastName).not.toBe('')
		expect(user.nickname).toBeDefined()
		expect(user.nickname).not.toBeNull()
		expect(user.nickname).not.toBe('')
		expect(user.email).toBeDefined()
		expect(user.email).not.toBeNull()
		expect(user.email).not.toBe('')
		expect(user.fullName).toBeDefined()
		expect(user.fullName).not.toBeNull()
		expect(user.fullName).not.toBe('')
	})
	test('should return a user with a domain', () => {
		const domain = {
			domainName: 'example.com',
			name: 'example',
			protocol: 'https',
			tld: 'com',
			full: 'https://example.com',
		}
		const instance = new User(domain)
		const user = instance.getUser()
		expect(user).toBeDefined()
		expect(user).toHaveProperty('email')
		expect(user.email).toBeDefined()
		expect(user.email).not.toBeNull()
		expect(user.email).not.toBe('')
		expect(user.email).toMatch(/@example\.com$/i)
		expect(instance.domain).toBeDefined()
		expect(instance.domain).not.toBeNull()
		expect(instance.domain).toEqual(domain)
	})
})
