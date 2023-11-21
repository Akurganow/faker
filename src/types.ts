export interface BaseMock {
	getItem: () => unknown;
	getItems?: () => unknown[];
	reset(): void;
}

export type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
