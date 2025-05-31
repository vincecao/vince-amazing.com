---
title: PHP Notes
date: 2018-06-30 10:36:14
tags: 
- PHP
- Html
categories: Notes
---

PHP hypertext preprocessor, in **server side**, only show html in page source / open source / generate dynamic webpage

>- Server-side scripting language (on server) - js(client side)
>- Not a compiled language
>- Designed for use with HTML
>- Provide more flexibility than HTML alone
>- Syntax is similar to C, Java, Perl

# Script vs Program

>Script
>- Run in response to an event
>- Performs instructions from top to bottom
>- Little or no user interaction

>Program
>- Run even when not responding to events
>- Jumps around instructions
>- Lots of user interaction

`<?php phpinfo(); ?>`

# Dynamic Text (Echo)

``` php
<body>
    <?php echo "Hello World!"; ?><br />
    <?php echo "Hello" . " World!"; ?><br />
    <?php echo 2 + 3; ?>
</body>
```

# Operational Trail

![](https://i.imgur.com/undefined.png)

# Comments

``` php
<?php
    // single-line comments are like this

    # or like this (less common)

    /* double-line comments are written
    like this, so that you can keep typing
    and typing
    */
?>
```

# Variables / String

Start with `$`, and can not be [reserved](http://www.php.net/manual/en/reserved.php)

Static, global and locally scoped
- Global declared outside functions, `define()`
- Local restricted to a function or class
- Variable declared static do not disappear when function is completed, `STATIC $count = 0;`
- Superglobals, predefined variables available in all scopes(FORM, `$_POST`, `$_GET`;SERVER, `$_SERVER`, `$_HTTP_SERVER_VARS` removed; state, `$_COOKIE`, `$SESSION`;Env, `$_ENV`, `$HTTP_ENV_VARS` deprecated)

``` php
#- Must start with $
$myVariable #Camel Case
$this_variable
$this-variable #avoid to use
$product3
$_book #avoid to general use because php may use that
$__bookPage #avoid to use

#- must followed by a letter or underscore, can not contain space
$1 #wrong, can not start with number

#- Case Sensitve:
$item != $Item

#- pre-assigned
$_SEVER['PHP_SELF']; #an index variable that returns the current script being excuted, including its name and path
$_GET; #associative array
$_POST; #associative array

<?php

    $var1 = 10;
    echo $var1;

    echo "<br />";

    $var1 = 100;
    echo $var1;

    echo "<br />";

    $var2 = "Hello world";
    echo $var2;

?>

<?php
  
    echo "Hello World<br />";

    $greeting = "Hello";
    $target = "World";
    $phrase = $greeting . " " . $target; #Hello World, String join is . not +
    echo $phrase;
    ?>
    <br />
    <?php

    echo "$phrase Again<br />"; #Hello World Again
    echo '$phrase Again<br />'; #$phrase Again, as one char
    echo "{$phrase} Again<br />"; #Hello World
  
?>

//source: https://stackoverflow.com/questions/2596837/curly-braces-in-string-in-php

//source: http://php.net/manual/en/language.types.string.php#language.types.string.parsing.complex
<?php

 $a = '12345';

// This works:
 echo "qwe{$a}rty"; // qwe12345rty, using braces
 echo "qwe" . $a . "rty"; // qwe12345rty, concatenation used
 
 echo "qwe" , $a , "rty"; // for display both txt and variables, separated by commas will faster then concatenation

// Does not work:
 echo 'qwe{$a}rty'; // qwe{$a}rty, single quotes are not parsed
 echo "qwe$arty"; // qwe, because $a became $arty, which is undefined

?>

<?php echo $book; ?> /*Only single string, can be shorthand of echo */ <?= $book; ?>

//heredoc for long String situation
<?php
    $a = "A";
    $b = "B";
    $c = "C";
    $d = "D";

    $heredoc = <<< EOT
    In $a by $b, $c and $d
    EOT;

    echo $heredoc;

    //Assigned by value
    $foo = "Bob"; $bar = $foo;
    
    //Assigned by reference, this links vars
    $bar = &$foo;
?>
```

# Functions (String)

[String Functions](http://php.net/manual/en/ref.strings.php)

``` php
<?php

    $first = "The quick brown fox";
    $second = " jumped over the lazy dog.";

    $third = $first;
    $third .= $second;
    echo $third; #The quick brown fox jumped over the lazy dog.

?>
<br />

Lowercase: <?php echo strtolower($third); ?><br />
Uppercase: <?php echo strtoupper($third); ?><br />
Uppercase first: <?php echo ucfirst($third); ?><br />
Uppercase words: <?php echo ucwords($third); ?><br />
<br />

Length: <?php echo strlen($third); ?><br /> # (length of the string) 45
Trim: <?php echo "A" . trim(" B C D ") . "E"; ?><br /> #(trim version of " B C D ") AB C DE
Find: <?php echo strstr($third, "brown"); ?><br /> #brown fox jumped over the lazy dog. (get the word follow the brown)
Replace: <?php echo str_replace("quick", "super-fast", $third); ?><br /> #(replace quick by super-fast) The super-fast brown fox jumped over the lazy dog.
<br />

Repeat: <?php echo str_repeat($third, 2); ?><br /> #(Repeat 2 times)
Substring: <?php echo substr($third, 5, 10); ?><br /> #(get substring, from index 2 to index 10) uick brown
Find position: <?php echo strpos($third, "brown"); ?><br /> #(lcoate "brown") 10
Find character: <?php echo strchr($third, "z"); ?><br /> #(locate "z") zy dog.

strip_tags(); // remove tag and only show the string
strip_tags($a, "<p><a>");
implode('', $a); // Join array elements with a string
```

# Number

## Integers

``` php
<?php
    $var1 = 3;
    $var2 = 4;
?>

<?php echo ((1 + 2 + $var1) * $var2) / 2 - 5; ?><br />
<br />

<?php echo abs(0 - 300);?><br /> #300 (绝对值 Absolute)
<?php echo pow(2,8);?><br /> #2^8 (幂 Exponential)
<?php echo sqrt(100);?><br /> #10 (开方 Square)
<?php echo fmod(20,7);?><br /> #Get the remainder of 20/7 (模 Modulo), % is also mod
<?php echo rand();?><br /> # Random
<?php echo rand(1,10);?><br /> #Random within range (Random (min,max))
<br />

+= : <?php $var2 += 4; echo $var2; ?><br /> #var2 = var2 + 4
-= : <?php $var2 -= 4; echo $var2; ?><br />
*= : <?php $var2 *= 3; echo $var2; ?><br />
/= : <?php $var2 /= 4; echo $var2; ?><br />

#Bitwise (&, |, ^, ~, <<, >>)is same as c and c++
$a ^ $b; #(Xor: Bits that are set in $a or $b but not both are set.)
~ $a; #(Not: Bits that are set in $a are not set, and vice versa.)

** : <?php var1 ** var2 ;?><br /> #power, php 7
intdiv(): <?php intdiv(361, 60) ;?><br /> #integer divide php 7
<br />

<?php $var2++; echo $var2; ?><br />
<?php $var2--; echo $var2; ?><br />
<br />

<?php
    // PHP will convert a string to an integer
    // but it is sloppy programming
    echo 1 + "2 houses";
?>
```

## Floating Points

``` php
<?php echo $float = 3.14; ?><br />
<?php echo $float + 7; ?><br />
<?php echo 4/3; ?><br />

<?php echo 4/0; ?><br /> #illegal
<br />

<?php echo round($float, 1);   ?><br /> #round, 3.1
<?php echo ceil($float);       ?><br /> #向上取整 Ceiling， round up, 4
<?php echo floor($float);     ?><br /> #向下取整 Floor， round down, 3
<br />

<?php $integer = 3; ?>

<?php echo "Is {$integer} integer? " . is_int($integer); ?><br /> #true, and output 1 as true
<?php echo "Is {$float} integer? " . is_int($float); ?><br />
<br />
<?php echo "Is {$integer} float? " . is_float($integer); ?><br />
<?php echo "Is {$float} float? " . is_float($float); ?><br />
<br />
<?php echo "Is {$integer} numeric? " . is_numeric($integer); ?><br />
<?php echo "Is {$float} numeric? " . is_numeric($float); ?><br />
<br />

```

# Array

``` php
<?php

    $numbers = array(4,8,15,16,23,42);
    echo $numbers[0]; #4
?>
<br />

<?php $mixed = array(6, "fox", "dog", array("x", "y", "z")); ?>
<?php echo $mixed[2]; ?><br />
<?php //echo $mixed[3]; ?><br /> #array string conversion, us a error, use print_r
<?php //echo $mixed ?><br />

<?php echo $mixed[3][1]; ?><br /> #y

<?php $mixed[2] = "cat"; ?>
<?php $mixed[4] = "mouse"; ?> #update the array
<?php $mixed[] = "horse"; ?> #add into Array

<pre>
<?php echo print_r($mixed); ?> #A
</pre>

<?php 
    //PHP 5.4 added the short array syntax.
    $array = [1,2,3];
?>
```

## Associative Arrays

An object-indexed collection of objects (key-value pair)

``` php
<?php $assoc = array("first_name" => "Kevin", "last_name" => "Skoglund"); ?>
<?php echo $assoc["first_name"]; ?><br />
<?php echo $assoc["first_name"] . " " . $assoc["last_name"]; ?><br />

<?php $assoc["first_name"] = "Larry"; ?>
<?php echo $assoc["first_name"] . " " . $assoc["last_name"]; ?><br />

<?php // echo $assoc[0]; ?><br /> #will bring error

<?php $numbers = array(4,8,15,16,23,42); ?>
<?php $numbers = array(0 => 4, 1 => 8, 2 => 15, 3 => 16, 4 => 23, 5 => 42); ?>
<?php echo $numbers[0]; ?>

<pre>
<?php
    $description = [
        'Earth' => 'Mostly harmless',
        'Marvin' => 'Andriod'
    ];
    $description['Zaphod'] = 'President';

    print_r($description);
    echo "Earth is {$description['Earth']}";
?>
</pre>

```

## Array Functions

[ref.array](http://php.net/manual/en/ref.array.php)

``` php
<?php $numbers = array(8,23,15,42,16,4); ?>

<?php echo count($numbers); ?><br /> #6 (统计)
<?php echo max($numbers);   ?><br /> #(最大值)
<?php echo min($numbers);   ?><br /> #(最小值)
<br />
<pre> #more friendly to see
<?php sort($numbers);  print_r($numbers); ?><br /> #排序, old is not existed, sort in place.
<?php rsort($numbers); print_r($numbers); ?><br /> #倒序，Reverse sort
</pre>

<?php
    usort($friends, function($a, $b){
        return [$a['last'], $a['first']] <=> [$b['last'], $b['first']];
    })
?>

<br />
<?php echo $num_string = implode(" * ", $numbers); ?><br /> #Implode， output as a string
<?php print_r(explode(" * ", $num_string)); ?><br /> #Explode， # return to an array by "*"
<br /> 

<?php echo in_array(15, $numbers); // returns T/F ?><br /> #if it is contain 15
<?php echo in_array(19, $numbers); // returns T/F ?><br />

<?php array_push();?> #push on the end of the array
<?php array_pop();?> #remove the element at the end of array
<?php array_shift();?> #put element onto the front of array
<?php array_unshift();?> #remove the element at the beginning of array
<?php array_unique();?> #take of all duplicate elements in the array
<?php array_search();?> #search for a value and return the key
<?php array_rand();?> #output a random elements from array
```

# Booleans

PHP regard as false:

- Zero as number or string(0, 0.0, '0')
- Empty string('', "")
- Empty Array
- NULL(including unset variables)
- SimpleXML created from empty tags.

``` php
<?php
    $result1 = true; 
    $result2 = false;
?>
Result1: <?php echo $result1; ?><br /> # change to string is 1
Result2: <?php echo $result2; ?><br />  # change to string is nothing

result2 is boolean? <?php echo is_bool($result2); ?>
<br />

<?php
    $number = 3.14;
    if( is_float($number) ) {
        echo "It is a float.";
    }
?>
```

# NULL and empty

``` php
#null NULL is same
<?php
    $var1 = null;
    $var2 = "";
?>

var1 null? <?php echo is_null($var1); ?><br /> #1
var2 null? <?php echo is_null($var2); ?><br /> #empty
var3 null? <?php echo is_null($var3); ?><br /> #undefined is 1
<br />

var1 is set? <?php echo isset($var1); ?><br /> #empty is null
var2 is set? <?php echo isset($var2); ?><br /> #1
var3 is set? <?php echo isset($var3); ?><br /> #empty is null
<br />

<?php // empty: "", null, 0, 0.0, "0", false, array() ?>

<?php $var3 = "0"; ?> #0 is also empty
var1 empty? <?php echo empty($var1); ?><br /> #1
var2 empty? <?php echo empty($var2); ?><br /> #1
var3 empty? <?php echo empty($var3); ?><br /> #1
```

# Set type - Type juggling & casting

``` php
php类型转<br />
<?php $count = "2 cats"; ?>
Type: <?php echo gettype($count); ?><br /> #string

<?php $count += 3; ?>
Type: <?php echo gettype($count); ?><br /> #integer

<?php $cats = "I have " . $count . " cats."; ?>
Cats: <?php echo gettype($cats); ?><br /> #string
<br />

Type Casting<br />
<?php settype($count, "integer"); ?> #change the origin
count: <?php echo gettype($count); ?><br /> #integer

<?php $count2 = (string) $count; ?> #do not change the origin
count: <?php echo gettype($count); ?><br /> #integer
count2: <?php echo gettype($count2); ?><br /> #string
<br />

<?php $test1 = 3; ?>
<?php $test2 = 3; ?>
<?php settype($test1, "string"); ?>
<?php (string) $test2; ?>

test1: <?php echo gettype($test1); ?><br /> #change the string
test2: <?php echo gettype($test2); ?><br /> #not change
```

# Constants

Use function to define the constants.

``` php
<?php
    $max_width = 980; #variable

    define("MAX_WIDTH", 980); #use function to define the constants, not use $ because is not a varible
    echo MAX_WIDTH;
?>
<br />
<?php // can't change the value
    MAX_WIDTH = MAX_WIDTH + 1
    echo MAX_WIDTH;
?>

<?php // can't even redefine it
    define("MAX_WIDTH", 981);
    echo MAX_WIDTH;
?>
```

# Condition

## if

``` php
if ($a > $b) {
    echo "a is larger than b";
} elseif ($a < $b) {
    echo "a is smaller than b";
} else {
    echo "a is equal to b";
}

if ($a > $b) :
    echo "a is larger than b";
elseif ($a < $b) :
    echo "a is smaller than b";
else :
    echo "a is equal to b";
endif;
```

## Switch

``` php
<?php
    $a = 2;

    switch ($a) {
        case 0: echo "a equals 0<br />"; break;
        case 1: echo "a equals 1<br />"; break;
        case 2: echo "a equals 2<br />"; break;
        case 3: echo "a equals 3<br />"; break;
        default: echo "a is not 0, 1, 2, or 3<br />"; break;
    }

?>

<?php
    // 中国年历
    $year = 2013;
    switch (($year - 4) % 12) {
        case  0: $zodiac = 'Rat';     break;
        case  1: $zodiac = 'Ox';       break;
        case  2: $zodiac = 'Tiger';   break;
        case  3: $zodiac = 'Rabbit';   break;
        case  4: $zodiac = 'Dragon';   break;
        case  5: $zodiac = 'Snake';   break;
        case  6: $zodiac = 'Horse';   break;
        case  7: $zodiac = 'Goat';     break;
        case  8: $zodiac = 'Monkey';  break;
        case  9: $zodiac = 'Rooster'; break;
        case 10: $zodiac = 'Dog';     break;
        case 11: $zodiac = 'Pig';     break;
    }
    echo "{$year} is the year of the {$zodiac}.<br />";
?>

<?php // case with multiple values

    $user_type = 'student';

    switch ($user_type) {
        case 'student':
            echo "Welcome!";
            break;
        case 'press': # same as "press" && "admin"
        case 'admin':
            echo "Hello!";
            break;
    }
?>
```

## Ternary Operator(?:)

``` php
$var = (condition) ? value if true : value if false;

$unit_cost = 0; //20
$wholesale_price = $unit_cost ?: 25; //if dont have unit cost, unit cost is 0, then sign 25
echo $wholesale_price;
```

## Null-Coalesce Operator in PHP 7

``` php
//php 7
$unit_cost = 0;
$wholesale_price = $unit_cost ?? $non_exist ?? 25; //if dont have unit cost, unit cost is 0 will not count, then sign 25
echo $wholesale_price;
```

# Loops

## While / DoWhile

``` php
<?php
    $i = 0;
    while ($i < 10){
        $i++;
        if....break;
    }

    while ($i < 10):
        $i++;
        if....break;
    endwhile;

    do {
        $i++;
        echo ...;
    }while($i<10);

?>

```

## foreach

``` php
<?php
    #regular array
    $ages = array(4,8,15,16,23,42);

    foreach($ages as $age) {
        echo "Age: {$age}<br />";
    }

     foreach($ages as $age):
        echo "Age: {$age}<br />";
    endforeach;
?>

<br />
<?php
    #assoc. array
    $person = array(
                "first_name" => "Kevin", 
                "last_name"  => "Skoglund",
                "address"    => "123 Main Street",
                "city"       => "Beverly Hills",
                "state"      => "CA",
                "zip_code"   => "90210"
            );

    foreach($person as $attribute => $data) {
        $attr_nice = ucwords(str_replace("_", " ", $attribute)); #replace "_" with " "
        echo "{$attr_nice}: {$data}<br />";
    }
?>

<br />
<?php
    $prices = array("Brand New Computer" => 2000,
                    "1 month of Lynda.com" => 25,
                    "Learning PHP" => null);

    foreach($prices as $item => $price) {
        echo "{$item}: ";
        if (is_int($price)) {
            echo "$" . $price;
        } else {
            echo "priceless";
        }
    echo "<br />";
    }

?>
```

## Continue

Skip this loop, `continue(2)` means skip two layers of loops

``` php
<?php
    for ($count=0; $count <= 10; $count++) {
        if ($count % 2 == 0) { continue; }
        echo $count . ", ";
    }
?>
```

## Break

Stop the whole process, `break(2)` means end two layers of loops

``` php
<?php
    for ($count=0; $count <= 10; $count++) {
        if ($count == 5) {
            break;
        }
        echo $count . ", ";
    }
?>
```

# Array Pointers

``` php
<?php
    
    $ages = array(4,8,15,16,23,42);

    // current: 当前
    echo "1: " . current($ages) . "<br />"; #4

    // next: 进一
    next($ages);
    echo "2: " . current($ages) . "<br />"; #8

    next($ages);
    next($ages);
    echo "3: " . current($ages) . "<br />"; #16

    // prev: 向前一个
    prev($ages);
    echo "4: " . current($ages) . "<br />"; #15

    // reset: 重置回第一个
    reset($ages);
    echo "5: " . current($ages) . "<br />"; #4

    // end: 移到最后
    end($ages);
    echo "6: " . current($ages) . "<br />"; #42

    // 移到下一个， null
    next($ages);
    echo "7: " . current($ages) . "<br />"; #(empty)

?>
<br />

<?php
    reset($ages);

    // foreach 的原理

    # for database array use
    while($age = current($ages)) {
        echo $age . ", "; #4,8,15,16,23,42
        next($ages);
    }
?>
```

# Funcitons

大小写可表示同一方程, 不能重新定义方法
Functions MUST be defined before they can be called, Unlike variables, function names are not case sensitive

[ref_video](https://www.lynda.com/PHP-tutorials/Passing-arguments-value-reference-function/418256/452144-4.html)

``` php
<?php
    //pass by value
    function name($arg1, $arg2) {
        statement;
    }

    //pass by refferece
     function name(&$arg1, &$arg2) {
        statement;
    }

    name();
?>
```

## list() - sign array varbles to value

``` php
<?php
    $my_array = array("Dog","Cat","Horse");

    list($a, $b, $c) = $my_array;
    echo "I have several animals, a $a, a $b and a $c.";
?>

<?php
    function test($a, $b){
        ..
        return array($c, $d);
    }

    $result = test($a, $b);
    echo $result[0]
    echo $result[0]

    #or

    list($result_1, $result_2) = test($a, $b);
    echo $result_1;
    echo $result_2;
?>
```

## Scope

``` php
<?php

    $a = "outside";
    function foo(){
        global $a; #now $a is global varible.
    }
?>
```

## Default Argument

``` php
<?php
    function foo($a = 0){
       return ($a + 1) ;
    }

    echo foo(1); #2
    echo foo(); #1
    echo foo(null); #(empty)
?>
```

# Object

## Access the Object

``` php
$car->$color;
$car = new Cars();
```

# display file / gif
``` php
<?php
    $ourFileName = "apple.txt";
    //$ourFileName = "BanS_USC.gif";
    $ourFileHandle = fopen($ourFileName, "r") or die("can't open file");
    $file = fread($ourFileHandle, filesize($ourFileName));
    fclose($ourFileHandle);
    header("Content-type: text/plain");
    //header("Content-type: image/gif");
    echo $file;
?>
```

# redirection script
``` php
<?php if($_POST["submit"]): ?>
<?php header("Location: $_POST[url]"); ?>
<?php else: ?>

<html>
<head><title>Test Redirection</title></head>
<body>
    <h2>Test Redirection</h2>
    <form method="post" action="">
    <select name="url">
        <option selected=selected value="">Select a Site</option>
        <option value="http://www.usc.edu">USC</option>
        <option value="http://www-scf.usc.edu/~csci571/index.html">Class Home Page</option>
        <option value="http://www.yahoo.com">Yahoo!</option>
    </select> <input type="submit" value="Go" name="submit">
    </form>
</body>
</html>

<?php endif; ?>
```

# Write
``` php
$ourFileHandle = fopen($ourFileName,"w") or die("can't open file");
fwrite($ourFileHandle, $num);
fclose($ourFileHandle);
```

# Sessions & Cookie

## Set Cookie
``` php 
<?php
setcookie("username2", "Barney Rubble , time() + 3600 );
?>
```

## View Cookie
``` php
<?php
if(isset($_COOKIE["username2"])) {
    echo "The new cookie <b>username2</b> contains the value " . $_COOKIE["username2"];
}
?>
```

## Sample session
Session store identifier in local cookie in client browser, `$_SESSION` creates a `private ID`, `session_start()` and `session_destroy()`
``` php
<?php
    session_start();
    if (!$_SESSION["count"])
        $_SESSION["count"] = 0;
    if ($_GET["count"] == "yes")
        $_SESSION["count"] = $_SESSION["count"] + 1;
    echo "<h1>".$_SESSION["count"]."</h1>";
    
    if(isset($_POST["logout"])) {
        session_destroy();
        unset($_SESSION);
    }
?>

<a href="session.php?count=yes">Click here to count</a>
```

# Database with MySQL
sample
``` php
<html><body>
<?php
    // setup a query
    $link = mysql_connect($host, $user, $password);
    mysql_select_db($database);
    $query = "SELECT * FROM $table WHERE id = '$id' ;" ;
    $result = mysql_query($query);

    //Display a table
    echo "<table>" ;
    While ($row = mysql_fetch_array($result)) {
    echo "<tr>" ;
        foreach ($row as $key => $value) {
            echo "<td>$value</td>" ;
        }
        echo "</tr>" ;
    }
    echo </table> ;
    mysql_close($link);
?>
</body></html>
```




# External Server Files

`.inc.php / .php`

### include

Attempts to continue even if file is missing.

### require

Stops if the external file isn's available.

### once

Prevents the file from being included more than once.

## Usage

``` php
<?php include './includes/para.html'; ?>
<?php include_once './includes/para.html'; ?>
<?php require './includes/para.html'; ?>
```

## $siteroot with external links

``` php
//main php file
<?php $siteroot = '/xxx/xxx/xxx'; ?>

//....external php file: include.php
<a href="<?php $siteroot; ?>/xxx.php">Link</a>
```

## get_include_path

``` php
<?php
    set_include_path(get_include_path() . PATH_SEPARATOR . 'xxx/xxx/xxx'); #define the root path
?>

//...

<?php require `para.html`; ?>
```

# GET / POST with Form

``` php
//get, will have query string, get for search, can make bookmark
<form method="get" action="<?= $_SERVER['PHP_SELF']; ?>"> //$_SERVER['PHP_SELF']always avalible
  <p>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
  </p>
  <p>
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
  </p>
  <p>
    <label for="comments">Comments:</label>
    <textarea name="comments" id="comments"></textarea>
  </p>
  <p>
    <input type="submit" name="send" id="send" value="Send Comments">
  </p>
</form>

//post, post for submit password
<form method="post" action="<?= $_SERVER['PHP_SELF']; ?>">
  <p>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
  </p>
  <p>
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
  </p>
  <p>
    <label for="comments">Comments:</label>
    <textarea name="comments" id="comments"></textarea>
  </p>
  <p>
    <input type="submit" name="send" id="send" value="Send Comments">
  </p>
</form>


<pre>
    <?php
    if ($_GET) {
        echo 'Content of the $_GET array:<br>';
        print_r($_GET);
    } elseif ($_POST) {
        echo 'Content of the $_POST array:<br>';
        print_r($_POST);
    }
    ?>
</pre>
```

# Tools

## Mac

- MAMP
- Apache

## Windows

- WampServer
- XAMPP

# Debug

 `<?php phpinfo();?>`

### Turn on error reporting

[error website](http://php.net/manual/en/errorfunc.constants.php)

- _php.ini_ file:

    ``` ini
    display_errors = On
    error_reporting = E_ALL
    ```
- *runtime_config.php* Code:

    ``` php
    <?php
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', '1');
    //error_reporting(E_ALL);
    //error_reporting(E_ALL | E_STRICT);
    //error_reporting(E_ALL & ~E_DEPRECATED);
    error_reporting();
    ```
- *.htaccess* in Apache Server:
  
    ``` ini
    php_value error_reporting 32767 #E_ALL value
    php_flag display_errors on
    php_value data.timezone America/Los_Angeles
    ```
- *.user.ini* in some Server:
  
    ``` ini
    error_reporting E_ALL
    display_errors = on
    data.timezone America/Los_Angeles
    ```

### Troubleshoot

``` php
echo $variable;
print_r($array);
gettype($variable);
var_dump($variable); #output type + value!!!!
get_defined_vars(); #use with all defined var, var_dump(get_defined_vars());
debug_backtrace(); #use inside the function, var_dump(debug_backtrace());
```

### Third party

- xdebug
- DBG
- FirePHP(in firebug inside firefox)

# Reference

- [PHP-Essential-Training](https://www.lynda.com/PHP-tutorials/PHP-Essential-Training/592510-2.html)
- [http://phpbook.phpxy.com/34751](http://phpbook.phpxy.com/34751)
- [Learning PHP](https://www.lynda.com/PHP-tutorials/Introducing-PHP/418256-2.html)