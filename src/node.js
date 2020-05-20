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
        } else throw new Error("I don't have such child");
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (this.parent) {
            const grandParent = this.parent.parent,
                parent = this.parent,
                child = this,
                grandChildLeft = this.left,
                grandChildRight = this.right;

            let brotherRight, brotherLeft;
            if (parent.left
                && parent.left.compare(child)) {
                brotherRight = parent.right;
            } else if (parent.right
                && parent.right.compare(child)) {
                brotherLeft = parent.left;
            }

            parent.removeChild(child);

            if (brotherRight) {
                parent.removeChild(brotherRight);
            }
            if (brotherLeft) {
                parent.removeChild(brotherLeft);
            }

            if (grandChildLeft) {
                child.removeChild(grandChildLeft);
                parent.appendChild(grandChildLeft);
            }

            if (grandChildRight) {
                child.removeChild(grandChildRight);
                parent.appendChild(grandChildRight);
            }

            if (grandParent) {
                grandParent.removeChild(parent);
                grandParent.appendChild(child);
            }

            if (brotherRight) {
                child.appendChild(parent);
                child.appendChild(brotherRight);
            } else {
                if (brotherLeft) {
                    child.appendChild(brotherLeft);
                }
                child.appendChild(parent);
            }
        }
    }

    compare(node) {
        return this.data === node.data
            && this.priority === node.priority;
    }
}

module.exports = Node;
