export default function createBalancedArray(length: number, sum: number): number[] {
	if (length <= 0) {
		return []
	}

	const isNegativeSum = sum < 0
	const absoluteSum = Math.abs(sum)
	const baseValue = Math.floor(absoluteSum / length)
	const remainder = absoluteSum % length
	const array = new Array<number>(length)

	for (let i = 0; i < length; i++) {
		array[i] = baseValue + (i < remainder ? 1 : 0)
		if (isNegativeSum) {
			array[i] *= -1

			if (Object.is(array[i], -0)) {
				array[i] = 0
			}
		}
	}

	return array
}
