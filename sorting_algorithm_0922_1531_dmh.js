// 代码生成时间: 2025-09-22 15:31:35
// Bubble Sort
/**
 * Bubble Sort
 * @param {Array} array - The array to sort.
 * @returns {Array} - The sorted array.
 */
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) {
        // Swap elements
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return array;
}

// Insertion Sort
/**
 * Insertion Sort
 * @param {Array} array - The array to sort.
 * @returns {Array} - The sorted array.
 */
function insertionSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }

  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    let j = i - 1;

    // Move elements that are greater than the current element
    while (j >= 0 && array[j] > current) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = current;
  }

  return array;
}

// Selection Sort
/**
 * Selection Sort
 * @param {Array} array - The array to sort.
 * @returns {Array} - The sorted array.
 */
function selectionSort(array) {
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array.');
  }

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap elements
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
}

// Export sorting functions
module.exports = {
  bubbleSort,
  insertionSort,
  selectionSort
};