---
title: Algorithm Review Notes - NP Problem
date: 2018-11-26 00:21:39
tags:
- Course
- Algorithm
categories: Notes
---

# NP Hardness
## Church-Turing Thesis
- Any natural/reasonable notion of computation can be simulated by a Turing Machine.
- Not a theorem
- No counterexample yet

## Deterministic Turing Machine
There is only one valid computation starting from any given input.

## Nondeterministic Turing Machine
The computation can be a tree at any state, allowing to have a number of choices.

Can have try out many possible computation in parallel for accpeting any one of these as a input.

## Complexity class NP
_A class of decision problems that can be **solved** by a **nondeterministic** turing machine in **polynomial** time_

Or described as

_NP decision problem can be **checked** by a **polynomial** time **deterministic** Turing Machine_

## P VS. NP Problem
Nondeterministic Turing Machine can be simluated by deterministic Turing Machine

### P != NP Thought
We cannot simluate nondeterministic Turing Machines in polynomial time.

## Undecidable Problems
There is no computer program that always gives the correct answer. (We can not prove)
### Halting Problem
Deciding whether a given turing machine halts or not.

# Polynomial Reduction (Proving NP completeness)
- Y ≤<sub>p</sub> X
- Y -><sub>p</sub> X
- Y -><sub>T</sub> X, where T is to do reduction
- Reduce Y to X
- If X then Y / If not Y, then not X
- X is at least hard as Y, or at least easy as Y _(we can not discuss easy because if that is the case, we can slove Y in polynomial time)_
- If we can slove X in polynomial time. we can slove Y in polynomial time. _**E.g. Bipartite Matching ≤<sub>p</sub> Max-Flow, cirulation ≤<sub>p</sub> Max-Flow**_

**Steps:**
- Reduce an input Y into an input of X
- Solve X,
- Reduce the solution back to Y

# P, NP, NP-Hard & NPC
**P**:
- set of problems that can be solved in polynomial time by a deterministic Turing Machine

**NP**
- set of problems that can be solved in polynomial time by a nondeterministic Turing Machine
- set of problems that their solutions can be **verified** in polynomial time by a deterministic Turing Machine

**NP-Hard**
- **X is NP-Hard if ∀Y ∈ NP and Y ≤<sub>p</sub> X (Polynomial Reduction)**
- Solution of X is not varified
- X is at least hard as Y

**NP-Complete**
- **X is NPC if X is NP-Hard and X ∈ NP**
- Solution of X is varified
- **NPC can be solved by a nondeterministic Turing Machine in polynomial time.**

![](https://i.imgur.com/X6BgWME.jpg)
[source](https://classroom.udacity.com/courses/cs313/lessons/48734418/concepts/486416700923)

# Venn Diagram (P, NP)
![](https://i.imgur.com/YwCoEz7.jpg)

## NPH (Not have to be in NP)
- Undecidable: Halting Problem
- TSP, optim

## NPC (NPC ⊆ NP-Hard, Most difficult NP Problems) 
- SAT
- Set Cover
- Vertex Cover

## NP (not P and NPC part)
- Graph isomorphism
- Factorization Discrete Log

## Prove NP-Completeness
1. Show that X is in NP
2. Pick a problem Y, known to be an NP-C
3. Prove Y ≤<sub>p</sub> X _(Reduce a NP-C to a harder NP-C)_

# Cook-Levin Theorem
Conjunctive Normal Form (CNF) satisfiability (SAT) is NP-C _[Can be check/vertify in linear time, but can not be solve]_

# Independent Set
Find the set of vertex that no edge joining together.

**NP-Hard Verison (to find solution)**
Find the largest independent set

**NPC Version (To verify)**
Given a graph and a number k, does...contain independent set with size k?

**Proving is NP**
Showing can verify a solution in poly time

**Proving is NP-Hard**
Pick Y from NP such that Y can reduce to Independent set, Y can be 3-SAT

**Proving is NPC**
X is NP-Hard and X ∈ NP -> X is NPC

# Vertex Cover
**Theoerm: s is independent set iff v-s is a vertex cover.**

**NP-Hard Verison (to find solution)**
Given G=(V, E), find the smallest set in V

**NPC Version (To verify)**
Given G and number k, does the graph contains a vertex cover of size at most k?

**Proving is NPC**
By the theoerm, we can make a Polynomial Reduction:
- Independent Set ≤<sub>p</sub> Vertex Cover, Vertex Cover is at least hard as Independent Set (thought was same in this example)
- Independent Set is NPC -> Vertex Cover is NPC

# Graph Coloring
Theorem: K>2. K coloring is NPC

**Prove:**
3-SAT ≤<sub>p</sub> 3-Colorable

**Claim:**
3-SAT instance is satifiable iff G is 3-colorable

# Sudoku
sudoku ≤<sub>p</sub> 9-colorable

**Not prove that Sudoku is NP-Complete, Sudoku is Y**

# Hamiltonian Cycle
A cycle in the graph that visits each vertex exactly once

**NPC Version**
Given directed or undirected G = (V, E), Find if graph contain a HC?

**Prove:**
- SAT ≤<sub>p</sub> Hamiltonian Cycle
- HC is NPC

# Traveling Salesman Problem - TSP
Salesman travel and only go one route once, want to have smallest weight.

**NPC Version**
Given a weighted G = (V, E), is there a HC that has total cost ≤ k?

**Prove:**
- Hamiltonian Cycle ≤<sub>p</sub> TSP (Might)
- TSP is NPC

# Related Read
1. [算法课笔记系列（八）——NP问题及其计算复杂性](https://blog.csdn.net/Ying_Xu/article/details/51487977)
2. P问题、NP问题、NPC问题的概念即实例证明 - 综合编程类其他综合 - 红黑联盟](https://www.2cto.com/kf/201605/511207.html)
3. [Proof that Hamiltonian Path is NP-Complete](https://www.geeksforgeeks.org/proof-hamiltonian-path-np-complete/)
4. [Hamiltonian Path is Hard 2](https://www.youtube.com/watch?v=mDlusPFt_nw)

# Reference
- slides


