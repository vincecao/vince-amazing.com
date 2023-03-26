---
title: Algorithm Review Notes - Approximation Algorithms
date: 2018-11-26 22:35:52
tags:
- Course
- Algorithm
categories: Notes
---

# Approximation algorithm
An algorithm that returns near-optimal solutions is called an approximation algorithm

## a-approximation algorithm
Let Opt(I) is the optimal solution, Alg(I) is the result of a approximation algorithm. 
- For Minimization Problem, **Alg(I) ≤ a*Opt(I)**, for some a > 1, Alg(I) will be between Opt and a\*Opt.
- For Maximization Problem, **Alg(I) ≥ a*Opt(I)**, for some 0 < a < 1, Alg(I) will be between Opt and a\*Opt.

# Graph Coloring
**Greedy Approximation**
- Find the verices with the highest degree
- Color the first vertex with color 1
- Color every vertex that not adjacent to it with color 1
- Remove all colored vertices from the list
- Repeat

# Vertex Cover
To find the smallests set of vertex in V

**Greedy 2-Approximation**
- If there is a edge
- Find two vertices in the finded arbitrary edge, as (u, v)
- Vertex Cover Unit the (u, v), #adding the two vertices in the cover set.
- Remove every edges that connect with u or v
- Repeat until there is no edge
- (keep looking the single edge and make it seprated from the original G)

**Proof**
- Alg(I) = 2 * Maximal matching on G
- Matching ≤ Opt(I)
- Alg(I) ≤ 2 * Opt(I)

# Traveling Salesman Problem
**Greedy 2-Approximation**
- Find a MST of G
- Greate a cycle by doubling edges
- Remove double visited edges

**Proof**
Alg(I) ≤ 2 * |MST| ≤ 2 * Opt(I)

**Christofides Alg - 3/2-Approximation**
Only add edges between the odd degree vertices, skip the even degree vertices.

## General TSP
...

# Set Covering Problem
**Greedy ln(n)-Approximation**
- Find the subset S<sub>k</sub> covers the most elements
- Update the already covered set
- Add S<sub>k</sub> into the Final Result set
- Repeat until there is no uncovered set

# Load Balancing
**Greedy 2-Approximation**
Assign job j to machine i whose load L<sub>i</sub> is smallest - O(nlogn)

# Reference
- Slides