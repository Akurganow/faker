/**
 * Class representing a base item mock.
 * @extends BaseItemMock
 */
export abstract class BaseItemMock<T extends object, Q extends object> {
	query: Q
	item: T = {} as T

	/**
	 * Abstract method to create a mock item.
	 * @abstract
	 */
	protected abstract createMockItem(): T

	constructor(query?: Q, defaultQuery: Q = {} as Q) {
		this.query = query ?? defaultQuery
	}

	/**
	 * Get the mock item.
	 * @return The mock item
	 */
	public getItem(): T {
		return this.item
	}

	/**
	 * Reset the item.
	 */
	public reset(): void {
		this.item = this.createMockItem()
	}
}

