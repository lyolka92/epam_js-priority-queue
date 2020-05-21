const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap;
	}

	push(data, priority) {
		if (this.size() === this.maxSize) {
			throw new Error("The queue is full. Node isn't added.")
		} else {
			this.heap.push(data, priority);
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw new Error("There is no nodes to shift - queue is empty.")
		} else {
			return this.heap.pop();
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
