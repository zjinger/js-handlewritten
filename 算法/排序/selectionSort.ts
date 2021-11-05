
/**
 *
 * 选择排序
 * 复杂度 O(N^2)
 * 大O 记法忽略常数，严格说是 O(N^2/2)
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
export function selectionSort(array: Array<number>): Array<number> {
    for (let i = 0; i < array.length; i++) {
        let minNumIndex = i
        for (let j = i + i; j < array.length; j++) {
            if (array[j] < array[minNumIndex]) {
                minNumIndex = j
            }
        }
        if (minNumIndex != i) {
            let tmpValue = array[i]
            array[i] = array[minNumIndex]
            array[minNumIndex] = tmpValue
        }
    }
    return array
}
const array = [7, 4, 3, 2, 1]
const newArray = selectionSort(array)
console.log(newArray)
