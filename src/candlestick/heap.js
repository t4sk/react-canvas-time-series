function bubbleUp(arr, val, sort = 1) {
  arr.push(val)

  let i = arr.length - 1
  while (i > 0) {
    let v = arr[i]
    let parentIndex = (i - 1) / 2 >> 0
    let parent = arr[parentIndex]

    if (sort == 1) {
      if (parent >= v) {
        return
      }
    } else {
      if (parent <= v) {
        return
      }
    }

    // swap arr[i] and parent
    arr[i] = parent
    arr[parentIndex] = v

    i = parentIndex
  }
}

function heapify(arr, i, sort = 1) {
  while (true) {
    let swap = i
    let left = 2 * i
    let right = 2 * i + 1

    if (
      left < arr.length && (
        (sort == 1 && arr[left] > arr[swap]) ||
        (sort == -1 && arr[left] < arr[swap])
      )
    ) {
      swap = left
    }
    if (
      right < arr.length && (
        (sort == 1 && arr[right] > arr[swap]) ||
        (sort == -1 && arr[right] < arr[swap])
      )
    ) {
      swap = right
    }

    if (i == swap) {
      return
    }

    const parent = arr[i]
    arr[i] = arr[swap]
    arr[swap] = parent

    i = swap
  }
}

function bubbleDown(arr, sort = 1) {
  arr[0] = arr.pop()
  heapify(arr, 0, sort)
}

function buildHeap(arr = [], sort = 1) {
  for (let i = (arr.length / 2 >> 0); i >= 0; i--) {
    heapify(arr, i, sort)
  }
}

export default class Heap {
  constructor(arr = [], sort = 1) {
    this.sort = sort
    this.heap = arr.slice()
    buildHeap(this.heap, sort)
  }

  push(val) {
    bubbleUp(this.heap, val, this.sort)
  }

  pop() {
    const head = this.heap[0]

    bubbleDown(this.heap, this.sort)

    return head
  }

  peek() {
    return this.heap[0]
  }
}
