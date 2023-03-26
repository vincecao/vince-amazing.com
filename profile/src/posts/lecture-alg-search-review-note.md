---
title: Algorithm Review Notes - Search Methods
date: 2018-10-04 10:58:52
tags:
- Course
- Algorithm
categories: Notes
---

# Uninformed / Blind
- **Completeness**: Guarantee to find a solution.
- **Optimality**: Guarantee to find a least cost path.
- b - max branching factor
- d - depth of the least-cost solution
- m - max depth of the state-space(may infinity).

### DFS (Depth First Search)

#### Completeness:
- Yes, for graph search version(check visited status) in finite space(b<sup>m</sup>). 
- For finite of m, DFS will still stuck when b is infinite.

#### Optimality:
- No, in both graph or tree.

#### Time Complexity:
- O(b<sup>m</sup>) / O(V+E)

#### Space Complexity:
- O(b*m)

### BFS (Breadth First Search)

#### Completeness:
- Yes, when b finite

#### Optimality:
- Yes, when constant step cost

#### Time Complexity:
- O(b<sup>d</sup>) / O(V+E)

#### Space Complexity:
- Same as Time Complexity

### UCS (Uniform Cost Search): BFS Enhanced with lowest path costs first 

Only test from start to goal _(Dijkstra, no goal state unitl all nodes are removed to get shortest paths to all nodes.)_

#### Completeness:
- Yes, when steps have non-zero costs

#### Optimality:
- Yes, for non-decrease path cost

#### Time Complexity:
- O(b<sup>1+&#8970;C<sup>*</sup>/ &#892; &#8971;</sup>), will be greater than O(b<sup>d</sup>), C<sup>*</sup> is cost of optimial solution & every action costs at least &#892;.

#### Space Complexity:
- Same as Time Complexity

### Depth limited

#### Completeness:
- Yes when cutoff appropriately

#### Optimality:
- No.

#### Time Complexity:
- O(b<sup>l</sup>), _(l for depth cutoff)_

#### Space Complexity:
- O(b*l), _(l for depth cutoff)_

### IDS or IDDFS (Iterative Deepening Search / Iterative Deepening Depth First Search)

Combine DFS and BFS

#### Completeness:
- Yes, if l >= d.

#### Optimality:
- Yes, when constant step(1) cost _(like BFS)_

#### Time Complexity:
- O(b<sup>d</sup>) _(like BFS)_

#### Space Complexity:
- O(b*d)

### Backward Search
### Bidirectional Search

Both search from forward and backwards._(Problem: must be an efficient way to check the given node belongs to same tree)_

Need a hash table, T for comparsion is O(1)

#### Completeness:
- Yes.

#### Optimality:
- Yes.

#### Time Complexity:
- 2*O(b<sup>d/2</sup>) = O(b<sup>d/2</sup>)

#### Space Complexity:
- O(b<sup>m/2</sup>)

## Comparison
- BFS: Completeness, will not stuck only wait long.
- DFS: Space, but will stuck and non-complete.
- IDS: Same as BFS but advanced in Space.
- Graph Search vs Tree Search: Graph search has a explored_set to check visited node avoid stuck.

# Informed / Heuristic

### Greedy Best First Search

#### Estimation Function
- h(n) = estimate of cost from n to goal

#### Completeness:
- No, will stuck in loop.

#### Optimality:
- No.

#### Time Complexity:
- Worse: O(b<sup>m</sup>)

#### Space Complexity:
- Same as Time Complexity

### A<sup>*</sup> Search (A Star Search)
- Faster time less space. 
- Admissible Heursitics, _(never over estimated)_.
- Heursitics Consistent - nondecreasing along every path. 
- **Admissible Heursitics can be Inconsistent, Consistent Heursitics must Admissible.**

#### Estimation Function
- f(n) = g(n) + h(n), g(n): estimated cost, h(n): estimated cost on path.
- _UCS: f(n) = g(n), when h(n) = 0, same as UCS / UCS is a special case of A Star_

#### Completeness:
- Yes, if no infinite nodes with f(n) < G(n)

#### Optimality:
- No guarantee. 
- Yes, if admissible in Tree Search / consistent in Graph Search, if no infinite nodes with f(n) < G(n)

#### Time Complexity:
- Exponential
- Could be f(n) < C<sup>*</sup> (expands all nodes) / f(n) = C<sup>*</sup> (expands some nodes) / f(n) > C<sup>*</sup> (expands no nodes)

#### Space Complexity:
- Exponential

## Memory-Bounded Heuristic Search

- Iterative-deepening A<sup>*</sup> (IDA<sup>*</sup>)
- Recursive Best First Seach (RBFS)
- Simple Memory-bounded A<sup>*</sup> ((S)MA<sup>*</sup>)

# Minimax

#### Completeness:
- Yes.

#### Optimality:
- Yes.

#### Time Complexity:
- O(b<sup>m</sup>)

#### Space Complexity:
- O(b*m) or O(m)

# Reference
- slides


