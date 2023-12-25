const { NotImplementedError } = require('../extensions/index.js');

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.top = null;
  }
  root() {
    return this === null ? undefined : this.top;
  }

  add(data) {
    let newNode = new Node(data);
    if (this.top === null) this.top = newNode;
    else this.insertNode(this.top, newNode); // helper method below
  }
  insertNode(node, newNode) {
    if (newNode.data < node.data)
      if (node.left === null) node.left = newNode;
      else this.insertNode(node.left, newNode);
    else if (node.right === null) node.right = newNode;
    else this.insertNode(node.right, newNode);
  }

  has(data, node = this.top) {
    if (!node) return false;
    if (node.data === data) {
      return true;
    }
    return node.data < data
      ? this.has(data, node.right)
      : this.has(data, node.left);
  }

  find(data, node = this.top) {
    if (node.data == data) return node;
    if (node.data < data)
      if (node.right === null) return null;
      else return this.find(data, node.right);
    else if (node.left === null) return null;
    else return this.find(data, node.left);
  }

  remove(data, node = this.root()) {
    if (!node) return null;
    if (this.has(data) == false) return null;

    if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else if (data > node.data) {
      node.right = this.remove(data, node.right);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }
      let minFromRight = node.right;
      while (minFromRight.left) minFromRight = minFromRight.left;
      node.data = minFromRight.data;
      node.right = this.remove(minFromRight.data, node.right);
      return node;
    }
  }

  min(node = this.root()) {
    if (node === null) return null;
    if (node.left === null) {
      return node.data;
    }
    return this.min(node.left);
  }

  max(node = this.root()) {
    if (node === null) return null;
    if (node.right === null) {
      return node.data;
    }
    return this.max(node.right);
  }
}

module.exports = {
  BinarySearchTree
};