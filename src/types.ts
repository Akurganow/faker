export interface BaseMock {
	getItem: () => unknown;
	getItems?: () => unknown[];
	reset(): void;
}
