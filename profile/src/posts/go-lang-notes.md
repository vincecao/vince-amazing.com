---
title: Go Language Notes
date: 2021-06-19 22:30:17
tags:
  - Go
categories: Notes
---

### func, Package

```go
package main

import "fmt"

func main() { // share same name with the main package
	fmt.Println("Hello, ninjas!")
}

func sayGreetings(n string) {
	// your code
}

func cycleNames(n []string, f func(string)) {
	// your code
}

// multiple returns 
func getInitials(n string) (string, string) {
	// your code
	return "Initial One", "Initial Two"
}

fn1, fn2 := getInitials("test test")

```

### strings

```go
// strings
var nameOne string = "first name"
var nameTwo = "second name"
var nameThree string

fmt.Println(nameOne, nameTwo, nameThree)

nameThree = "third name"
nameFour := "fourth name"
fmt.Println(nameOne, nameTwo, nameThree, nameFour)
```

### int, uint, float, etc

```go
// ints, int8, int16, uint8, float32, etc
intOne := 1
var intTwo int = 2
var intThree = 3

fmt.Println(intOne, intTwo, intThree)
```

### print, printf, sprintf

```go
// print, printf, sprintf
age := 10
ageString := "10"
name := "John"
fmt.Printf("my age is %v and my name is %v \n", age, name)
fmt.Printf("my age is %q and my name is %q \n", ageString, name)
fmt.Printf("age type is %T \n", age)

fmt.Printf("this number is %f \n", 255.5)
fmt.Printf("this number is %0.2f \n", 255.5)

str := fmt.Sprintf("this number is %0.4f \n", 255.5)
fmt.Printf("Saved: %v", str)
```

### Arrays & Slices

```go
// arrays
// var ages [3]int = [3]int{20, 25, 30}
var ages = [3]int{20, 25, 30}

names := [4]string{"a", "b", "c", "d"}

// ages [20 25 30]
// len(ages) 3

// slices (use array under hood)
var scores = []int{100, 50, 60}
scores[2] = 25
scores = append(scores, 85) // append number to scores and return a new one

// slice ranges
rangeOne := names[1:3]
// rangeOne [b c]

rangeTwo := names[2:]
// rangeTwo [c d]

rangeThree := name[:3]
// rangeThree [a b c]

```

### Standard library

[stdlib](https://golang.org/pkg/#stdlib)

```go
import (
	"fmt"
	"strings"
	"sort"
)

// strings
greetings := "hello from friends"

strings.Contains(greetings, "hello")
strings.ReplaceAll(greeting, "hello", "hi")
strings.ToUpper(greeting)
strings.Index(greeting, "ll")
strings.Split(greeting, " ")

// sort
ages := []int{45, 20, 35, 30, 75, 60, 50, 25}

sort.Ints(ages)
sort.SearchInts(ages, 30)

names := []string{"a", "b", "c"}

sort.Strings(names)
sort.SearchStrings(names, "b")

```

### Loops

```go
x := 0
for x < 5 {
	// your code here
	x++
}

for i := 0; i< 5; i++ {
	// your code here
}

names := []string{"a", "b", "c"}

for index, value := ranges names {
	// your code here
}

for _, value := ranges names {
	// your code here
}

```

### Packages

```go
// greetings.go
package main

func sayHello() {
	// your code
	// sharedValue is accessible here
}

// main.go
package main

var sharedValue = 100 // shared value in the package scope

func main() {
	sayHello()
}

```

### Maps

```go

menu := map[string]float64{
	"soup": 4.99,
	"pie": 7.99,
	"salad": 6.99,
	"toffee pudding": 3.55,
}

// map [pie:7.99 salad:6.99 soup:4.99 pudding:3.55]
// menu["pie"] 7.99

// looping maps
for k, v := range menu {
	// your code here, k for key, v for value
}

// ints as key type
phonebook := map[int]string{
	111: "one",
	222: "two",
	333: "three",
}

phonebook[1111] = "four"

```

### Pass by Value


Non-Pointer Values | Pointer Wrapper Values
--- | ---
Strings | Slices
Ints | Maps
Floats | Functions
Booleans | 
Arrays |
Structs | 


### Pointer

```go
func main() {
	n := 0
	add(&n) // pass address
	fmt.Println(n)
}

func add(n *int) {
	*n = *n + 1
}
```

### struct

```
type cat struct {
	name string
	age int
}

func main() {
	newCat := cat{name: "Kit", age: 3}
	newCat.age = 4
}

```

### Define new types

```go
type MyFloat float64

func (n MyFloat) show() {
	fmt.Println(n)
}

func main() {
	var a MyFloat = 1.5
	a.show()
}

```

## Ref

- [Package builtin](https://golang.org/pkg/builtin/)
- [Package fmt](https://golang.org/pkg/fmt/)
