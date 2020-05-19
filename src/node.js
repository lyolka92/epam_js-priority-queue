class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left
			&& this.left.compare(node)) {
				this.left = null;
				node.parent = null;
		} else if (this.right
			&& this.right.compare(node)) {
				this.right = null;
				node.parent = null;
		}  else throw new Error("I don't have such child");
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {

		}
	}

	compare(node) {
		return this.data === node.data
			&& this.priority === node.priority;
	}
}

module.exports = Node;
