---
title: Algorithm Review Notes - Linear Programming
date: 2018-11-26 10:43:20
tags:
- Course
- Algorithm
categories: Notes
---

# Fundamental Theorem
- The solution of LP problem must occur at a vertex or corner point, of the feasible set S associated with the problem
- IIf the objective function P is optimized at two adjacent vertices of S, then it is optimized at every point on the line segment joining these vertices, infinitely many solutions to the problem.

# Exitence of Solution
Given a feasible set S and objective function P, 
1. **If S is bounded**, LP has an optimal solution, P has a max
2. **If S is unbounded**, may or may not be the LP solution
3. **If S is empty set**, then LP has no solution: infeasible

# (Maximization) Standard LP Form
- **max(c<sub>1</sub>x<sub>1</sub> + ... + c<sub>n</sub>x<sub>n</sub>)**
- a<sub>11</sub>x<sub>1</sub> + ... + c<sub>1n</sub>x<sub>n</sub> ≤ b<sub>1</sub>
- ...
- a<sub>m1</sub>x<sub>1</sub> + ... + c<sub>mn</sub>x<sub>n</sub> ≤ b<sub>1</sub>
- x<sub>1</sub> ≥ 0, ..., x<sub>n</sub> ≥ 0

# (Maximization) Standard LP in Matrix Form
- column vector c = (c<sub>1</sub>, ..., c<sub>n</sub>)
- column vector x = (x<sub>1</sub>, ..., x<sub>n</sub>)
- size of A is n*m, right hand side b = (b<sub>1</sub>, ..., b<sub>m</sub>)
- **max(c<sup>T</sup> * x)**
- A*x ≤ b
- x ≥ 0

# Linear Programming
## Max-Flow
- **max(Σf<sub>in-t</ct>)** _#all edge flow to the target(sink)_
- 0 ≤ each edge (u, v) ≤ weight(edge)
- Conservation law: flow-in = flow-out for each vertex

## Shortest Path
d<sub>a</sub> means the cost for start point to node a.
- **max(d<sub>t</sub>)**, since d<sub>t</sub> ≤ d<sub>u</sub> + c(u-t) always happen
- d<sub>1</sub> ≤ d<sub>s</sub> + c(s-1), d<sub>1</sub> ≤ d<sub>2</sub> + c(2-1)... 
- d<sub>s</sub> = , d<sub>1</sub>, ..., d<sub>n</sub>, d<sub>t</sub> ≥ 0

When calculate max(d<sub>t</sub>), we can get d<sub>1</sub>, ..., d<sub>n</sub>, the shorest path from s to v is <sub>v</sub>

## 0-1 Knapsack Problem (Integer Linear Programming problem)
1...n weight w<sub>1</sub>, w<sub>2</sub>, ..., w<sub>n</sub>, value v<sub>1</sub>, v<sub>2</sub>, ..., v<sub>n</sub>, Knapsack cap = W
- **max(Σ<sub>k = 1...n</sub>v<sub>k</sub> * x<sub>k</sub>)**, _x<sub>k</sub> could be 0, or 1_
- 0 ≤ Σ<sub>k = 1...n</sub>w<sub>k</sub> * x<sub>k</sub> ≤ W
- x<sub>k</sub> is in {0, 1}
- k = 1, ..., n

# Integer Linear Programming problem (ILP)
ILP is NP-Hard

Independent Set ≤<sub>p</sub> ILP

# Dual LP
To every linear program, there is a dual linear program

### Duality
- The dual of the standard maximum problem change to standard minimum problem, is important for the nonlinear LP
- Transform max(c<sub>1</sub>x<sub>1</sub> + ... + c<sub>n</sub>x<sub>n</sub>) to min(b<sub>1</sub>y<sub>1</sub> + ... + b<sub>m</sub>y<sub>m</sub>)

![](https://i.imgur.com/cm7DkT1.png)
[source](https://lucatrevisan.wordpress.com/2011/01/24/cs261-lecture-6-duality-in-linear-programming/)

![](https://i.imgur.com/qpKDf18.jpg)

### Weak duality
- **opt(primal) ≤ opt(dual)**
- If x is a feasible solution for P and y is a feasible solution for D, then c<sup>T</sup> * x ≤ b<sup>T</sup> * y
- If a standard problem and its dual are both feasible, then both are feasible bounded (F. B.), **P, D feasible -> P, D feasible bounded**
- If one problem has an unbounded solution, then the dual of that problem is infeasible, **P unbounded -> D infeasible**

**Proof**
c<sup>T</sup> * x = x<sup>T</sup> * c ≤ x<sup>T</sup>(A<sup>T</sup> * y) = (A * x)<sup>T</sup> * y ≤ b<sup>T</sup> * y

### Strong duality
- **opt(primal) = opt(dual)**
- If x is a feasible solution for P and y is a feasible solution for D, then c<sup>T</sup> * x = b<sup>T</sup> * y

1. P feasible bounded -> D feasible bounded
2. P infeasible -> D feasible unbounded
3. P feasible unbounded -> D infeasible
4. P infeasible -> D infeasible
5. Otherwise is false

### Dual equality form
Ax = b:
- Ax ≤ b
- -Ax ≤ -b

### Dual relationships
![](https://i.imgur.com/cuYFVTD.png)
[source](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjltOWF7_LeAhWkqlQKHVQRAygQjB16BAgBEAQ&url=https%3A%2F%2Fwww.chegg.com%2Fhomework-help%2Fquestions-and-answers%2Fwrite-dual-following-primal-lp-use-table-rules-relationship-signs-variables-primal-dual-pr-q11750015&psig=AOvVaw0Z1il-lKZhB49LkhoJLuAH&ust=1543349008087456)

# NonLinear Optimization
Using Lagrange Multipliers

# Reference
- slides