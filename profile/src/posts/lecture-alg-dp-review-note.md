---
title: Algorithm Review Notes - Dynamic Programming
date: 2018-11-25 00:19:13
tags:
- Course
- Algorithm
categories: Notes
---

# Divide and Conquer
### Binary Search
T(n) = T(n/2) + O(1)

### MergeSort
T(n) = 2T(n/2) + O(n)

### Master Theorem
T(n) = a*T(n/b) + f(n), a >=1 , b >=1
c = &#13266;b(a) [h]

#### Case 1:(Only leaves)
- f(n) = O(n<sup>c-&#892;</sup>), then T(n) = &#952;(n<sup>2</sup>) for &#892;>0

#### Case 2:(All nodes)
- f(n) = &#952;(n<sup>c</sup>&#13266;<sup>k</sup>n), k>=0, then T(n) &#952;(n<sup>c</sup>&#13266;<sup>k+1</sup>n)

#### Case 1:(Only internal nodes)
- f(n) = &#937;(n<sup>c+&#892;</sup>), then T(n) = &#952;(f(n)) for &#892;>0

*Note: k must >= 0 and f(n) must be positive.*

# Dynamic Programming / Tabulation
### The Money Changing Problem
#### input:
- amount to change
- denominations: 1, 4 & 6

k is the first k denomiation.
x is the amount need to change.
dx is the lagest denomination in k.

#### Base:
- c[k, 0] = 0 #1row
- c[d<sub>1</sub>, x] = x #1col

#### Recurrence:
- c[k, x] = c[k-1, x] _if x < d<sub>x</sub>_
- c[k, x] = min(1 + c[k, x-d<sub>x</sub>], c[k-1, x])

**Time:** O(n, m)

### 0-1 Knapsack Problem / unbreakable
#### input:
w is the item weight, k is the first k denomiation, v is the item biggest value in k, 

#### Base:
- opt[k, w] = 0, if k = 0 or w = 0

#### Recurrence:
- opt[k, w] = opt[k-1, w], _can not take, if w < d<sub>w</sub>_
- opt[k, w] = max(v + opt[k-1, w-d<sub>w</sub>], opt[k-1, w])

**Time:** O(n*W)

### Longest Common Subsequence / unbreakable
#### input:
i, j is number of order letter in two sequence

#### Base:
- LCS[i, 0] = LCS[0, j] = 0

#### Recurrence:
- LCS[i, j] = 1 + LCS[i-1, j-1], if S[i] = T[j]
- LCS[i, j] = max(LCS[i-1, j], LCS[i, j-1]), if S[i] != T[j]

**Time:** O(n*m)

_Only half table is needed but that way we can not reconstruct the solution._

# Minimum Spanning Tree

### Kruskal's Algorithm

1. Sort edge with weights - O(E&#215;&#13266;E)
2. Choose all minimum weight edges
3. Grow the forest / repeat cycle detection for each edge - O(V)

**Time:** O(V&#215;E + E&#215;&#13266;E)

### Prim's Algorithm

Build a tree one vertex at a time.

1. Start with a arbitrary vertex
2. Expand vertex checking the minimum weight dege
3. Update distances from adjacent vertices
4. Grow the tree

#### Maintaining a array of vertices - Better for dense graph
findMin/deleteMin - O(V) * V times
update - O(1) * E times
Total = O(V<sup>2</sup> + E)

#### Maintaining a binary heap of vertices - Better for spare graph（Facebook）
deleteMin - O(&#13266;V) * V times
update(decreaseKey) - O(&#13266;V) * E times
Total = O(V&#13266;V + E&#13266;V)

#### Maintaining a Fibonacci heap of vertices
deleteMin - O(&#13266;V) * V times
update(decreaseKey) - O(1) * E times
Total = O(V&#13266;V + E)

# Shortest Path Problem - SSSP (Single Source Shortest Path)
### Dijkstra Greedy Algorithm
Not work when having **negative cycle**.

#### Time of Dijkstra same as Prim, but algorithm is different:

- Dijkstra for get minimum path cost from source to all other
- Prim for get the MST
- Dijkstra you can go from the selected node to any other with the minimum cost, you don't get this with Prim's _[source](https://stackoverflow.com/questions/13794948/what-is-the-difference-between-dijkstra-and-prims-algorithm)_
- UCS is only stop at when reach the goal status, similar with the Dijkstra.

Maintaining a array of vertices: Total = O(V<sup>2</sup> + E) -> O(V<sup>2</sup>)
Maintaining a binary heap(PQ - Priority Queues) of vertices: Total = O(V&#13266;V + E&#13266;V) -> O(E&#13266;V)
_LAZIEST_| Maintaining a Fibonacci heap: **Total = O(V&#13266;V + E)**

### SSSP in DAG - Directed Acyclic Graph
1. Topological -> linear
2. Check edge -> linear


# All-pairs Shortest Path Problem
### Bellman-Ford - Dynamic Way

- Case 1: Path uses at most k-1 edges: D[v, k] = D[v, k-1]
- Case 2: Path uses at most k edges: D[v, k] = min(D[w, k-1] + c(wv))

```
for k = 1 ...V -1 do //detect negative change to 1 to V
	for each v in V
		for each edge(w, v) in E
			D[v, k] = min(D[v, k-1], c(w,v) + D[w, k-1])
```

#### Detect Negative Cycle:
- Do not stop after V-1 iteration. If anything changes, there is negative.

**Time: O(VE * V) / Time: O(VE) in SSSP**

### Floyd-Warshall Algorithm - Dynamic Way

```
for k = 1 ...V do
	for i = 1 ... V do
		for j = 1 ... V do
		D[i, j, j] = min(D[i, j, k-1], D[i, k, k-1], D[k, j, k-1]) 
		//p[i, j] for extract the shortest path, p[i,j] = 0, its the edge(i, j), on diagonal
		//check negative cycle.
```

#### Detect Negative Cycle:
- Check diagonal in table, if have negative then have find the negative cycyle.

**Time: O(V<sup>3</sup>)**
Space: O(V<sup>2</sup>)

## Comparision in ALL-PAIRS SSP
Floyd-Warshall: O(V<sup>3</sup>)
Bellman-Ford: O(VE * V)
Dijikstra(Fibonacci): O(V(V&#13266;V + E))

- FW is same BF for running, but implement is easy
- Dijikstra is fater but not work in negative.

# Reference
- slides