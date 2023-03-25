---
title: Algorithm Review Notes - Network Flow
date: 2018-11-25 22:41:58
tags:
- Course
- Algorithm
categories: Notes
---

# Network Flow [ref](http://pisces.ck.tp.edu.tw/~peng/index.php?action=showfile&file=f3cec71910d4a0106624e839f2891b17198ef58be)
## Limiation of Network Flow
- Capacity Law(Constraints)
	- O <= f(e) <= c(e)
- Conservation Law
	- flow in = flow out
	- sum(f(e in to v)) = sum(f(e out of v))

## Max-flow
Given a flow network G, find a flow f from s to t of the maximum possible value.

### Residual Graph G<sub>f</sub>
- Forward Edges
- Backward Edges

Network: G = (V, E) and flow f
Residual capacity: c<sub>f</sub>(e) = c(e) - f(e)
Residual Graph: G<sub>f</sub>(V, E<sub>f</sub>), where E<sub>f</sub> = **{e| f(e) < c(e)}**_(forward edge)_ ∪ **{e<sup>R</sup>| f(e) > 0}**_(backward edge)_

#### Augmenting Path 增广路径
Path in the G<sub>f</sub>

Bottleneck(P, f): the smallest capacity in G<sub>f</sub> on any edge of P.

### Cuts [check](http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/NetFlow/max-flow-min-cut.html)
#### Cuts Capacity
cap(A, B) = sum of c(e out of A)

### Min Cut
- Minimum cut = the cut in the network that has the smallest possible capacity
- Minimum cut capacity = the capacity of the minimum cut

#### Cuts and Flow
- **|f| = sum of (flow-out of A) - sum of (flow-in of A)** = **sum of f(e out of source)**
- Maximum flow  ≤  capacity of any cut
- **Maximum flow  =  Capacity of the min. cut of the network**

#### Max-flow, Min-cut theorem
**Value of Maxi-flow =  Capacity of the min-cut**
- the construct yields a cut: S ∈ X, T ∉ X, there is T ∈ Y
- For each forward edge e in the cut C: f(e) = c(e)
- For each backward edge e in the cut C: f(e) = 0

### Ford-Fulkerson Algorithm
- Given(G, s, t, c) _[Graph, source S, sink T, capacity]_
- Start with |f| = 0, f(e) = 0, _[set the start flow]_
- Find an augmenting path, _[by using **dfs**]_
- Augment flow along this path
- Repeat until no an s-t path in the G<sub>f</sub>, _[by proving of min cuts, repeat times will exceed the edge number due to residual graph]_

#### Runtime Complexity
- Total number of iterations: |f|
- Each augmentation increases value of flow by at least 1
- Running iterations: O(E + V)
- Total runtime: __O(|f|*(E + V))__, *__pseudo-polynomial__, input size: |f|*

### Edmonds-Karp Algorithm
By using *BFS* instead of *DFS*, Find an *shortest* augmenting path

#### Runtime Complexity
O(V*E<sup>2</sup>), _polynomial_

### Capacity-Scaling Algoritm
- **The bottleneck capacity if an augmenting path is the minmum residual capacity of any edge in the path**
- Choosing augmenting path with highest bottleneck capacity

#### Runtime Complexity
O(E<sup>2</sup> &#13266;|f|), _weakly-polynomial, because the input size is &#13266;|f|_

## Network Flow Problems - S-T Flow 源匯流
- Bipartite Graph (translation problem)
- Rook Attack
- Edge Disjoint Paths (_do not share any edge, but ok with same vertex_)
- Edge Disjoint Paths in Undirected Graphs
- Vertex Disjoint Paths (_do not share any vertex, edge either of casuse_)
- Image Segmentation (_to find the maximum, by using whole minus the min-cut_)

## Circulation with Demands - Flow 循環流
Circulation (_having s-t flow as well as t-s flow, used in **supply and demand**_, to find a feasible) _[[ref1]](http://www.csie.ntnu.edu.tw/~u91029/Flow2.html#Supply%20/%20Demand)[[ref2]](https://www.youtube.com/watch?v=UtSrgTsKUfU) [[ref3]](https://www.youtube.com/watch?v=ZBFL_Bd5w_k)_
- total supply(positive on the node) = total demand(negative on the node)
- capacity constraint (0 <= flow <= cap)
- demand constraint ( flow in - flow out = node demand)

#### Steps:
- Remove demands (By adding s-t)
- Calculate using FF
- replace demans (By removing s-t)

### Circulation with Demands and lower Bounds
Want to force flow have flow between two given nodes, need to change the Capacity Constraint with that lower bound, to find a feasible _[[ref4]](https://www.youtube.com/watch?v=GXx-j06OtWg)_: 
- Capacity Constraint: **l(e)** <= f(e) <= c(e)

#### Steps:
- Remove Lower bound [lower, upper], by changing the each node demands
	- L(v) = f<sub>0</sub><sup>in</sup>(v) - f<sub>0</sub><sup>out</sup>(v) = sum(l(e to v)) - sum(l(e out to v))
	- compute L(node)
	![](https://i.imgur.com/RZoX4VQ.png)
- Remove demands (By adding s-t)
- Calculate using FF
- replace demands (By removing s-t)

# Reference
- slides