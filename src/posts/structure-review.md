---
title: Java Sytax & Structure Review
date: 2019-05-27 13:14:00
tags:
- Java
- CSharp
categories: Notes
---

- [Java in 21 Days](http://www.dmc.fmph.uniba.sk/public_html/doc/Java/)
- **[Java Book](<http://www.java2s.com/Book/Java/CatalogJava.htm)**

# Array
- `int[] arr = new int[2]`
- `int[] arr = {1, 2, 3}`

## Arrays API
_[ref](https://docs.oracle.com/javase/7/docs/api/java/util/Arrays.html)_
- Search
- Comparsion
- Fill
- Copy, `Arrays.copyOf()`
- Sort
- `Arrays.binarySearch()`
- `Arrays.euqals()`

``` java
int size = 10;
int[] arr = new String[size];
Arrays.fill(arr, "-1");
```

## Muti-dementions
``` java
String[][][] arr = {{{"000"}, {"100"}, {"200"}, {"300"}}, 
                    {{"010"}, {"110"}, {"210"}, {"310"}},
                    {{"020"}, {"120"}, {"220"}, {"320"}}};
//[down3][Across4][groups1]

/*
String[][][] arr = {
                        {
                            {"000"},    //arr[0][0][0]
                            {"100"}, 
                            {"200"}, 
                            {"300"}
                        }, 
                        {
                            {"010"}, 
                            {"110"}, 
                            {"210"},    //arr[1][2][0]
                            {"310"}
                        },
                        {
                            {"020"}, 
                            {"120"},    //arr[2][1][0]
                            {"220"}, 
                            {"320"}
                        }
                    };
*/

int[][] rent = {{400, 550, 700}, 
                {500, 344, 342}};
//rest[row][col]                
```

# Collection Interface*
_[Collections*](http://www.java2s.com/Book/Java/0080__Collections/Catalog0080__Collections.htm)_

_[ArrayList vs. LinkedList vs. Vector](https://www.programcreek.com/2013/03/arraylist-vs-linkedlist-vs-vector/)_

![](https://www.programcreek.com/wp-content/uploads/2009/02/java-collection-hierarchy.jpeg)

> - `ArrayList` is implemented as a resizable array. As more elements are added to `ArrayList`, its size is increased dynamically. It's elements can be accessed directly by using the get and set methods, since `ArrayList` is essentially an array. __(Not thread safe)__
> - `LinkedList` is implemented as a double linked list. Its performance on add and remove is better than `Arraylist`, but worse on get and set methods. __(Not thread safe)__
> - <del>`Vector`(outdated)</del> is similar with `ArrayList`, but it is synchronized. __(Thread safe, but can use `java.util.concurrent.CopyOnWriteArrayList` to replace)__

_Ref: [Vector & Stack](http://javaultimate.com/java/java_vector_stack.htm)_

![](http://javaultimate.com/media/tutorial/java/collections/java_vector_stack/vectorNdStack.png)

> Stack class is the child class of Vector.
> - It follows LIFO (Last in first out) mechanism.
> - It is the stack implementation in java

> Additional methods defined by Stack
> 1. Object `push(Object item)`, Pushes the element into Stack and returns the same element
> 2. Object `pop()`, Removes the element from Stack and returns the element
> 3. Object `peek()`, Returns the top element from Stack.
> 4. Object `empty()`, Returns true when the Stack is empty.
> 5. int `search(Object o)`, Returns the offset value from the stack if the element is found, otherwise it returns -1.

- [Java集合（五）应该弃用的Vector和Stack](https://my.oschina.net/zhaoqian/blog/348843)
- [题 为什么Java Vector（和Stack）类被认为已过时或已弃用？](http://landcareweb.com/questions/179/wei-shi-yao-java-vector-he-stack-lei-bei-ren-wei-yi-guo-shi-huo-yi-qi-yong)
- [Java 容器源码分析之 Vector 与 Stack ](http://blog.jrwang.me/2016/java-collections-vector-stack/)

## List

### Vector
_[ref](https://javapapers.com/core-java/java-collection/difference-between-vector-and-arraylist-in-java/)_
- All the methods of `Vector` is __synchronized__. But, the methods of `ArrayList` is __unsynchronized__, thread-safe operation need Vector, but cost time
- When you use Vector or ArrayList, always initialize to the largest capacity that the java program will need. Since incrementing the size is a costlier operation.

#### Method & prop
_[ref](https://docs.oracle.com/javase/8/docs/api/java/util/Vector.html)_
- `add(E element)`, `add(int index, E element)`, `addAll(int index, Collection<> c`, `addElement(E element)`
- `capacity()`
- `clear()`
- `clone()`
- `contains()`, `containsAll(Collection<> c)`
- `copyInto(Object[] array)`
- `elementAt(int index)`
- `equals(Object o)`
- `get(int index)`, `set(int index, E element)`
- `indexOf(Object o)`
- `remove(int index)`, `remove(Object o)` and `removeAll(Collection<?> c)`
- `removeElement(Object obj)`, `removeElementAt(int index)`
- `size()`
- `toArray()`

### ArrayList
- by resizable array
- can only hold objects
- can increase and decrease the size, array can not
- Use `.get()`, and `.set()`
- Use `.add()`
- sort, `public void sort(Comparator<? super E> c)`, need extened

### LinkedList
- by double linked list
- sort by `Collection.sort()` method.

## Stack(Vector), Queues, PriorityQueues
### Stack(Vector)
First In Last Out

- push
- pop
- peek: the top of the stack

### Queue
First In First Out

- front, out from frist
- rear, add from rear
- insert
- remove
- peek

#### Deque
_[Deque interface in Java with Example](https://www.geeksforgeeks.org/deque-interface-java-example/)_

> The `java.util.Deque` interface is a subtype of the `java.util.Queue` interface. The `Deque` is related to the double-ended queue that supports addition or removal of elements from either end of the data structure, it can be used as a `queue (first-in-first-out/FIFO)` or as a `stack (last-in-first-out/LIFO)`. These are faster than `Stack` and `LinkedList`.

![](https://www.geeksforgeeks.org/wp-content/uploads/Selection_032.png)

![](https://cdncontribute.geeksforgeeks.org/wp-content/uploads/java-collection.jpg)

> Few important features of Deque are:
> - It provides the support of resizable array and helps in restriction-free capacity, so to grow the array according to the usage.
> - Array deques prohibit the use of Null elements and do not accept any such elements.
> - Any concurrent access by multiple threads is not supported.
> - In the absence of external synchronization, Deque is not thread-safe.

##### Methods

_[check Deque](http://www.java2s.com/Book/Java/0080__Collections/Deque.htm)_
_[Interface Deque<E>](https://docs.oracle.com/javase/7/docs/api/java/util/Deque.html)_
- `iterator()`: Return an iterator for this deque., `descendingIterator()`

###### Queue Interface, FIFO (First-In-First-Out), ADD, REMOVE
- `add(element)` = `addLast(element)`, `addFirst(element)`, to __tail__
- `offer(element)` = `offerLast(element)`, `offerFirst(element)` to __tail__
- `remove()` = `removeFirst()`, `removeLast()`, to __head__
- `poll()` = `pollFirst()`, `pollLast()`, Retrieves and removes the __head (first element) of this list__, handling for expection with `null` [example](http://www.java2s.com/Book/Java/0080__Collections/Poll_pop_and_push_element_to_a_LinkedList.htm)
- `element()` = `getFirst()`
- `peek()` = `peekFirst()`, `peekLast()`, __head__

###### Stack Interface, LIFO (Last-In-First-Out), PUSH, POP (reverse stack)
- `push(element)`, Adds an element to the __head__.
- `pop(element)`, Removes an element from the __head__ and returns it.
- `peek()` = `peekFirst()`, `peekLast()`, Retrieves, but does not remove, the __head (first element)__ of the queue represented by this deque, returns `null` if this deque is empty.

### Priority Queue
insert queue with proper order

``` java
/*
PriorityInsert 10
PriorityInsert 19
PriorityInsert 15
PriorityInsert 11

queue: 19 15 11 10
*/
```

# Map
- _[Map](http://www.java2s.com/Book/Java/Collections/Map.htm)_
- _[HashMap vs HashSet vs Hashtable – HashMap, HashTable, TreeMap and LinkedHashMap with Examples](http://javainfinite.com/java/hashmap-vs-hashset-vs-hashtable-hashmap-hashtable-examples/)_
> Maps are described by the Map interface. Map interface has no parent interface and is declared as
> Map<K,V>
> - K is the key's type
> - V is the value's type
> Unlike List, Set, and Queue, __Map does not extend Collection__. It is possible to get a Collection instance by calling Map's keySet(), values(), and entrySet() methods, which respectively return __a Set of keys__, __a Collection of values__, and __a Set of key/value pair entries__.

``` java
public static void main(String[] args) {
    Map<String, Color> colorMap = new HashMap<String, Color>();
    colorMap.put("red", Color.RED);
    colorMap.put("blue", Color.BLUE);
    colorMap.put("green", Color.GREEN);
    colorMap.put("RED", Color.RED);
    for (String colorKey : colorMap.keySet()){
      System.out.println(colorKey);
    }
      
    Collection<Color> colorValues = colorMap.values();
    for (Iterator<Color> it = colorValues.iterator(); it.hasNext();){
      System.out.println(it.next());
    }      
}

```
_4 commonly used implementations of Map in Java SE - __HashMap__, __TreeMap__, __Hashtable__ and **LinkedHashMap**_
![](https://www.programcreek.com/wp-content/uploads/2009/02/MapClassHierarchy-600x354.jpg)

![](http://javainfinite.com/wp-content/uploads/2016/10/map.png)

## HashMap, TreeMap, LinkedHashMap, (HashTable)
- [HashMap vs. TreeMap vs. HashTable vs. LinkedHashMap](https://dzone.com/articles/hashmap-vs-treemap-vs)
- [Java TreeMap vs HashMap](https://www.baeldung.com/java-treemap-vs-hashmap)
- (Modified with code mistake)[HashMap vs. TreeMap vs. Hashtable vs. LinkedHashMap](https://www.programcreek.com/2013/03/hashmap-vs-treemap-vs-hashtable-vs-linkedhashmap/)

## HashMap vs TreeMap
- Both __TreeMap and HashMap__ don’t support duplicate keys.
- Both Map implementations __aren’t synchronized__
- >The Iterator throws a ConcurrentModificationException if the Map gets modified in any way and at any time once the iterator has been created.
- Using `put()`;

### HashMap(Most Use)
- Implemented as a __hash table__
- __No ordering__ on keys or values
- At most one null key and many null values.
- __O(1)__ with add(), remove(), and contains();
- Waste memory compared with TreeMap
- >HashMap can be tuned using the initialCapacity and loadFactor, which isn’t possible for the TreeMap
- Used in thread-safe, otherwise use synchronized __Hashtable__, which not allow _null_.

### TreeMap
- Implemented based on __red-black tree structure__
- It is __naturally ordered by the key__
- No null is allowed but ok for null value
- __O(log(n))__ for most operations like add(), remove() and contains()
- Save memory compared with HashMap

### Others
- **LinkedHashMap** , LinkedHashMap is a subclass of HashMap, preserves the insertion order
- **Hashtable** is synchronized, in contrast to HashMap. 
- __Hashtable__ is simply an implementation of the __Dictionary ADT__, Not use <del>Dictionary</del> because __obsolete__.

``` java
//HashMap with self object class
class Dog {
	String color;
 
	Dog(String c) {
		color = c;
	}
 
	public boolean equals(Object o) {
		return ((Dog) o).color.equals(this.color); 
        //If the key of a HashMap is a self-defined object, then the equals() and hashCode() contract need to be followed.
        //the hashCode() and equals() methods implemented in the Object class prevent identical
        //hashCode() method gives distinct integers
        //equals() method only returns true with two references reference
	}
 
	public int hashCode() {
		return color.length();
	}
 
	public String toString(){	
		return color + " dog";
	}
}


public static void main(String[] args) {
    HashMap<Dog, Integer> hashMap = new HashMap<Dog, Integer>();
    Dog d1 = new Dog("red");
    Dog d2 = new Dog("black");
    Dog d3 = new Dog("white");
    Dog d4 = new Dog("white");

    hashMap.put(d1, 10);
    hashMap.put(d2, 15);
    hashMap.put(d3, 5);
    hashMap.put(d4, 20);

    //print size
    System.out.println(hashMap.size());

    //loop HashMap
    for (Entry<Dog, Integer> entry : hashMap.entrySet()) {
        System.out.println(entry.getKey().toString() + " - " + entry.getValue());
    }
}

//output
3
red dog - 10
white dog - 20 //equal() will check if the key is same for self-define class
black dog - 15

//using LinkedHashMap with instering order
red dog - 10
black dog - 15
white dog - 20
```

``` java
//TreeMap with self-class
class Dog implements Comparable<Dog>{ //need to comapre for treemap for sorting
	String color;
 
	Dog(String c) {
		color = c;
	}
 
	public String toString(){	
		return color + " dog";
	}
 
	@Override
	public int compareTo(Dog o) { 
        //need to override the key compare for sorting, uses compareTo() method to compare keys
		return o.color.compareTo( this.color );
	}
}

public class TestTreeMap {
	public static void main(String[] args) {
 
		TreeMap<Dog, Integer> treeMap = new TreeMap<Dog, Integer>();
		
		treeMap.put(new Dog("red"), 10);
		treeMap.put(new Dog("black"), 15);
		treeMap.put(new Dog("white"), 5);
		treeMap.put(new Dog("white"), 20);
 
		for (Entry<Dog, Integer> entry : treeMap.entrySet()) {
			System.out.println(entry.getKey() + " - " + entry.getValue());
		}
	}
}

//output
white dog - 20
red dog - 10
black dog - 15
white dog - 5, sort by order or override the same key
```

# Set
- [Difference between HashMap and HashSet](https://www.geeksforgeeks.org/difference-between-hashmap-and-hashset/)
- _[HashMap vs HashSet vs Hashtable – HashMap, HashTable, TreeMap and LinkedHashMap with Examples](http://javainfinite.com/java/hashmap-vs-hashset-vs-hashtable-hashmap-hashtable-examples/)_
- [HashMap和HashSet的区别](http://www.importnew.com/6931.html)

## HashSet

![](http://javainfinite.com/wp-content/uploads/2016/10/collections-1.png)

![](https://cdncontribute.geeksforgeeks.org/wp-content/uploads/hashsetVshashmap.png)

- HashSet implements __Set__ interface.
- using `Add()`;
- HashSet is slower then HashMap
- __No duplicate is allowed__, make sure have equals() and hashCode()
- >HashMap internally uses hashing to store or add objects, HashSet internally uses HashMap object to store or add the objects.
- >HashSet requires only one object add(Object o) .

``` java
public static void main(String[] args) 
{ 

    HashSet<String> hs = new HashSet<String>(); 
    // Adding elements to the HashSet 
    hs.add("geeks"); 
    hs.add("practice"); 
    hs.add("contribute"); 

    System.out.println("Before adding duplicate values \n\n" + hs); 

    // Addition of duplicate elements 
    hs.add("geeks"); 
    hs.add("practice"); 

    System.out.println("\nAfter adding duplicate values \n\n" + hs); 

    // Addition of null values 
    hs.add(null); 
    hs.add(null); 

    // Displaying HashSet elements 
    System.out.println("\nAfter adding null values \n\n" + hs); 
}
```

# Enum type
- _[enum type](http://www.java2s.com/Book/Java/Language-Basics/enum_type.htm)_
- _[Java Enums](https://www.w3schools.com/java/java_enums.asp)_
- _[**A Guide to Java Enums**](https://www.baeldung.com/a-guide-to-java-enums)_

> Comparing Enum Types using “==” Operator
> EnumSet and EnumMap, efficient and compact 
``` java
enum Level {
  LOW,
  MEDIUM,
  HIGH
}

//access
Level myVar = Level.MEDIUM;

//switch
Level myVar = Level.MEDIUM; 
switch(myVar) {
    case LOW:
    System.out.println("Low level");
    break;
    case MEDIUM:
        System.out.println("Medium level");
    break;
    case HIGH:
    System.out.println("High level");
    break;
}

//for loop
for (Level myVar : Level.values()) {
  System.out.println(myVar);
}
```

# Loops
[Loops in Java](https://www.geeksforgeeks.org/loops-in-java/)
## While (Entry control loop)
``` java
while (boolean condition)
{
   loop statements...
}
```

## For (Entry control loop)
``` java
for (initialization condition; testing condition;increment/decrement)
{
    statement(s)
}
```

### Enhanced For loop after java 5
[For-each loop in Java](https://www.geeksforgeeks.org/for-each-loop-in-java/)
- not appropriate when you want to modify the array
- do not keep track of index
- only iterates forward over the array in single steps
- cannot process two decision making statements
``` java
for (T element:Collection obj/array)
{
    statement(s)
}
```

## do while (Exit control loop)
``` java
do
{
    statements..
}
while (condition);
```

# Java Access Modifiers
[Java Access Modifiers](https://howtodoinjava.com/oops/java-access-modifiers/)
Java access modifiers – __public__, __protected__, __private__ and __default__

## Controlling Access
>public > protected > package-private (or default) > private
> - __public__ – accessible everywhere
> - __protected__ – accessible in the __same package__ and in __sub-classes__
> - __default__ – accessible only in the __same package__
> - __private__ – accessible only in the __same class__

## Other Modifiers
[Modifiers, Access Control, and Class Design](http://www.dmc.fmph.uniba.sk/public_html/doc/Java/ch15.htm)
> - The static modifier for creating class methods and variables
> - The abstract modifier, for creating abstract classes and methods
> - The final modifier, for finalizing the implementations of classes, methods, and variables
> - The synchronized and volatile modifiers, which are used for threads and which you'll learn more about on Day 18, "Multithreading"
> - The native modifier, which is used for creating native methods, which you'll learn about on Day 21, "Under the Hood"
>
>Usual order: ACCESS static abstract synchronized volatile final native

### static
> While static has a specific meaning for where a method or variable is stored in a program's runtime memory in those languages, static simply means that it's stored in the class in Java. 

[Java: when to use static methods](https://stackoverflow.com/questions/2671496/java-when-to-use-static-methods)

__`Obj.someMethod` / instead of calling new Util().method(arg), call Util.method(arg), or method(arg) with static imports.__

> - If you are writing utility classes and they are not supposed to be changed.
> - If the method is not using any instance variable.
> - If any operation is not dependent on instance creation.
> - If there is some code that can easily be shared by all the instance methods, extract that code into a static method.
> - If you are sure that the definition of the method will never be changed or overridden. As static methods can not be overridden.

---

>A static method is one type of method which doesn't need any object to be initialized for it to be called. Have you noticed static is used in the main function in Java? Program execution begins from there without an object being created.
>
> Consider the following example:
``` java
class Languages 
{
    public static void main(String[] args) 
    {
        display();
    }

    static void display() 
    {
        System.out.println("Java is my favorite programming language.");
    }
}
```

---

> Use __instance__ variables when : Every variable has a different value for different object. E.g. name of student, roll number etc..
>
> Use __static__ variables when : The value of the variable is independent of the objects (not unique for each object). E.g. number of students.

## final
> - (final classes): To prevent others from subclassing your class. If your class has all the capabilities it needs, and no one else should be able to extend its capabilities, then that class should be final.
> - (final classes): For better efficiency. With final classes you can rely on instances of only that one class (and no subclasses) being around in the system, and optimize for those instances.
> - (final method): The only reason to declare a method final is efficiency, like accessor methods.(Private methods are effectively final, as are all methods declared in a final class.)

## abstract
> - Abstract classes are classes whose sole purpose is to provide common information for subclasses. Abstract classes can have no instances.
> - Abstract methods are methods with signatures, but no implementation. Subclasses of the class which contains that abstract method must provide its actual implementation.

# OOP
ref: _[lynda](https://www.lynda.com/Java-tutorials/Java-Essential-Training-Students/375490-2.html)_

- Data instance(keep private), constructor, method(get(accessor) and set(mutator) method), override(need `implement comparable`)
- Encapsulation 封装
    - hide instance data definition
    - Protects the integrity instance data
    - hides the method implementations
    - prevents outside access with protective barrier
- Avoid null references
- Inheritance(is-A) 继承, _It is the mechanism in java by which one class is allow to inherit the features(fields and methods) of another class._
    - Extends, for inheritance
    - Implements, for interface
    - abstract class
- Polymorphism 多态性

### Inheritance
[ref](https://www.geeksforgeeks.org/inheritance-in-java/)

- Super Class
- Sub Class
- Reusability

``` java
class derived-class extends base-class  
{  
   //methods and fields  
}  
```

- Single Inheritance
- Multilevel Inheritance, _class one, class two extends one, class three extends two_
- **Hierarchical Inheritance**(one to more), _class one, class two extends one, class three extends one_
- **Multiple Inheritance(Through Interfaces)**(more to one), _interface one, interface two, interface three extends one,two, class child implements three_
- **Hybrid Inheritance(Through Interfaces)**

#### Important facts in Java
- Default superclass
- Superclass can only be one
- Inheriting Constructors
- Private member inheritance

### Abstract class
[ref](https://dzone.com/articles/when-to-use-abstract-class-and-intreface)

> An abstract class is a class that is declared abstract—it may or may not include abstract methods. **Abstract classes cannot be instantiated**(no `Shape shape = new Shape()`), but they can be subclassed. An abstract class may have static fields and static methods.

> **May or may not include abstract methods**

Something more than an interface

``` java
abstract class MotorVehicle
{
    String name;
    int fuel;

    MotorVehicle(){
        name = "MotorVehicle"
        fuel = 0;
    }

    MotorVehicle(String name, int f){
        this.name = name;
    }

    MotorVehicle(String name){
        this.name = name;
        fuel = f;
    }

    int getFuel()
    {
         return this.fuel;
    }

    abstract void run();
}

class Car extends MotorVehicle
{
    Car(){
        super("Car");   //using the super constructor
    }

    Car(String name){   //customized constructor
        super(name);
    }

    void run() //must need to implement run()
    {
        print("Wrroooooooom");
    }
}
```

### Interface
[ref]()
interfaces are having only abstract methods, **has no code only pattern**, class implement interface **must** including all method in interface. They are **empty body**.

``` java
// I say all motor vehicles should look like this:
interface MotorVehicle
{
    void run();
    int getFuel();
}

// My team mate complies and writes vehicle looking that way
class Car implements MotorVehicle
{

    int fuel;
    void run()          //need implement
    {
        print("Wrroooooooom");
    }

    int getFuel()       //need implement
    {
        return this.fuel;
    }
}
```

- **[What is the difference between an interface and abstract class?](https://stackoverflow.com/questions/1913098/what-is-the-difference-between-an-interface-and-abstract-class)**
- [Difference between Abstract Class and Interface in Java](https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/)
- [Interfaces and Abstract Classes](https://inst.eecs.berkeley.edu/~cs61b/fa07/lectures/lect9-2x2.pdf)

![](https://i.imgur.com/37w2Xhb.png)

![](https://i.imgur.com/mOA9Jqo.png)

#### Methods and Declarations in Interface
- `abstract` method (no need to sign, no braces)
- `default` method, `default public void newDefaultMethod(){....}`, _to modify interface instead of breaking all the codes_
- `static` method, _can not be overriden in implementation class_
- Constant Declarations, `public static final int NORTH = 0;`

``` java
interface NewInterface { 
  
    // static method 
    static void hello() 
    { 
        System.out.println("Hello, New Static Method Here"); 
    }

    // default method
    default void newDefaultMethod(){....}
  
    // Public and abstract method of Interface 
    void overrideMethod(String str); 
} 
```

- [Interface Default Methods in Java 8](https://dzone.com/articles/interface-default-methods-java)
- [Static method in Interface in Java](https://www.geeksforgeeks.org/static-method-in-interface-in-java/)

### Polymorphism
> Polymorphism is that it allows you to have the __same name__ for a method, but it __acts differently__ based on the class that has that method defined.

- Used when classes are inherited from a superclass
- Methods of the subclass may need to behave differently
- Same method name, but different implementation

# UML Unified Modeling Language

# Design Pattern
## Singleton Design Pattern
restricts the instantiation of a class to one "single" instance.

### using `instance`
``` csharp
//var policy = new Policy();
//var insureName = policy.getInsuredName();

var insureName = Policy.Instance.getInsuredName();
```

### Policy class change
_readonly on lock_
``` csharp
// using lock
private static readonly object _lock = new object();

private static Policy _instance;
public static Policy Instance{
    get {
        lock(_lock){ // lock for multi-theads
            if(_instance == null){
                _instance = new Policy();
            }
            return _instance;
        }
        
    }
}
//ctor shortcut

public Policy()
{

}
```

_readonly on Instance(shorter and cleaner)_
``` csharp
private static readonly Policy _instance = new Policy();

public static Policy Instance{
    get{
        return _instance;
    }
}

public Policy(){

}
```

## Decorator Pattern(Wrapper Pattern)
ref: _[Decorator Pattern](https://www.dotnettricks.com/learn/designpatterns/decorator-design-pattern-dotnet)_, _[装饰模式ref1](https://blog.csdn.net/ytdxyhz/article/details/79539026)_, _[装饰模式ref2](https://blog.csdn.net/qian520ao/article/details/82529890)_, _[装饰模式ref3](https://www.ibm.com/developerworks/cn/java/j-lo-cdi-decorator-pattern/index.html)_, _[Decorator 模式](https://www.ibm.com/developerworks/cn/java/j-lo-cdi-decorator-pattern/index.html)_

1. Decorator used to add new functionality to an existing object without changing its structure.
2. 修饰模式, or 装饰模式
3. 
> - 抽象组件(Component) ：定义装饰方法的规范
> - 被装饰者(ConcreteComponent) ：Component的具体实现，也就是我们要装饰的具体对象。
> - 装饰者组件(Decorator) ：持有组件(Component)对象的实例引用，该类的职责就是为了装饰具体组件对象，定义的规范。
> - 具体装饰(ConcreteDecorator) ：负责给构件对象装饰附加的功能。

### Sample Code
_Vehicle_, __Component Interface.__
``` csharp
public interface Vehicle
{
    string Make { get; }
    string Model { get; }
    double Price { get; }
}
```

_HondaCity : Vehicle_, __ConcreteComponent class.__
``` csharp
public class HondaCity : Vehicle
{
    public string Make
    {
        get { return "HondaCity"; }
    }

    public string Model
    {
        get { return "CNG"; }
    }

    public double Price
    {
        get { return 1000000; }
    }
}
```

_VehicleDecorator: Vehicle_, __Decorator Class.__
``` csharp
public abstract class VehicleDecorator : Vehicle
{
    private Vehicle _vehicle;

    public VehicleDecorator(Vehicle vehicle)
    {
        _vehicle = vehicle;
    }

    public string Make
    {
        get { return _vehicle.Make; }
    }

    public string Model
    {
        get { return _vehicle.Model; }
    }

    public double Price
    {
        get { return _vehicle.Price; }
    }
}
```

_SpecialOffer : VehicleDecorator_, __ConcreteDecorator class.__
``` csharp
public class SpecialOffer : VehicleDecorator
{
    public SpecialOffer(Vehicle vehicle) : base(vehicle) { }

    public int DiscountPercentage { get; set; }
    public string Offer { get; set; }

    public double Price
    {
        get
        {
            double price = base.Price;
            int percentage = 100 - DiscountPercentage;
            return Math.Round((price * percentage) / 100, 2);
        }
    }
}
```

_Program_
``` csharp
class Program
{
    static void Main(string[] args)
    {
        // Basic vehicle
        HondaCity car = new HondaCity();

        Console.WriteLine("Honda City base price are : {0}", car.Price);

        // Special offer
        SpecialOffer offer = new SpecialOffer(car);
        offer.DiscountPercentage = 25;
        offer.Offer = "25 % discount";

        Console.WriteLine("{1} @ Diwali Special Offer and price are : {0} ", offer.Price, offer.Offer);

        Console.ReadKey();
    }
}
```
## Iterator Pattern

# Others
## Random
`Math.random()`, [0.0,1.0)

## Parse
``` java
Integer.parseInt("-1");
```

## Compareable Interface
For override `compareTo()`
``` java
public class Address implements Comparable{
    //.....

    @Override
    public int compareTo(Object a){
        Address addr = (Address)a;
        int zip1 = Integer.parseInt(this.zipcode);
        int zip2 = Integer.parseInt(addr.zipcode);
        if(zip1 < zip2){
            return -1;
        }else if(zip1 > zip2){
            return 1;
        }else{
            return 0;
        }
    }
}
```

##  异或 Exclusive or
[XOR gate](https://en.wikipedia.org/wiki/XOR_gate)
[136.single-number.md](https://github.com/azl397985856/leetcode/blob/master/problems/136.single-number.md)
- 任何数和本身异或则为0
- 任何数和 0 异或是本身
![](https://wikimedia.org/api/rest_v1/media/math/render/svg/bb10ca18971cdff957c113f053f8c3d26b462560)

``` java
//https://leetcode.com/problems/single-number/submissions/
class Solution {
    public int singleNumber(int[] nums) {
        int r = 0;
        for(int i = 0; i < nums.length; i++){
            r = r ^ nums[i];
        }
        return r;
    }
}
```

## Bit Operator
Check post of [Bit Operate with Unsigned Integer]

# Reference
- [Java Algorithms](https://www.youtube.com/watch?v=f5OD9CKrZEw&list=PLGLfVvz_LVvReUrWr94U-ZMgjYTQ538nT)
- [MisterBooo/LeetCodeAnimation](https://github.com/MisterBooo/LeetCodeAnimation)