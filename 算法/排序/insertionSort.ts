/**
 *
 * 插入排序
 * 复杂度O(N^2)
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
export function insertionSort(array: Array<number>): Array<number> {
    for (let i = 1; i < array.length; i++) {
        let pos = i;
        let temp_value = array[pos]
        while (pos > 0 && array[pos - 1] > array[pos]) {
            array[pos] = array[pos - 1]
            array[pos - 1] = temp_value
            pos--
        }
    }
    return array
}

const arr = [5, 7, 4, 2, 46, 8]
const newArray = insertionSort(arr)
console.log(newArray);

