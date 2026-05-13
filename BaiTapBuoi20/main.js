// Bài 1

const numbers = [9, 8, 3, 5, 6, 2, 7, 9];

function findSecondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    if (arr.length < 2) {
        console.log("Không có số lớn thứ 2");
    }

    for (const number of arr) {
        if (number > largest) {
            secondLargest = largest;
            largest = number;
        } else if (number > secondLargest && number !== largest) {
            secondLargest = number;
        }
    }

    if (secondLargest === -Infinity) {
        console.log("Không có số lớn thứ 2");
    }

    return secondLargest;
}

// console.log(findSecondLargest(numbers));

// Bài 2

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];
const merged = [...classA, ...classB];

function mergeAndSort(arr1, arr2) {
    const merged = [...arr1, ...arr2];

    const seen = {};
    const unique = [];
    for (let i = 0; i < merged.length; i++) {
        if (!seen[merged[i]]) {
            seen[merged[i]] = true;
            unique.push(merged[i]);
        }
    }

    // QuickSort
    function quickSort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const pivot = arr[mid];

        const leftArr = [];
        const rightArr = [];

        for (let i = 0; i < arr.length; i++) {
            if (i !== mid) {
                if (arr[i] < pivot) {
                    leftArr.push(arr[i]);
                } else {
                    rightArr.push(arr[i]);
                }
            }
        }

        return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
    }

    return quickSort(unique);
}

console.log(mergeAndSort(classA, classB));
