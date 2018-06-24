function fromArray(arr, sort = 1) {

}

function bubbleUp(arr, val, sort = 1) {
  arr.push(val)

  let i = arr.length
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

function bubbleDown(arr, sort = 1) {
}

class Heap {
  constructor(arr = [], sort = 1) {
    this.sort = sort
    this.heap = fromArray(arr, sort)
  }

  insert(val) {

  }

  getRoot() {

  }

  pop() {

  }
}
