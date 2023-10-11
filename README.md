# faker
A set of classes for moching known data types such as browser history, browser download list, person, domain name, Jira project, GitHub repository, etc.

## Installation

Install the library using npm:

```bash
npm install @plq/faker
```

## Usage

### `Domain`

Generates an object with random protocol, domain name and TLD.
It's using for generating [History](#history), [Project](#project), [Repository](#repository), [Tracker](#tracker) and [User](#user).

```typescript
import { Domain } from '@plq/faker'

const domain = new Domain()

console.log(domain.getDomain())
/* Output: {
    protocol: 'https', // Random protocol
    name: 'close-reality', // Random domain name
    tld: 'name', // Random TLD
    domainName: 'close-reality.name',
    full: 'https://close-reality.name',
} */
```

Or you can generate a domain with predefined data:

```typescript
new Domain('https://github.com') // Nothing random
new Domain('npmjs.com') // Random protocol
new Domain('development') // Random protocol and TLD
```

### `Downloads`
Generates an array of random download items.
See [chrome.downloads.DownloadItem](https://developer.chrome.com/docs/extensions/reference/downloads/#type-DownloadItem).

```typescript
import { Downloads } from '@plq/faker'

const downloads = new Downloads()

console.log(downloads.getDownloads()) // Returns an array of download items
console.log(downloads.getItem()) // Returns a single download item
```

With predefined data, class accepts an object with type of [downloads.DownloadQuery](https://developer.chrome.com/docs/extensions/reference/downloads/https://developer.chrome.com/docs/extensions/reference/downloads/#type-DownloadQuery):

```typescript
new Downloads({
    url: 'https://downloads.info', // All download items will have the same domain
    limit: 100, // Number of download items
    startedAfter: new Date('2023-01-01').getTime(), // All items will be created with startTime after 2023-01-01
    startedBefore: new Date('2023-01-31').getTime(), // All items will be created with startTime before 2023-01-31
    ...
}) 
```

### `History`
Generates an array of random history items.
See [chrome.history.HistoryItem](https://developer.chrome.com/docs/extensions/reference/history/#type-HistoryItem).

```typescript
import { History } from '@plq/faker'

const history = new History()

console.log(history.getHistory()) // Returns an array of history items
console.log(history.getItem()) // Returns a single history item
```

With predefined data, class accepts an object with type of [history.search.query](https://developer.chrome.com/docs/extensions/reference/history/#type-search-query):

```typescript
new History({
    text: 'https://github.com', // All history items will have the same domain
    maxResults: 100, // Number of history items
    startTime: new Date('2023-01-01').getTime(), // All items will be created with lastVisitTime after 2023-01-01
    endTime: new Date('2023-01-31').getTime(), // All items will be created with lastVisitTime before 2023-01-31
}) 
```

### `Project`
Generates an object with random project name.

```typescript
import { Project } from '@plq/faker'

const project = new Project()

console.log(project.getProject())
/* Output: {
    name: 'Zieme, Hauck and McClure'
	shortName: 'Zieme'
	abbreviation: 'ZHM'
} */
```

### `Repository`
Generates an object with random GitHub or Gitlab repository data.

```typescript
import { Repository } from '@plq/faker'

const repository = new Repository()

console.log(repository.getRepository())
/* Output: {
    provider: 'github' | 'gitlab', // Random or predefined
	user: 'Nettie_Zboncak40', // Random user nickname
	project: 'zieme', // Random project shortName
	url: https://${provider}.${project}.${tld}, // Random url
} */
```

Repository constructor params:
- user?: MockUserItem,
- project?: MockProjectItem,
- domain?: MockDomainItem

```typescript
new Repository({
    user: new User().getUser(),
    project: new Project().getProject(),
    domain: new Domain().getDomain(),
})
```

### `Tracker`
Generates an object with random Jira or Youtrack tracker data.

```typescript
import { Tracker } from '@plq/faker'

const tracker = new Tracker()

console.log(tracker.getTracker())
/*
Output: {
    provider: 'jira' | 'youtrack', // Random or predefined
	user: 'Nettie_Zboncak40', // Random user nickname
	project: 'zieme', // Random project shortName
	url: `https://${provider}.${tld}/${user}/${project}`, // Random url
	path: `${user}/${project}`
}
*/
```

Tracker constructor params:
- user?: MockUserItem,
- project?: MockProjectItem,
- domain?: MockDomainItem

```typescript
new Tracker({
    user: new User().getUser(),
    project: new Project().getProject(),
    domain: new Domain().getDomain(),
})
```

### `User`
Generates an object with random user data.

```typescript
import { User } from '@plq/faker'

const user = new User()

console.log(user.getUser())
/* Output: {
    nickname: 'Helene_Muller11'
	email: 'Helene_Muller11@fakerjs.dev'
	firstName: 'Helene'
	lastName: 'Muller'
	fullName: 'Helene Muller'
} */
```

User constructor params:
- domain?: MockDomainItem

```typescript
new User({
    domain: new Domain().getDomain(), // Using for email generation
})
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please submit an issue or a pull request on the [GitHub repository](https://github.com/Akurganow/faker).

## License

This library is distributed under the MIT License. See the [LICENSE](https://github.com/Akurganow/faker/blob/main/LICENSE) file for more information.

## Bug Reports

If you encounter any bugs or issues, please report them on the [issue tracker](https://github.com/Akurganow/faker/issues).
