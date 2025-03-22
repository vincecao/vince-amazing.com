---
title: AI Review Note - Learning
date: 2018-11-22 01:13:51
tags:
- Course
- Algorithm
categories: Notes
---

# Learning
## Two types of Learning
- Deductive: by already known rules and facts, in medical
- Inductive: Learn new rules/facts from data sets, machine learning

## Learning Agent
Having critic to give self feedback.

### Type of feedback
- **Supervised learning**: Correct answer given
- **Unsupervised learning**: Correct answer not given
- **Reinforcement learning**: Given Reward

## Inductive Learning
### Decision Trees
#### Entropy
**Entropy** = -Σ P(vi) ln\[P(vi)\] = **-P(YES) ln\[P(YES)\] - -P(NO) ln\[P(NO)\]**

![](https://i.imgur.com/53Gk9u7.png)
[Source](https://www.youtube.com/watch?v=eLlYSpVjH94)

We prefer to find more compact decision trees

Keywords: Expressiveness / Hypothesis spaces / ID3 Algorithm

#### Information theory
![](https://i.imgur.com/EO1bgDu.png)

#### Information gain
![](https://i.imgur.com/gnX2QtQ.png)
![](https://i.imgur.com/gXGQFKw.png)

![](https://i.imgur.com/MfDVwV8.png)
![](https://i.imgur.com/jwMBzgq.png)
![](https://i.imgur.com/cPnexxc.png)
![](https://i.imgur.com/sgIrkgY.png)
![](https://i.imgur.com/XF7kXJg.png)
[Source](https://www.youtube.com/watch?v=eLlYSpVjH94)
_Choose `Sunny` first and then find the largest Entropy is Temp, then chagen `Sunny` to `Overcast`, and so on_


IG(A) = before - after

**Choose the attributes with the largest IG**

### Neural Networks and Deep Learning
#### Logical Functions
Units(Perceptrons)
![](https://i.imgur.com/q4Y6ICV.png)
- AND
- OR
- NOT

*Single layer is limited: cannot compute **XOR**, can only represent Linearly separable functions* 

- Feed-Forward
- Perceptron Learning
  
#### Multilayer NN 

Overcome limitations of single-layer

- Output units
- Hidden units: decided by hand or research: **too many -> memorize input, overfitting** / **too lew -> difficult to represent function**
- Input units

##### Genetic Algorithm
For evaluating variations of the network, e.g. number of hidden units....

**Perceptron**
![](https://i.imgur.com/Kaw4QTx.png)

**AND**
![](https://i.imgur.com/RKXgNaq.png)

![](https://i.imgur.com/6lFOJ6N.jpg)

**OR**
![](https://i.imgur.com/A3ShWwz.png)

**NOT**
![](https://i.imgur.com/4z9yuyh.png)

**XOR**
![](https://i.imgur.com/6kTBYtG.png)
[Source](https://classroom.udacity.com/courses/ud262)

**Sample**
![](https://i.imgur.com/cAFpqMS.jpg)

#### Network Structures
**Feed-forward networks** & **Recurrent networks**

##### Back-Propagation
**Back-Propagation is to minimize the errors**
Can not direct compute error on output of hidden units in Multilayer NN.

##### Hopfield Networks
**Hopfield networks is minimizing the energy**

#### Deep Learning
- Train good feature automatically
- Same method for different domain

### Markov Decision Processes(MDP)
#### Model the environment
- A - Action: {forward, backward, turn-around}
- Z - Percepts (observations): {ros, colcano, nothing}
- S - States: {north, south, east, west}
- Appearance: state -> observations
- Transition: (state, actions) -> states
- Current State (s)
- Reward: R(s) or R(s, a)
- Value/Utility if States: U(s)

![](https://i.imgur.com/9gogafV.png)
![](https://i.imgur.com/uIlSZWE.png)
[Source](https://classroom.udacity.com/courses/ud600)

- Probability (Transition) - P<sub>a</sub>(s, s') = Pr(s<sub>t+1</sub> = s' | s<sub>t</sub> = s, a<sub>t</sub> = a)
- Immediate Reward - R<sub>a</sub>(s, s') = R(s<sub>t</sub> = s, s<sub>t</sub> = s')

#### MDP

MDP has no sensor model

Consists of
- State S and action A
- Initial State s<sub>0</sub> Probability Distribution Pi
- Transition mode T(s' | s, a)
- A reward function R(s)

#### Partial Observation MDP (POMDP)

Can only see the percepts, not the states

- Model
- State Value(Utitly)
- Policy (Choose the best action)

Consists of
- State S and action A
- Initial State s<sub>0</sub> Probability Distribution Pi
- Transition mode T(s' | s, a)
- A reward function R(s)
- _A sensor model P(e|s)_
- _A belif of what the current state is b(s)_

#### Compute Utilities
- Goal (Given)
- Reward (Given)
- Value/Utility (Computed), with future discount

#### Bellman equations
![](https://i.imgur.com/sT3G1kL.png)

#### Bellman iteration
![](https://i.imgur.com/wFohXO9.png)

#### Value Iteration
##### MDP
![](https://i.imgur.com/wFohXO9.png)

##### POMDP
![](https://i.imgur.com/OHQKrHH.png)

#### Policy
A solution of (PO)MDP - Policy Pi(s) = a

##### Optimal Policy
- A policy that yields the highest expected utility.
- Compute when U<sup>*</sup>(s') is known
![](https://i.imgur.com/Pu7tK9k.png)

#### Policy iteration
Impoving Pi(s) ebery step, start with a randomly chosen initial policy Pi<sub>0</sub>
##### Policy evalutation
By a given policy Pi each iteration
![](https://i.imgur.com/pdFZIEo.png)
##### Policy Improvement
Update Pi each time by using one-step look-ahead
![](https://i.imgur.com/njGub01.png)

### Reinforcement Learning
Two General Classes
- Model-based RL
- Model-free RL

#### Pros
- Find optimal policy

#### Cons
- States is not always known and computation time can be extreme large
- Cannot handle raw data
- Cannot do Model-free RL when goal is change 

#### Model-based RL
**Known the transition**, first know the utilities, then learn the policy
- Policy iteration

#### Model-free RL
**Without know the transition**, learning by receiving samples from environment
- Monte Carlo
- Temporal Difference
- Q-Learning

##### Monte Carlo
##### Temporal Difference
##### Q-Learning
Using Q(s, a) to represent the value of taking an action a in state s, rather than only 
- The value of state U(s):
![](https://i.imgur.com/MCPrnRE.png)

- Get optimal Pi(s)
![](https://i.imgur.com/xGES3Cv.png)

**Step**
- Sample
- Q(s, a) = (1-a)Q(s, a) + a*Sample
![](https://i.imgur.com/JtbbOT6.png)
[source](https://en.wikipedia.org/wiki/Q-learning)

**Advantage**
- No need for a fixed policy, (could off-policy learning)
- Optimal policy Pi(s)=a to select the action a that has the best Q(s, a)
- Provably convergent to the optimal policy when t -> infinite

# Reference
- slides