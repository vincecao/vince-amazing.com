---
title: Tree Review
date: 2019-06-08 10:27:24
tags:
- Java
- Algorithm
categories: Notes
---

> A 'tree' is a widely used abstract data type (ADT)

_[Tree Data Structure](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm)_
> A tree is a __nonlinear data structure__, compared to arrays, linked lists, stacks and queues which are __linear data structures__. A tree can be empty with no nodes or a tree is a structure consisting of one node called the root and zero or one or more subtrees. A tree has following general properties:
> - One node is distinguished as a root;
> - Every node (exclude a root) is connected by a directed edge from exactly one other node; A direction is: parent -> children
>
> Each node can have __arbitrary__ number of children. Nodes with no children are called leaves, or __external nodes__. Nodes, which are not leaves, are called __internal nodes__. Internal nodes have at least one child.

> Nodes with the same parent are called __siblings__.
> The __depth of a node__ is the number of edges from the root to the node.
> The __height of a node__ is the number of edges from the node to the _deepest_ leaf. The __height of a tree__ is a height of a root.

# A General Tree
A tree where each node may have zero or more children.
``` java
public class TNode {
    private Object  data;
    private MyLinkedList siblings;
    private TNode myLeftChild;
    public TNode(Object n){data=n; siblings=NULL;myLeftChild=NULL;}
}
```

# Binary Trees
A binary tree is a specialized case of a general tree. A tree where each node can have no more than two children

## Full binary tree.
Each node has exactly zero or two children

## Complete binary tree
Complete filled

![](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1_files/image010.jpg)

## Binary Search Trees
Given a binary tree, have an __ordered sequence__ for recursively visit each node. A “balanced” binary search tree can be searched in __O(log n)__ time. Using In-Order traversal will get a sorted sequence.

_[Operations on Binary Search Tree’s](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_2.htm)_
> A BST is a binary tree of nodes ordered in the following way:
> 
> - Each node contains one key (also unique)
> - __The keys in the left subtree are < (less) than the key in its parent node__
> - __The keys in the right subtree > (greater) than the key in its parent node__
> - Duplicate node keys are not allowed.

![](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_2_files/image001.gif)

> A binary search tree(BST) with this worst-case structure(inserting an ordered) is __no more efficient than__ a regular linked list. Need to be as balanced as possible.

### BST OPERATIONS

#### Inserting a node
``` java
Insert(N, T) = N   if T is empty
             = insert(N, T.left)  if  N < T
             = insert(N, T.right) if  N > T
```

#### Searching for a node
Similar with Insert
``` java
Search(N, T) =  false   if T is empty
             =  true    if T = N
             = search(N, T.left) if N < T
             = search(N, T.right) if N > T
```

#### Deleting a node
- _[Operations on Binary Search Tree’s](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_2.htm)_
- _[Advanced BST Operations](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_3.htm)_

- Case 1 : The node to delete is a leaf node, just delete
- Case 2 : The node to delete is a node with one child.
    - If node be deleted is a __left child of the parent__. Connect the leaf with left pointer with the parent
    - If node be deleted is a __right child of the parent__. Connect the leaf with right pointer with the parent
    - _(node.left != null, make a parent node point to a left child;) and vice versa_
- Case 3: The node to delete is a node with two children
    - we find the largest node in the left sub tree (15) or smallest node in the right sub tree (45) and replace the root with that node
    - Do Case 1 or Case 2 with replaced node.
![](https://i.imgur.com/zyVf8LZ.png)


## (BST)Traversing Trees
_[Advanced BST Operations](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_3.htm)_

![](https://www.geeksforgeeks.org/wp-content/uploads/2009/06/tree12.gif)

### Depth First Traversals:
![](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_3_files/image001.gif)

- __In-Order__, 中序遍历 (__Left, Root, Right__) : 4 2 5 1 3, Inorder traversal is always symmetrical, 对称的.
- __Pre-Order__, 前序遍历 (__Root, Left, Right__) : 1 2 4 5 3
- __Post-Order__, 后序遍历 (__Left, Right, Root__) : 4 5 2 3 1

#### In-Order example
``` java
private void inorder(Node root){
    if (root != null) {
        inorder(root.leftChild);
        // visit root;
        inorder(root.rightChild);
    }
}
```

### Breadth First or Level Order Traversal
__Level Order Traversal__ : 1 2 3 4 5
> We can implement the level-order traversal using the API's _LinkedList_ class.

### Iterator API for Traversing Trees
> - boolean `hasNext()` - Returns true if the iteration has more elements.
> - Object `next()` - Returns the next element in the iteration.
> - void `remove()` - (optional operation) Removes from the underlying collection the last element returned by next().

## (BST) AVL(Adelson-Velskii and Landis) Tree
[AVL Tree | Set 1 (Insertion)](https://www.geeksforgeeks.org/avl-tree-set-1-insertion/)

> Differences between heights of any left and right subtrees for every node is less than or equal to 1.

For remains O(Logn) and keep the BST be as balanced as possible. __Make sure the height of the tree remains O(Logn) after every insertion and deletion__. So keep rotate until reach AVL tree or maintain an “almost” balanced tree.

> No longer used in practice

## (BST) Red-black Tree
- [Red Black Tree vs AVL Tree](https://www.geeksforgeeks.org/red-black-tree-vs-avl-tree/)
- [教你透彻了解红黑树](https://github.com/julycoding/The-Art-Of-Programming-By-July/blob/master/ebook/zh/03.01.md)
- [【数据结构和算法05】 红-黑树（看完包懂~）](https://blog.csdn.net/eson_15/article/details/51144079)
- [Left-Leaning Red-Black Trees](http://www.cs.princeton.edu/~rs/talks/LLRB/RedBlack.pdf)
A self-balancing binary search tree.

### Rules

> - Red or Black
> - When Tree is modified, new tree is subsequently rearranged and repainted.
> - It requires 1 bit of color information for each node in tree.

> Maintained by Red Black Tree:
> - Root is always black.
> - All 树尾端(NIL) NULL leaves are black, both children of red node are black.
> - Every simple path from a given node to any of its descendant leaves contains the same number of black nodes. **对于任一结点而言，其到叶结点树尾端NIL指针的每一条路径都包含相同数目的黑结点.**
> - Path form root to farthest leaf is no more than twice as long as path from root to nearest leaf.
![](https://raw.githubusercontent.com/julycoding/The-Art-Of-Programming-By-July/master/ebook/images/rbtree/1.png)

## (BST)Splay Trees

# Reference
- [树的遍历](https://zh.wikipedia.org/wiki/树的遍历)
- [Tree Traversals (Inorder, Preorder and Postorder)](https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/)
- [Tree (data structure)](https://en.wikipedia.org/wiki/Tree_(data_structure))
- [Tree Data Structure](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_1.htm)
- [Operations on Binary Search Tree’s](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_2.htm)
- [Advanced BST Operations](http://www.cs.cmu.edu/~clo/www/CMU/DataStructures/Lessons/lesson4_3.htm)
