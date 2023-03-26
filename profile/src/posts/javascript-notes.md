---
title: Javascript Notes
date: 2019-02-18 11:07:52
tags:
- Javascript
categories: Notes
---

# Global
undeclared variables are global, `a = "A";`

# Change to Int
`x = parseInt(123);`

# Events
## Mouse Events
- `onclick`
- `ondblclick`
- `onmouseover`
- `onmouseout`

## Keyboard Events
- `onkeydown`
- `onkeyup`

## Object Events
- `onload`
- `onunload`
- `onresize`
- `onscroll`
  
# Window object

## properties
- `window.closed`
- `window.history`
- `window.location`
- `window.navigator`
- `Window.parent`
- `Window.self`
- `Window.status`

## Methods
- `open()`, `window.open("newURL","New Window","toolbar,status,resizable")`
- `blur()`, remove focus
- `close()`
- `focus()`
- `resizeBy()`

# Invoke the code
- `<body onload="[open new window code];"> </body>`
- `<a href="javascript:[open new window code]; void 0;">click me to open a new window!</a>`
- `<input type="button" value="click me to open a new window" onclick="[open new window code];" />`

# Document Object

## properties
return Collection
- `Document.anchors`
- `Document.applets`
- `Document.body`
- `Document.cookie`
- `Document.forms`
- `Document.images`, `document.images.name` / `document.images[index]`
- `Document.lastModified`

### foreground and background in document
- `document.fgColor = "white"`
- `document.bgColor = "black";`

Methods
- `Document.close()`
- `Document.open()`
- `Document.write()`

## Document find form way
- `<button onclick="myFunction(this.form.fname)">Try it</button>`, only can used inside the form
- `<button onclick="myFunction(document.forms[0].fname)">Try it</button>`
- `<button onclick="myFunction(document.myForm.fname)">Try it</button>`

``` html
<!DOCTYPE html>
<html>
<body>

<form name="myForm">
  First Name: <input type="text" name="fname" value="Donald"><br>
  Last Name: <input type="text" name="lname" value="Duck">
  <button onclick="myFunction(this.form.fname)">Try it</button>
</form>

<p>Click the button to display the number of form elements in the document.</p>
<p id="demo"></p>

<script>
function myFunction(obj) {
  var x = obj.value;
  document.getElementById("demo").innerHTML = x;
}
</script>

</body>
</html>

```

# History Object
`window.history.length;`

# addEventListener
It does not overwrite existing event handlers.
- `document.getElementById("myBtn").addEventListener("click", displayDate);`
- `element.addEventListener("click", function(){ alert("Hello World!"); });`

# Function
Functions are a type of object
``` javascript
    function compute_area() { return this.length * this.width}
    var rect = new Object();
    rect.length = 10; rect.width = 20;
    rect.area = compute_area; //passing the method
    ans = rect.area; //invoke the method
    
    function Rectangle(l, w)
    { this.length = l; this.width = w;
    this.area = compute_area; }
    . . .
    var rect1 = new Rectangle(150, 100);
    var rect1_area = rect1.area;
```

# Copy by value / reference
![](https://i.imgur.com/gOmLmLJ.jpg)

# Strings
- `str.length`
- `str.tolowerCase()`, `str.toupperCase()`
- `str.indexOf()`
- `str.charAt()`
- `str.substring(indexA, indexB)`

# Array
No associative arrays allow

``` javascript
var cars = ["Saab", "Volvo", "BMW"];
var cars = new Array("Saab", "Volvo", "BMW");

var person = new Array();
person["firstname"] = "John";
person["age"] = 41;
person[0]; #error

```

## Arrays are Objects
Object way: `var person = {firstName:"John", lastName:"Doe", age:46};`

## Array Properties
- `var x = cars.length;`
- `var y = cars.sort();`
- `concat()`, join two or more arrays
- `indexOf()`
- `pop()`, remove the last element
- `push()`, add a new element at the end
- `reverse()`, reverse the order of elements

## forEach
``` javascript
array1.forEach(function(element) {
  console.log(element);
});

var sandwiches = [
	'tuna',
	'ham',
	'turkey',
	'pb&j'
];

//or var sandwiches = document.querySelectorAll('.sandwich');

sandwiches.forEach(function (sandwich, index) {
	console.log(index);
	console.log(sandwich);
});
```

# Loop
- for loop, `for (i = 0; i<len; i++){...}`
- forin loop, `for (x in persoon){...}`
- while loop, `while (condition){...}`

# Element Attr
- `element.getAttibute(attributeName)`, `div1.getAttribute('align');`
- `element.setAttribute(name, value)`, `setAttribute("name", "helloButton")`
- `element.removeAttribute()`, `removeAttribute("align")`
- `element.hasAttribute(name)`, `foo.hasAttribute("bar")`

# Style
`element.style.xxx = yyyy`

E.g.
- `document.getElementById("div-id").style.background = 'url('+image+')';`
- `document.getElementById("text").style.letterSpacing = space;`

# JavaScript functions for selecting DOM elements
- `getElementById()`
- `getElementsByTagName()`
- `getElementsByClassName`
- `querySelector()` and/or `querySelectorAll()`

# DOM 

## Properties
- `x.nodeName`
- `x.nodeValue`
- `x.parentNode`
- `x.childNode`
- `x.nodeType`

## Method
- `element.removeChild(childElement)`
- `element.appendChild(childElement)`
- `newEle = element.cloneNode(true)`
  
## Create table Node using DOM

``` html
<!DOCTYPE html>
<html>
<head>
<style>
table, td {
  border: 1px solid black;
}
</style>
</head>
<body>

<p>Click the button to insert new cell(s) at the beginning of the table row.</p>

<table id="myTable">
  <tr >
    <td>11111</td>
    <td>22222</td>
    <td>33333</td>
  </tr>
</table><br>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
    //var table = document.getElementById("myTable");
    var table = document.createElement("table");
    var row = table.insertRow();
    var x = row.insertCell();
    var y = row.insertCell()
    x.innerHTML = "New cell"; //innerHTML way
    y.appendChild(document.createTextNode("New Text Node cell")); //createTextNode way
    document.body.appendChild(table);
}
</script>

</body>
</html>

```

## XML dom operate

`documentElement` do for child operation.

Example 1 - removeChild
``` xml
<bookstore>
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
  <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="web">
    <title lang="en">XQuery Kick Start</title>
    <author>James McGovern</author>
    <author>Per Bothner</author>
    <author>Kurt Cagle</author>
    <author>James Linn</author>
    <author>Vaidyanathan Nagarajan</author>
    <year>2003</year>
    <price>49.99</price>
  </book>
  <book category="web" cover="paperback">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```

``` javascript
var xmlDoc=loadXMLDoc("books.xml");
document.write("Number of book nodes: ");
document.write(xmlDoc.getElementsByTagName('book').length);

document.write("<br>");

//Remove the first book
var firstChild=xmlDoc.getElementsByTagName("book")[0];
xmlDoc.documentElement.removeChild(firstChild);

document.write("Number of book nodes after removing the firstbook: ");
document.write(xmlDoc.getElementsByTagName('book').length); 6.
```

Example 2 - Display Name and Value pairs
``` javascript
text = "<book>";
text = text + "<title>Everyday Italian</title>";
text = text + "<author>Giada De Laurentiis</author>";
text = text + "<year>2005</year>";
text = text + "</book>";
xmlDoc = loadXMLString(text);
x = xmlDoc.documentElement.childNodes;
for (i = 0; i < x.length; i++) {
    document.write(x[i].nodeName);
    document.write(": ");
    document.write(x[i].childNodes[0].nodeValue); // Nodename: x.nodeName / Nodevalue: x.childNodes[0].nodeValue
    document.write("<br>");
}
```

Example 3 - cloneNode / appendChild
``` xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<bookstore>
  <book category="cooking">
    <title lang="en">Everyday Italian</title>
    <author>Giada De Laurentiis</author>
    <year>2005</year>
    <price>30.00</price>
  </book>
    <book category="children">
    <title lang="en">Harry Potter</title>
    <author>J K. Rowling</author>
    <year>2005</year>
    <price>29.99</price>
  </book>
  <book category="web">
    <title lang="en">XQuery Kick Start</title>
    <author>James McGovern</author>
    <author>Per Bothner</author>
    <author>Kurt Cagle</author>
    <author>James Linn</author>
    <author>Vaidyanathan Nagarajan</author>
    <year>2003</year>
    <price>49.99</price>
  </book>
  <book category="web" cover="paperback">
    <title lang="en">Learning XML</title>
    <author>Erik T. Ray</author>
    <year>2003</year>
    <price>39.95</price>
  </book>
</bookstore>
```

``` javascript
xmlDoc=loadXMLDoc("books.xml");
x=xmlDoc.getElementsByTagName('book')[0];
cloneNode=x.cloneNode(true);
xmlDoc.documentElement.appendChild(cloneNode); //clone

//Output all titles
titleList=xmlDoc.getElementsByTagName("title");
for (i=0;i<titleList.length;i++)
{
document.write(titleList[i].childNodes[0].nodeValue); // childNodes[0] can write as childNodes.item(0)
document.write("<br />");
}
```

# JSON process

## XMLHTTPRequest Object
``` javascript
//asynch way
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "xmlhttp_info.txt", true);
  xhttp.send();
}

//jQuery way
$.get('http://example.com', function(responseText) {
    alert(responseText);
});

//synch way
var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();
xmlDoc=xhttp.responseXML;
return xmlDoc;
```

### POST example
``` javascript
window.onload = function(){
    var request = new XMLHttpRequest();
    var params = "UID=CORS&name=CORS";

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    request.open('POST', 'https://www.example.com/api/createUser', true);
    request.setRequestHeader('api-key', 'your-api-key');
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(params);
}
```

### GET example
``` javascript
window.onload = function(){
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };

    request.open('GET', 'https://jsonplaceholder.typicode.com/users/1');
    request.send();
}
```

## Fetch API in ES5
```
const url = "https://stackoverflow.com";
fetch(url)
    .then(
        response => response.text() // .json(), etc.
        // same as function(response) {return response.text();}
    ).then(
        html => console.log(html)
    );
```

## JSON parse
- `eval()`, not secure enough
- `JSON.parse()`, in ES5, recommand

# Reference
- [ES6 forEach() loops with vanilla JavaScript ](https://gomakethings.com/es6-foreach-loops-with-vanilla-javascript/)
- [w3](www.w3schools.com)
- [MDZ](developer.mozilla.org)-
- Slides
- [How to get the response of XMLHttpRequest](https://stackoverflow.com/questions/3038901/how-to-get-the-response-of-xmlhttprequest)