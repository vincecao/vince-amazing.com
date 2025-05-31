---
title: Algorithm Review Notes - Randomized Algorithms
date: 2018-11-26 23:51:51
tags:
- Course
- Algorithm
categories: Notes
---

# Deterministic vs Randomized
**Deterministic**
- T<sub>worst</sub>(n) = max<sub>|x|=n</sub> T(x)
- T<sub>best</sub>(n) = min<sub>|x|=n</sub> T(x)
  
**Randomized**
- T(n) = max<sub>|x|=n</sub> Expect\[T(x)\]
  
## Advantage
- May faster than deterministic alg
- May have smaller space complexity
- May simpler
- We can solve those question cannot designed efficient deterministic alg directly

### Probability
### Events
A subset of a sample space is called a event

**Fair die** - each have sample prob

### Indicator Ramdom Variables - {0, 1}
### Expectation
E[X] = ∑<sub>k∈Omega</sub>Pr(X = k) * X(k) #sum of possible outcomes, each weighted by its prob

**Rolling a die**
- E[X] = 1/6 * 1 + 1/6 * 2 + ... 1/6 + 6 = 3.5
- Expectation is not real data may appear in your case, Pr(X = 3.5) is wrong

### Expectation of an Indicator
E[x] = Pr(E)

### Linearity of Expectation
E[X + Y] = E[X] + E[Y]

# Quick Sort
## Deterministic Pivot
## Random Pivot
## Runtime
O(nlogn)

# Global Min-Cut problem
**Randomized**
- Ramdom pick an edge and contract
- Remove self loops
- repeat until one edge left

**Complexity**
- Edge contraction requires O(V)
- Total Time O(V<sup>2</sup>)
- To get the min-cut, we need to run O(V<sup>2</sup>)
- Final Total is O(V<sup>4</sup>)

# Las Vegas Alg
Always return the correct answer but may run for longer than you expect. E.g. Quick sort

# Monte Carlo Alg
May fail or return incorrect answer but runtime is independent of input randomness(fast). E.g. Global min-cut

# Skip Lists
A linked list of size N with k shortcuts - K <sup>k</sup>√N, when K = log<sub>2</sub>N, total search time is **O(logN)**

# Treap (Tree Heap)
Ramdomized binary search tree - A binary search tree with the heap ordering property, assign x.key and x.priority to the node by randomzied.

## Insert
- Insert 10
- generate [10, 3]
- insert to BST
- Check the priority
- rotate the order to get heap proterty, but keep the BST ordering structure 

## Delete
- Delete by following BST proporty
- Rotate by following heap proporty

## Runtime
- expected depth of any node is O(logn)
- total insertion is same **O(logn)** (On average, expectation is the depth)

# Reference
- Slides