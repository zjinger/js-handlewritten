"use strict";
exports.__esModule = true;
exports.bubblingSort = void 0;
/**
 *
 * 冒泡排序算法
 * 复杂度O(N^2)
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
function bubblingSort(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var tempValue = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tempValue;
            }
        }
    }
    return array;
}
exports.bubblingSort = bubblingSort;
var arr = [7, 4, 3, 2, 1];
var newArr = bubblingSort(arr);
console.log(newArr);
