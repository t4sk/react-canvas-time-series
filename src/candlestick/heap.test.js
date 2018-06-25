import Heap from './heap'
import {rand} from './test-util'

describe("min heap", () => {
  test("insert", () => {
    const heap = new Heap([], -1)
    const arr = genRandomArray(100)
    for (let i = 0; i < arr.length; i++) {
      heap.push(arr[i])
    }

    const min = Math.min(...arr)
    heap.push(min - 1)
    expect(heap.peek()).toEqual(min - 1)
  })

  test("pop", () => {
    const arr = genRandomArray(100)
    const heap = new Heap(arr, -1)

    arr.sort((a, b) => a - b)

    expect(heap.pop()).toEqual(arr[0])
    expect(heap.peek()).toEqual(arr[1])
  })

  test("peek", () => {
    const arr = genRandomArray(100)
    const heap = new Heap(arr, -1)

    expect(heap.peek()).toEqual(Math.min(...arr))
  })
})

describe("max heap", () => {
  test("insert", () => {
    const heap = new Heap([])
    const arr = genRandomArray(100)
    for (let i = 0; i < arr.length; i++) {
      heap.push(arr[i])
    }

    const max = Math.max(...arr)
    heap.push(max + 1)
    expect(heap.peek()).toEqual(max + 1)
  })

  test("pop", () => {
    const arr = genRandomArray(100)
    const heap = new Heap(arr)

    arr.sort((a, b) => b - a)

    expect(heap.pop()).toEqual(arr[0])
    expect(heap.peek()).toEqual(arr[1])
  })

  test("peek", () => {
    const arr = genRandomArray(100)
    const heap = new Heap(arr)

    expect(heap.peek()).toEqual(Math.max(...arr))
  })
})

function genRandomArray(n) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr.push(rand(-100, 100))
  }

  return arr
}
