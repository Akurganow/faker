import Project from '../src/project'

describe('faker/project', () => {
	test('should be defined', () => {
		const project = new Project()

		expect(project).toBeDefined()
		expect(project).toBeInstanceOf(Project)
		expect(project).toHaveProperty('getProject')
		expect(project).toHaveProperty('reset')
		expect(project).toHaveProperty('domain')
	})
	test('should return a project', () => {
		const project = new Project().getProject()
		expect(project).toHaveProperty('name')
		expect(project).toHaveProperty('shortName')
		expect(project).toHaveProperty('abbreviation')
		expect(project.name).toBeDefined()
		expect(project.name).not.toBeNull()
		expect(project.name).not.toBe('')
		expect(project.shortName).toBeDefined()
		expect(project.shortName).not.toBeNull()
		expect(project.shortName).not.toBe('')
		expect(project.abbreviation).toBeDefined()
		expect(project.abbreviation).not.toBeNull()
		expect(project.abbreviation).not.toBe('')
	})
	test('should return a project with a domain', () => {
		const domain = {
			domainName: 'example.com',
			name: 'example',
			protocol: 'https',
			tld: 'com',
			full: 'https://example.com',
		}
		const instance = new Project(domain)
		expect(instance.domain).toBeDefined()
		expect(instance.domain).not.toBeNull()
		expect(instance.domain).toEqual(domain)
	})
})
