const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.counter = 0;
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

        this.counter += 1;
    }

    shiftNodeUp(node) {
        const parentNode = node.parent;

        if (!parentNode || node.priority <= parentNode.priority) {
            return;
        }

        const indexOfNode = this.parentNodes.findIndex(item => item.compare(node));
        const indexOfParentNode = this.parentNodes.findIndex(item => item.compare(parentNode));

        if (indexOfNode >= 0 && indexOfParentNode >= 0) {
            this.parentNodes.splice(indexOfNode, 1, parentNode);
            this.parentNodes.splice(indexOfParentNode, 1, node);
        } else if (indexOfNode >= 0 && indexOfParentNode < 0) {
            this.parentNodes.splice(indexOfNode, 1, parentNode);
        }

        if (this.root.compare(parentNode)) {
            this.root = node;
        }

        node.swapWithParent();

        return this.shiftNodeUp(node);
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        const detached = this.detachRoot();
        const newRoot = this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(newRoot);

        return detached ? detached.data : null;
    }

    detachRoot() {
        if (this.isEmpty()) {
            return;
        }

        const detached = this.root,
            indexOfRoot = this.parentNodes.findIndex(item => item.compare(this.root));

        if (indexOfRoot >= 0) {
            this.parentNodes.splice(indexOfRoot, 1);
        }

        this.root = null;
        this.counter -= 1;

        return detached;
    }

    restoreRootFromLastInsertedNode(detached) {
        const lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];

        if (!lastInsertedNode) {
            return;
        }

        const lastInsertedNodeParent = lastInsertedNode.parent;

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

            if (!(lastInsertedNodeParent.left && lastInsertedNodeParent.right)) {
                this.parentNodes.unshift(lastInsertedNodeParent);
            }
        } else {
            this.parentNodes[0] = lastInsertedNode;
            this.parentNodes[1] = leftDetachedChild;
        }

        return lastInsertedNode;
    }

    size() {
        return this.counter;
    }

    isEmpty() {
        return !this.root;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.counter = 0;
    }

    shiftNodeDown(node) {
        if (!node || !(node.left || node.right)) {
            return;
        }

        const indexOfNode = this.parentNodes.findIndex(item => item.compare(node));
        let shiftedNode;

        if (node.left && node.right) {
            shiftedNode = node.left.priority > node.right.priority ? node.left : node.right;
        } else if (node.left) {
            shiftedNode = node.left;
        } else shiftedNode = node.right;

        if (node.priority >= shiftedNode.priority) {
            return;
        }

        const indexOfShiftedNode = this.parentNodes.findIndex(item => item.compare(shiftedNode));

        if (indexOfNode >= 0 && indexOfShiftedNode >= 0) {
            this.parentNodes.splice(indexOfNode, 1, shiftedNode);
            this.parentNodes.splice(indexOfShiftedNode, 1, node);
        } else if (indexOfNode < 0 && indexOfShiftedNode >= 0) {
            this.parentNodes.splice(indexOfShiftedNode, 1, node);
        }

        if (this.root.compare(node)) {
            this.root = shiftedNode;
        }

        shiftedNode.swapWithParent();

        return this.shiftNodeDown(node);
    }
}

module.exports = MaxHeap;
