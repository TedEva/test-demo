/**
 * 有潜在问题的排序算法实现
 * 这个文件包含了几个常见的编程错误和潜在问题
 */

/**
 * 冒泡排序 - 包含边界问题
 * 问题：可能会访问数组越界
 */
export function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  
  // 问题1: 循环条件可能导致越界访问
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {  // 应该是 j < n - i - 1
      // 问题2: 没有检查 j+1 是否越界
      if (arr[j] > arr[j + 1]) {
        // 交换元素
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  
  return arr;
}

/**
 * 快速排序 - 包含递归深度和空数组问题
 * 问题：没有正确处理边界情况
 */
export function quickSort(arr: number[]): number[] {
  // 问题3: 缺少空数组检查
  if (arr.length <= 1) {
    return arr;
  }
  
  // 问题4: 总是选择第一个元素作为基准，对已排序数组效率低
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  // 问题5: 从索引0开始，会重复处理pivot
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  // 问题6: 可能导致栈溢出，没有尾递归优化
  return [...quickSort(left), ...quickSort(right)];
}

/**
 * 选择排序 - 包含未定义变量问题
 * 问题：变量声明和类型问题
 */
export function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    // 问题7: minIndex 可能未初始化就使用
    let minIndex;
    
    for (let j = i + 1; j < n; j++) {
      // 问题8: 第一次比较时 minIndex 是 undefined
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // 交换元素
    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  
  return arr;
}

/**
 * 归并排序 - 包含类型和逻辑问题
 * 问题：类型不匹配和边界问题
 */
export function mergeSort(arr: any): number[] {  // 问题9: 参数类型应该是 number[]
  if (arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // 问题10: 没有处理其中一个数组先耗尽的情况
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // 问题11: 缺少将剩余元素添加到结果的逻辑
  return result;
}

/**
 * 插入排序 - 包含性能问题
 * 问题：不必要的数组操作
 */
export function insertionSort(arr: number[]): number[] {
  // 问题12: 修改原数组，没有创建副本
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    
    // 问题13: 可能导致负数索引访问
    while (arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = current;
  }
  
  return arr;
}

/**
 * 测试函数 - 包含类型错误
 */
export function testSort() {
  const testArray = [64, 34, 25, 12, 22, 11, 90];
  
  // 问题14: 没有错误处理
  console.log("Original:", testArray);
  console.log("Bubble Sort:", bubbleSort(testArray));
  console.log("Quick Sort:", quickSort(testArray));
  console.log("Selection Sort:", selectionSort(testArray));
  console.log("Merge Sort:", mergeSort(testArray));
  console.log("Insertion Sort:", insertionSort(testArray));
  
  // 问题15: 传入错误类型的参数
  const wrongType: any = "not an array";
  mergeSort(wrongType);
}
