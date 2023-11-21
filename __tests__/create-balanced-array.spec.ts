import createBalancedArray from '../src/utils/create-balanced-array'

describe('utils/create-balanced-array', () => {
	test('should be defined', () => {
		expect(createBalancedArray).toBeDefined()
		expect(createBalancedArray).toBeInstanceOf(Function)
	})

	test('should return an array', () => {
		expect(createBalancedArray(1, 1)).toBeInstanceOf(Array)
	})

	test('should return an array of length 1', () => {
		expect(createBalancedArray(1, 1)).toHaveLength(1)
	})

	test('should create a balanced array with correct sum', () => {
		expect(createBalancedArray(5, 10)).toEqual([2, 2, 2, 2, 2])
		expect(createBalancedArray(3, 10)).toEqual([4, 3, 3])
	})

	test('should handle negative sum', () => {
		expect(createBalancedArray(3, -5)).toEqual([-2, -2, -1])
	})

	test('should distribute remainder evenly', () => {
		const array = createBalancedArray(4, 10)
		const max = Math.max(...array)
		const min = Math.min(...array)
		expect(max - min).toBeLessThanOrEqual(1)
	})

	test('should return empty array for length 0', () => {
		expect(createBalancedArray(0, 10)).toEqual([])
	})

	test('should handle sum equal to zero', () => {
		expect(createBalancedArray(3, 0)).toEqual([0, 0, 0])
	})

	test('should handle sum less than length', () => {
		expect(createBalancedArray(5, 3)).toEqual([1, 1, 1, 0, 0])
		expect(createBalancedArray(5, -3)).toEqual([-1, -1, -1, 0, 0])
	})

	test('should work for length 1', () => {
		expect(createBalancedArray(1, 5)).toEqual([5])
		expect(createBalancedArray(1, -5)).toEqual([-5])
	})

	test('should correctly distribute small negative sums', () => {
		expect(createBalancedArray(3, -2)).toEqual([-1, -1, 0])
	})

	test('should maintain sum with large numbers', () => {
		const largeNumber = 1000000
		const largeLength = 1000
		const array = createBalancedArray(largeLength, largeNumber)
		expect(array).toHaveLength(largeLength)
		expect(array.reduce((acc, val) => acc + val, 0)).toBe(largeNumber)
	})

	test('should handle sum equal to negative length', () => {
		expect(createBalancedArray(4, -4)).toEqual([-1, -1, -1, -1])
	})

	test('should handle negative length', () => {
		expect(createBalancedArray(-4, 4)).toEqual([])
	})
})
