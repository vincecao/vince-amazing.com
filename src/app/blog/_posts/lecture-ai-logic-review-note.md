---
title: AI Review Note - Logic
date: 2018-10-23 13:25:00
tags: 
- Course
- Algorithm
categories: Notes
---

# Logic

**Logic** are formal languages for represting information such taht conclusions can be drawn

**Syntax** defines the sentences in the language

**Semantics** define the "meaning" of sentences

# Type of Logic

- Propositional logic \[Facts\]
- First-Order Logic (FOL) \[Facts, objects, relations\]
- Temporal Logic \[Facts, objects, relations, times\]
- Probability theory \[Facts, in degree of belief (0, 1)\]
- Fuzzy Logic \[Facts, in degree of truth (0, 1)\]

# Inference (⊢ / provable)
_KB ⊢ a_, _a_ can be derived from _KB_ by procedure.

- People make inference from what we know so far
- Inference is a the process of finding the entailment
- Inference is determining if entailment is true or not
- **False ⊢ True is True**

---
CMU source: [[6]](https://www.cs.cmu.edu/afs/cs/academic/class/15381-s07/www/slides/022707reasoning.pdf)
- An inference algorithm is a procedure for deriving a sentence from the KB
- KB ⊢ <sub>i</sub> S means that S is inferred from KB using algorithm i.
- The inference algorithm is sound if it derives only sentences that are entailed by KB.
- The inference algorithm is complete if it can derive any sentence that is entailed by KB.

## Soundness
- Procedure i is sound: whenever KB ⊢ a, it is also true KB ⊨ a (It guarantees that KB indeed entails a)
- **Produce only entailed sentences**
- **Not infer the false sentences**

## Completeness
- Procedure i is complete: Whenever KB ⊨ a, it is also true that KB ⊢ a (Finding any sentence a that is entailed by KB)
- **Produce all entailed sentences**
- **Derives any sentences that is entailed**

# Entailment (⊨)
_KB ⊨ a_: _KB_ **entail** sentence _a_, iff, _a_ is true in all worlds where _KB_ is true. (KB contains "A Won", "B Won", entails "Either A or B won")

- It is impossibal premises(前提) are true and consequence if false.
- **KB inference a → sound → KB entails a → complete → KB inference a → ...**
- **False ⊨ True is True**

---
CMU source: [[6]](https://www.cs.cmu.edu/afs/cs/academic/class/15381-s07/www/slides/022707reasoning.pdf)
- “KB logically entails S” if all the models that evaluate KB to True also evaluate S
to True.
- Denoted by: _KB ⊨ S_
- Note: We do not care about those models that evaluate KB to False. The result of evaluating S for these models is irrelevant.

![](https://i.imgur.com/Ric6oMj.png)

# Model
If a sentence _a_ is true in model _m_, we say _m satisfies a_, or _m is a model of a_ (**the real world model** satisfies **the statment in our head**)

- _M(a)_ is the set of all models of _a_
- _M(KB)_ is the set of all models of KB(KnowledgeBase)
- **_KB ⊨ a_ iff(if and only if) M(KB) is a subset _M(a)_**

# Propositional Logic
## Symbols ([wiki](https://en.wikipedia.org/wiki/List_of_logic_symbols))
Boolean Variables:
- True (⊤ or 1)
- False (⊥ or 0)

## Sentences (either true or false)
- **Atomic sentences** / single proposition symbol
- **Complex sentences** / one or more propositions with logical connectives

## Literal
An atomic sentence or its negation
- Positive literal: p
- Negative literal: ¬p / ˜p / !p

## Not (¬ / ~ / !)
Negation

## And (∧ / · / &)
**Conjunction**: A sentence whose main connective is And. 
- _(P∧Q)∧(R∧S)∧(T∧U) is conjunction._

## Or (∨ / + / ||)
**Disjunction**: A sentence whose main connective is Or.
-  _(P∧Q)∨(R∧S)∨(T∧U) is disjunction._

## Implies (⇒ / → / ⊃)
Means **Implication**: 
- Antecedent (前情) → Consequent
- **Only False** when: True → False

## Biconditional (⇔ / ≡ / ↔), iff
Means **Equivalence**
- **True** when boths side are true or both sides are false 

## Syntax
Illustrates the basic ideas / sentences relationships

## Semantics
The meanings / value of the each propostion based on the current model

## Truth Table
![](https://i.imgur.com/iyGdKuB.png)
![](https://i.imgur.com/XLEFH6A.png)

## Entailment proof
- set of true sentences, KB
- join as a big conjunction
- create a truth table
verify sentence

Algorithm is **sound**: it directly implements the definition of entailment.
Algorithm is **complete**: it works for any sentence and always terminates

## Enumeration Method
Check all possible models - a must be true wherever KB is true

## Validity
If the sentence is true in **all** models

**a is valid iff ~a is unsatisfiable**

## Satisfiable
If the sentence is true in **at least one** models

**a is satisfiable iff ~a is not valid**

## Entailment as satisfiability
- a ⊨ b iff the sentence (a ⇒ b) is valid
- (a ⇒ b) is valid iff ¬(a ⇒ b) is unsatisfiable
- ¬(a ⇒ b) ⇔ ¬(¬a ∨ b) ⇔ (a ∧ ¬b)
- **a ⊨ b iff (a ∧ ¬b) is unsatisfiable**

## Tautology
**A sentence that is necessarily True, in all models.** (_(P⇒Q)⇔(¬P∨Q)_)
![](https://i.imgur.com/6FRy3M3.png)

### De Morgan Laws
- (P ∧ Q) ∨ (R ∧ S)
- ¬(¬(P ∧ Q)) ∨ ¬(¬(R ∧ S))
- ¬(¬P ∨ ¬Q)) ∨ ¬(¬R ∨ ¬S))

# Inference Rules
Requires sentences to be in horn form
- Modus Ponens
    + **(a ⇒ b, a) ⇒ b**
- Modus Tollens
    + **(a ⇒ b, ¬b) ⇒ ¬a**
- And-Elimination
    + **(a1 ∧ a2 ∧ a3 ∧ a4... an) ⇒ (ai)**
- And-Introduction
    + (a1, a2, a3, a4... an) ⇒ (a1 ∧ a2 ∧ a3 ∧ a4... an)
- Or-Introduction
    + **(ai) ⇒ (a1 ∨ a2 ∨ a3 ∨ a4... anb)**
- Double-Negation Elimiation
    + ¬(¬a) ⇒ a
- Contraposition
    + **(a ⇒ b) ⇒ (¬b ⇒ ¬a)**, - **(¬a ⇒ ¬b) ⇒ (b ⇒ a)**
- **Unit Resolution**
    + (a ∨ b, ¬b) ⇒ (a)
    + (a1 ∨ a2 ∨ a3...an, m, which _ai_ and _m_ is complementary literals) ⇒ (a1 ∨ a2 ∨ a3 ∨ a4... a(i-1) ∨ a(i+1) ... ∨ an)
- **Resolution**
    + **(a ∨ b, ¬b ∨ c) ⇒ (a ∨ c)**
    + (¬a ⇒ b, b ⇒ c) ⇒ (¬a ⇒ c)
    + (a1 ∨ a2 ∨ a3...ak, m1 ∨ m2 ∨ m3...mn, which _ai_ and _mj_ is complementary literals) ⇒ (a1 ∨ a2 ∨ a3 ∨ a4... a(i-1) ∨ a(i+1) ... ∨ ak ∨ m1 ... m(j-1) ∨ m(j+1) ... ∨ mn)

_**Found CNF Three Examples:**_
- (a ∧ b) V (b ∧ c) ⇒ (a ∨ b) ∧ (a ∨ c) ∧ b ∧ (b ∨ c)
- (a ∨ b) ∧ (b ∨ c)
- (a ∨ b) ∧ (¬b ∨ c) ⇒ (a ∨ c)

## Horn Clause
a Horn clause is a clause (a disjunction of literals ) with **at most one positive literal(<=1)**...a Horn clause with no positive literals is sometimes called a goal clause [[1]](https://planetmath.org/hornclause9)

- E.g. ¬P ∨ ¬Q ∨ ¬R ∨ ¬S, or P ∧ Q ∧ R ⇒ ¬S(implication form)
- KB ∧ ¬a, is still a horn clause

### Definite Clause [[4]](https://en.wikipedia.org/wiki/Horn_clause)
A Horn clause with exactly one positive literal is a definite clause.

### Fact
a definite clause with no negative literals is sometimes called a fact

### Goal clause
a Horn clause without a positive literal is sometimes called a goal clause

### Forward Chaining
Start with horn clause

Downside: effiency / Good for maintain
### Backward Chaining
Start with conclusion

More target

# First-Order Logic
Aviod ambiguous, keep, **declarative** and **compositional** of propositional logic

FOL is built around **objects** and **relations**. FOL can express facts about **some** or **all** objects in the universe.

_Propostional VS FOL:_
- P: YES/NO; May multiple queries (e.g. Is it 5PM?)
- FOL: Answer is not limited with YES/NO; Only single query (e.g. What time is it?)
- They are both **monotonic**

## Syntax
### Symbols
- **Constant** - objects
- **Predicate** - relations or property, return _True_ ro _false_
    + e.g. Bites(Man, Dog): Predicate(arguments)
- **Function** - relates objects to one other objects, return _values_
- **Conventions** - Upper-case letters

### Arity
**The number of arguments** for given predicate
- Binary predicates, _e.g. HigherThan(A, B)_
- Unary predicates, _e.g. High(A)_
- Nullarity predicates, _e.g. MadeOfCheese()_

### Terms
A logic expression that refer to an object

### Variables
Terms or argument of a function, in lowercase

### Functions
Refer to domain objects, like **Constants** and **Variables**, look similar to predicates but returns value/objects instead of True/False

- **Constants** refer directly to domain objects
    + E.g. Richard, John, Dog
- **Variables** refer to the conjunction or disjunction of domain objects
    + E.g. ∀x, ∃y, A ∧ B ∧ C
- **Functions** refer indirectly to domain objects using other terms
    + E.g. LeftLeg(Richard), G(x, y)

### Sentence
#### Atomic Sentence
interpreted with repect to a model / contain no variables or conjunctions [[5]](https://en.wikipedia.org/wiki/Atomic_sentence#Atomic_sentences)
- E.g. Bites(A, B)

### Complex sentences
One or more predicate-argument relations.
- E.g. Bites(A, B) ∧ Owns(A, B)

### Quantifiers
- Univeral quantification(∀)
- Existential quantification(∃)

∃ x (owns(A, B) ∧ Bites(A, B))
Quantifiers + variable + variable scope

### Nested Quantifiers
- ∀x ∀y ⇔ ∀x ∀y
- ∃x ∃y ⇔ ∃x ∃y
- ∀x ∃y P(x, y) ⇔ ∀x (∃y P(x, y))

#### Quantifier Negation
∀x P ⇔ ¬∃y ¬P

# Propositionalization
- Convert FOL KB into propositional KB
- Every FOL KB can be propositionalized

## Problems
- Exponential Space
- Generating irrelevant sentences
- Infinite Terms in Function
- Lterative Deepening
- Herbrand's Theoren: if no proof will infinite loop.

# Unify Operator
- Given(two sentences)
- Return(A unifier of the two sentences with substitution OR Fail if no substitution exists)
## Most Genernal Unifier(MGU)
A sound inference rule.

# Forward Chaining
- Start from known facts
- Sound and Complete
- Datalog

# Backward Chaining
- Aviod loops
- Aviod repeated work
- Linear Size of Proof Space
- Soundness by using Generalized Modus Ponens (GMP)
- Incomplete due to infinite loops
- Prolog(Prolog is not soundness, lacking *occur check*)

## Prolog Example:
A useful programming/prototyping paradigm; A Prolog program is a set of Horn clauses
![](https://i.imgur.com/coSstvH.png?1)

### Aviod infinite loops in Prolog
1. path(X, Z) :- link(X, Z) / **Check the stop condition first**
2. path(X, Z) :- path(X, Y), link(Y, Z)

# Conjunctive Normal Form (CNF)
A conjunction of clauses, each clasue being a disjunction of literals. It is always possible to convert any KB to CNF

Steps:
1. Eliminate ⇒ **(A ⇒ B -> ¬ A ∨ B)**
2. Move ¬ inward
3. Standardize variables **e.g. import z if have two y**
4. Skolemization **replace ∃ with Function Q()**
5. Drop Universal Quantifiers **remove ∀**
6. Distribute ∨ over ∧

# Special-Purpose Logics
- Temporal logic
- Higher-order logic(HOL)

# Knowledge Engineering
Declarative (陈述)

## Ontology
Concepts/Categories

## Defining Concepts/Categories
- A is a **necessary condition** for B iff **B⟹A**. In other words, it cannot be true that B holds while A doesn't [2](https://math.stackexchange.com/questions/2053755/necessary-and-sufficient-condition-meaning).
- P is a **sufficient condition** for Q iff **P⟹Q**. In other words, as soon as P holds, we know that Q holds as well [2](https://math.stackexchange.com/questions/2053755/necessary-and-sufficient-condition-meaning). 
- **Necessary and Sufficient Conditions**

## Representing Concepts/Categories
- Represent as unary predicate
    + **E.g.** 
    + Categories: Ace(x), Basketball(x)
    + Membership: Basketabll(x1)
    + Subclass: ∀x Ace(x) ⇒ Card(x)
- Represent as an object itself. (E.g. )
    + **E.g.** 
    + Categories: Aces, Basketballs
    + Membership: B1 ∈ Basketablls
    + Subclass: Aces ⊂ Cards / Aces ⊆ Cards

## Subclass
### Type Hierarchies (?Is-a hierarchy)
Referred as an ontology, a taxonomy

Allows Inheritance type of reasoning, Inheritance can occur from any **superclass**
### PartOf Hierarchies
Allows Transitivity type of reasoning.

# Planning [3](http://homepages.laas.fr/ypencole/teaching/KRR6Notes.pdf)
## Situation
A Situation is a logical term; _Result(Action, Situation)_
## Fluents
A Fluent is a function or a predicate that vary from one situation to the next. By convention, the situation is always the last argument of the fluent. (Change with time/situation)
## Atemporal predicates/functions
An atemporal predicate/function is a predicate/function that do not vary from one situation to the next. (not change with time/situation)
## Classic Issues
- Frame Problem
    - Represent all things
    - Closed-world is help to deal with it/ not a solution
- Qualification problem
    - Qualification
- Ramification Problem
    - Side effect
## Planning Language
- State
- Goals
- Actions
### Representing goals
- Conjunction of positive literals
- Goal is satisifed if state contains all literals
### Representing actions
- Action
    + Name + parameters + precondition + effect (E.g. (Fly(p, from, to)))
- Precond: ...
    + must be true
- Effect: ...
    + Conjunction of function-free positive literals
    + Positive literals add facts / Negative literals remove facts
    + Can represent as _Add: At(p, to) / Delete: At(p, from)_

## Planning Domain Definition Language (PDDL)
## Planning with State-Space Search / Whole Order Plan (NP hard)
- Forward: Progression (A* or iternative deepening from start)
- Backware: Regression (From goal)

## Partial-Order Planning (POP)
- State (Initial State or Goal State )
- Actions (step in the plan)
- Orderings (set of ordering constraints: A < B(A before B)>)
- Links (Set of Casual links)
- Open (set of Open preconditions)

## Planning Graph
Consisting of a sequence of levels that correspond to steps in the plan, **Works only for Propositional plainning problems with no varibles**
_State0 + Action0 + State1 + Action1 +..._
- Literals (increase monotonically)
- Actions (increase monotonically)
- Conflicts 
- Mutex Relations (decrease monotonically)

No Solution: **all goals present & non-mutex** or **extrasolution fails**

# Referece:
- [[1]](https://planetmath.org/hornclause9)
- [[2]](https://math.stackexchange.com/questions/2053755/necessary-and-sufficient-condition-meaning)
- [[3]](http://homepages.laas.fr/ypencole/teaching/KRR6Notes.pdf)
- [[4]](https://en.wikipedia.org/wiki/Horn_clause)
- [[5]](https://en.wikipedia.org/wiki/Atomic_sentence#Atomic_sentences)
- [[6]](https://www.cs.cmu.edu/afs/cs/academic/class/15381-s07/www/slides/022707reasoning.pdf)
- Slides