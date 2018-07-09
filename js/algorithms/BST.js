// 搜索树
function Node(value) {
	this.value = value;
	this.right = null;
	this.left = null;
}

function Tree() {
	this.root = null;
}

Tree.prototype.insert = function(value) {
	let newNode = new Node(value);
	let current = this.root;
	let parent = null;
	if (current === null) {
		this.root = newNode;
		return newNode;
	}

	while (true) {
		parent = current;
		if (value < current.value) {
			current = current.left;
			if (current === null) {
				parent.left = newNode;
				return newNode;
			}
		} else {
			current = current.right;
			if (current === null) {
				parent.right = newNode;
				return newNode;
			}
		}
	}
}
Tree.prototype.preOrder = function(node = this.root) {
	// 先根节点
	// 左节点
	// 右节点
	if (!node) return [];
	return [node.value].concat(this.preOrder(node.left)).concat(this.preOrder(node.right));
}
Tree.prototype.midOrder = function(node = this.root) {
	if (!node) return [];
	return this.midOrder(node.left).concat(node.value).concat(this.midOrder(node.right));
}
Tree.prototype.postOrder = function(node = this.root) {
	if (!node) return [];
	return this.postOrder(node.left).concat(this.postOrder(node.right)).concat(node.value);
}
// Tree.prototype.getMIN = function(node = this.root) {
// 	if (!node) return;

// 	if (node.left) {
// 		return this.getMIN(node.left)
// 	} else {
// 		return node.value;
// 	}
// }
// Tree.prototype.getMAX = function(node = this.root) {
// 	if (!node) return;

// 	if (node.right) {
// 		return this.getMAX(node.right)
// 	} else {
// 		return node.value;
// 	}
// }
Tree.prototype.getMIN = function() {
	let current = this.root || {}
	while (current.left) {
		current = current.left;
	}
	return current.value;
}
Tree.prototype.getMAX = function() {
	let current = this.root || {}
	while (current.right) {
		current = current.right;
	}
	return current.value;
}
Tree.prototype.find = function(value, node = this.root) {
	if (!node) return null;

	if (node.value === value) return node;
	else if (value < node.value) return this.find(value, node.left);
	else return this.find(value, node.right);
}
Tree.prototype.remove = function(value, node = this.root) {

	if (!node) return null;

	if (node.value === value) {
		if (!node.left && !node.right) {
			return null;
		} else if (node.left && !node.right) {
			return node.left
		} else if (node.right && !node.left) {
			return node.right;
		} else {
			var rightMinNode = this.getMIN(node.right);
			node.value = rightMinNode.value;
			node.right = this.remove(value, node.right);
		}
	} else if (node.value > value) {
		node.left = this.remove(value, node.left);
	} else {
		node.right = this.remove(value, node.right);
	}
	return node;
}
Tree.prototype.exchange = function(node = this.root) {
	if (!node) return null;

	let tmpNode = node.left;
	node.left = node.right;
	node.right = tmpNode;
	this.exchange(node.left);
	this.exchange(node.right);
}
let tree = new Tree();
let ary = [15, 6, 18, 3, 7, 16, 20, 2, 4, 13, 17];
for (var i in ary) {
	if (ary.hasOwnProperty(i)) {
		tree.insert(ary[i])
	}
}