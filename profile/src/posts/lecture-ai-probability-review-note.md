---
title: AI Review Note - Probability
date: 2018-11-21 20:07:14
tags:
- Course
- Algorithm
categories: Notes
---

# Quantifying Uncertainty
## Uncertainty
- Outside scope
- Too complex
- Too expensive or risky
- Randomness problem/information

## Probability
### Notation
- P(X = x<sub>i</sub>)
- **P**(X): Distribution on all values of X, e.g. **P**(X, Y), **P**(X, y)
	- **P** is the whole table (AKA Joint probability distribution), Y is the set of all varibles y<sub>i</sub>; y is a one varible

### **Two axioms**
- Sum axiom: **P(A | B) + P(~A | B) = 1**
- Product axiom: **P(AB | C) = P(A | C) * P(B | AC) = P(B | C) * P(A | BC)**

### Objective Probability
P(heads) = P(tails) = 1/2

### Subjective Probability
Mainly disscussing

## Basic Concepts
- P(A ∨ B) = P(A) + P(B) - P(A ∧ B)
- P(x ∧ y) = P(x) * P(y) if x and y are independent
- P(x ∧ y) = 0 if x and y are mutually exclusive
- P(x) = P(y) if x = y (equivalent)
- P(x1 ∨ ... ∨ X<sub>n</sub>) = 1 if the x<sub>i</sub>'s are exhaustive, e.g. P(x ∨ ~x) = 1
- P(~x) = 1 - P(x)

### Domains of Variables
Must be a partition for cover all, **exhaustive** and **mutually exclusive**, must yield 1

- Boolean, <true, false>
- Discrete Random, countable, <A, B, C, D, F>
- Continuous Random, [0, +∞]

## Atomic Events
A complete specification of state of the world about uncertain agent, like the model in logic.

The set of possible atomic events is a partition


# Probability Distribution Model
Variables or Value assignments in Table or graph

## Joint Probability Distribution
A set of **all** random variables gives the probability of every atomic event on those random variables.

![](https://i.imgur.com/tlTTFtX.png)
![](https://i.imgur.com/yqyWl7I.png)

### Fully Joint Probability Distribution
Fully is list all situation.

### Full Joint (Discrete) Distributions
- A complete probability model. Showing every entry for all variables.
- Possible world are mutually exclusive(独立) and exhausitve(完全覆盖为1) 
- Number of possible world: the product of the size of each variable

# Inferences Rules
- **Sum Rule**
- **Product Rule**
- Conditional
- Marginalization
- Normalization

## Sum Rule
>P(A | B) + P(~A | B) = 1

## Production Rule
>- P(AB | C) = P(A | C) * P(B | AC) = P(B | C) * P(A | BC)
>- P(A ∧ B) = P(AB) = P(B) * P(A | B) = P(A) * P(B | A)

## Conditional Probability
>- P(A | B) = P(A ∧ B) / P(B) if P(B) != 0
>- P(A ∧ B) = P(A | B) * P(B) = P(B | A) * P(A) _[Production Rule]_
>- P(A, B) = P(A | B) * P(B) _[, == ∧]_

### Bayes' Rule
> **P(A | B) = P(B | A) * P(A) / P(B)**

![](https://i.imgur.com/jUz4EHi.jpg)
![](https://i.imgur.com/IRdRI1P.png)
_[source](https://www.coursera.org/learn/bayesian-statistics/lecture/oANY8/lesson-2-2-bayes-theorem)_


### Degrees of belief

## Normalization
Σ P(A = a<sub>i</sub> | B = b) = 1, so 1 / P(B = b) = a, a is a normalization factor

> - **P**(A | B = b) = a\***P**(B = b | A)\***P**(A) = a\***P**(B = b ∧ A)
> - P(X | e) = P(X,e)/P(e) = aP(X,e) = aΣyP(X,e,y)

E.g.:

- **P**(B = b | A) * **P**(A) = a*<0.4, 0.2, 0.2> = <0.5, 0.25, 0.25>
![](https://i.imgur.com/Gx9tPqH.png)
![](https://i.imgur.com/sUtoWS6.png)

## Marginalization
Adding a variable as an extra condition

>P(X | Y) = Σ<sub>z</sub> P(X | Y, Z = z) * P(Z = z|Y)

![](https://i.imgur.com/A5PQNJQ.png)

...

## Probabilistic Inference by Enumeration(枚举)
Adding if it is ture: probability called marginal probability.
...


# Multiple Sources
## Independent
- A and B are independent iff **P(A|B) = P(A)** or **P(B|A) = P(B)** or **P(A, B) = P(A)\*P(B)**
- Can reduce entity set of the whole table/graph

## Conditional Independence
- P(A, B) = P(A) * P(B) _[original independence relationship]_
- P(A, B | C) = P(A | C) * P(B | C) _[conditional independence relationship]_
- **P**(X | Y, Z) = **P**(X | Z)

## Combining Evidence
P(A | B, C) = a**P**(B, C| A) \* **P**(A) _[Bayes' Rule]_ = a**P**(B | A) \* **P**(C | A) \* **P**(A) _[Conditonal Independence]_

# Decision Making
Decision Theory = probability + utility theory, Choose action/option with highest expected utilitya

## Bayesian Network
### Syntax
- Links between nodes, no link => independent
- A conditional distribution for each node given its parents

### Advantage (Bayesian Network VS Fully Joint Distribution Table)

Size = **O(n * d<sup>k</sup>)** VS. O(d<sup>n</sup>), K: # of parents; d: # in variable domain

### independence relation
![](https://i.imgur.com/riDHRdu.png)

### Enumeration Algorithm
Brute Force of P(H | E)

1. Apply the conditional probability rule: P(H | E) = P(H ∧ E) / P(E)
2. Appply the marginal distribution rule to the unknown vertices **U**: P(H ∧ E) = Σ<sub>**U**=u</sub> P(H ∧ E ∧ **U** = u) _[whole table]_
3. Apply joint distribution rule for Bayesian Network: **P**(X1, ..., Xn) = Pi<sub>i=1</sub><sup>n</sup> **P**(Xi | Parents(Xi)) _[Using the graph networkas]_

### Inference Algorithms
- Approximate Inference: Monte Carlo
- Direct Sampling: Sampling with not evidence / Reset and generate another sample / P(Sample with ALL False)
- Rejection Sampling: not waste time when sample contradicts evidence
- Likelihood Weighting: using likelihood of observed value instead of equally weighting

### Markov Chain Monte Carlo
### Dempster-Shafer Theory
### Fuzzy Logic

# Reference
- slides