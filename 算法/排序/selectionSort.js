"use strict";
exports.__esModule = true;
exports.selectionSort = void 0;
/**
 *
 * 选择排序
 * @export
 * @param {Array<number>} array
 * @return {*}  {Array<number>}
 */
function selectionSort(array) {
    for (var i = 0; i < array.length; i++) {
        var minNumIndex = i;
        for (var j = i + i; j < array.length; j++) {
            if (array[j] < array[minNumIndex]) {
                minNumIndex = j;
            }
        }
        if (minNumIndex != i) {
            var tmpValue = array[i];
            array[i] = array[minNumIndex];
            array[minNumIndex] = tmpValue;
        }
    }
    return array;
}
exports.selectionSort = selectionSort;
var array = [7, 4, 3, 2, 1];
var newArray = selectionSort(array);
console.log(newArray);
