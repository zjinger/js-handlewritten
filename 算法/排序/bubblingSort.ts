/**
 *
 * 冒泡排序算法
 * 复杂度O(N^2)
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
export function bubblingSort(array: Array<number>): Array<number> {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const tempValue = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = tempValue
            }
        }
    }
    return array
}
const arr: number[] = [7, 4, 3, 2, 1]
const newArr = bubblingSort(arr)
console.log(newArr);
