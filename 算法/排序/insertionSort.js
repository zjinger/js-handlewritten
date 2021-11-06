"use strict";
exports.__esModule = true;
exports.insertionSort = void 0;
/**
 *
 * 插入排序
 * 复杂度O(N^2)
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
function insertionSort(array) {
    for (var i = 1; i < array.length; i++) {
        var pos = i;
        var temp_value = array[pos];
        while (pos > 0 && array[pos - 1] > array[pos]) {
            array[pos] = array[pos - 1];
            array[pos - 1] = temp_value;
            pos--;
        }
    }
    return array;
}
exports.insertionSort = insertionSort;
var arr = [5, 7, 4, 2, 46, 8];
var newArray = insertionSort(arr);
console.log(newArray);
