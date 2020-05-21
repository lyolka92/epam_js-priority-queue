const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);

			if (this.parentNodes[0].left
				&& this.parentNodes[0].right) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent
			&& node.priority > node.parent.priority) {
			const indexOfNode = this.parentNodes.findIndex(item => item.compare(node));
			const indexOfParentNode = this.parentNodes.findIndex(item => item.compare(node.parent));

			if (indexOfNode >= 0
				&& indexOfParentNode >= 0) {
					this.parentNodes.splice(indexOfNode, 1, node.parent);
					this.parentNodes.splice(indexOfParentNode, 1, node);
			} else if (indexOfNode >= 0
				&& indexOfParentNode < 0) {
					this.parentNodes.splice(indexOfNode, 1, node.parent);
			}

			if (this.root.compare(node.parent)) {
				this.root = node;
			}

			node.swapWithParent();

			return this.shiftNodeUp(node);
		}
	}

	pop() {
		if (this.root) {
			this.detachRoot();

		}
	}

	detachRoot() {
		if (this.root) {
			let detached = this.root,
				indexOfRoot = this.parentNodes.findIndex(item => item.compare(this.root));

			if (indexOfRoot >= 0) {
				this.parentNodes.splice(indexOfRoot, 1);
			}

			this.root = null;

			return detached;
		}
	}

	restoreRootFromLastInsertedNode(detached) {
		const lastInsertedNode = this.parentNodes[this.parentNodes.length - 1],
			lastInsertedNodeParent = lastInsertedNode.parent;

		lastInsertedNode.remove();
		this.root = lastInsertedNode;

		const leftDetachedChild = detached.left,
			rightDetachedChild = detached.right;

		if (leftDetachedChild) {
			detached.removeChild(leftDetachedChild);
			lastInsertedNode.appendChild(leftDetachedChild);
		}

		if (rightDetachedChild) {
			detached.removeChild(rightDetachedChild);
			lastInsertedNode.appendChild(rightDetachedChild);
		}

		if (rightDetachedChild) {
			const indexOfLastInsertedNode = this.parentNodes.findIndex(item => item.compare(lastInsertedNode));
			this.parentNodes.splice(indexOfLastInsertedNode, 1);

			if (lastInsertedNodeParent.left == null
				|| lastInsertedNodeParent.right == null) {
				this.parentNodes.unshift(lastInsertedNodeParent);
			}
		} else {
			this.parentNodes[0] = lastInsertedNode;
			this.parentNodes[1] = leftDetachedChild;
		}
	}

	size() {
		
	}

	isEmpty() {
		
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	shiftNodeDown(node) {
		
	}
}

module.exports = MaxHeap;
