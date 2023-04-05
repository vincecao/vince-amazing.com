---
title: NodeJS Notes
date: 2019-01-29 19:34:55
tags:
- Javascript
- Nodejs
categories: Notes
---

Nodejs is **asynchronously**. It works in global namespace.

## Console output

``` js
var hello = "Hello World";

console.log('Test ${hello}'); //Test ${hello}
console.log(`Test ${hello}`); //Test Hello World

console.log(__dirname);
console.log(__filename); //full path with filename

```

## Import other module

### path Module

``` js
var path = require("path");
console.log(`${path.basename(__filename)}`); //only file name

path.join(__dirname, 'dir1', 'dir2', 'dir3') // .../dir1/dir2/dir3
```

### uitl Module

``` js
var util = require("util");
util.log(xxxxxx); // have timestamp
```

### v8 Module
check memory usage
``` js
var v8 = require("v8");
var util = require("util");

util.log(v8.getHeapStatistics());
```

### readline Module
``` js
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Question?", function(answer){
    console.log(answer);
    rl.setPrompt(`Question again after ${answer}?`);
    rl.prompt(); //question again
    rl.on('line', function(answer_2){ //new answer
        console.log(answer_2);
        rl.close(); //close readline
    })
})

rl.on('close', function(){
    //when rl is close, do this
    process.exit(); //finally exit the process
})

```

### event Module
[ref](http://nodejs.cn/api/events.html)
``` js
var EventEmitter = require('events').EventEmitter;
var util = require('util'); // for inherits

var Person = function(name) {
	this.name = name;
};

util.inherits(Person, EventEmitter);

var ben = new Person("Ben Franklin");

ben.on('speak', function(said) { //EventEmitter.on()， 注册监听器

	console.log(`${this.name}: ${said}`);

});

ben.emit('speak', "You may delay, but time will not."); // EventEmitter.emit(), 调用监听器
```

### child_process Module

``` js
var exec = require("child_process").exec; //for small process
exec("neofetch", function(err, stdout){
    if(err){
        throw err;
    }

    console.log("Neo Fetch");
    console.log(stdout);
});

//-------

var spawn = require("child_process").spawn; //spawn for long and large process
var cp = spawn("node", ["alwaysTalking"]);

cp.stdout.on("data", function(data) {
	console.log(`STDOUT: ${data.toString()}`);
});

cp.on("close", function() {
	console.log("Child Process has ended");
	process.exit();
});

setTimeout(function() {
	cp.stdin.write("stop");
}, 4000);
```

### fs Module

#### Read Dir

``` js
var fs = require("fs");
var files = fs.readdirSync('./lib');//read file synchronously
console.log(files);

//-------

fs.readdir('./lib', function(err, files){ //asynchronously, callback function envolve;
    if(err){throw err;}
    console.log(files);
});
console.log(files);
```

#### Read Files

``` js
var fs = require("fs");
var contents = fs.readFileSync("./lib/sayings.md", "UTF-8");//if no UTF-8, it will show binary
console.log(contents);

//async way
fs.readFile("./lib/sayings.md", "UTF-8", function(err, contents){
    if(err){throw err;}
    console.log(contents);
});


//---
var stats = fs.statSync(file); //stats.isFile() will show if it is file or dir
```

#### Readable file streams 
To handle large data

``` js
var fs = require("fs");
var stream = fs.createReadStream("./chat.log", "UTF-8");
var data = "";

stream.on("data", function(chunk){
	process.stdout.write(`  chunk: ${chunk.length} |`);
	data += chunk;
});
console.log(contents);

stream.once("data", function(){
	console.log("\nStarting Reading File\n");
});

stream.on("end", function(){
	console.log(`\nStarting Reading File ${data.length}\n`);
});
```

#### Create Files and append (writeFile)

``` js
var fs = require("fs");
var md = `

Sample Markdown Title
=====================

Sample subtitle
----------------

* point
* point
* point

`;

fs.writeFile("sample.md", md.trim(), function(err) {
	console.log("File Created");
});

fs.appendFileSync("sample.md", `\nthis is a append contents`);
```

#### Write file in stream way

``` js
var fs = require("fs");
var stream = fs.createWriteStream(name + ".md");
stream.write("Start writing")
stream.write("| stream added")
//keep add stream
stream.close();
```

#### Create new Dir

``` js
var fs = require("fs");
if (fs.existsSync("lib")) { //check dir if is exist
	console.log("Directory already there");
} else {
	fs.mkdir("lib", function(err) { //can not work when dir exist
		if (err) {
			console.log(err);
		} else {
			console.log("Directory Created");
		}
	});
}
```

#### Rename & remove

``` js
var fs = require("fs");

//rename in Sync
fs.renameSync("./lib/project-config.js", "./lib/config.json");//rename
console.log("Config json file renamed");

//rename in Async, also work as remove
fs.rename("./lib/notes.md", "./notes.md", function(err) { //mv
	if (err) {
		console.log(err);
	} else {
		console.log("Notes.md moved successfully");
	}
});

//remove in Sync way
try {
	fs.unlinkSync("./lib/config.json");
} catch (err) {
	console.log(err);
}

//remove in Async way
fs.unlink("notes.md", function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("Notes.md removed");
	}
});
```

``` js
var fs = require("fs");

//rename the dir, same as file

//remove the dir
fs.readdirSync("./logs").forEach(function(fileName) { //unlink/remove all the files before
	fs.unlinkSync("./logs/" + fileName);
});

fs.rmdir("./logs", function(err) { //can not remove until it is empty
	if (err) {
		throw err;
	}
	console.log("Logs directory removed");
});
```

### HTTP / HTTPS Module
HTTPS need to supply security certificate in server side



## Create new module

save as _/lib/Person.js_
``` js
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Person = function(name) {
	this.name = name;
};

util.inherits(Person, EventEmitter);

module.exports = Person;
```

load module
``` js
var Person = require("./lib/Person");

var ben = new Person("Ben Franklin");
var george = new Person("George Washington");

george.on('speak', function(said) {
	console.log(`${this.name} -> ${said}`);
});

ben.on('speak', function(said) {
	console.log(`${this.name}: ${said}`);
});

ben.emit('speak', "You may delay, but time will not.");
george.emit('speak', "It is far better to be alone, than to be in bad company.");
```

## Process Objects

``` js
//check current process arg varible
console.log(process.argv);

//simple grab function
function grab(flag) {
	var index = process.argv.indexOf(flag);
	return (index === -1) ? null : process.argv[index+1];
}

var greeting = grab('--greeting');
var user = grab('--user');

if (!user || !greeting) {
	console.log("You Blew it!");
} else {
	console.log(`Welcome ${user}, ${greeting}`);
}

//usage: node app --user Vince --greeting 'Hello World'
```

### Console write

``` js
process.stdout.write("hello, world\n\n\n\n");
```

### Console listener

``` js
//data listener
process.stdin.on('data', function(data){
    process.stdout.write('\n', data.toString().trim() + '\n'); //repeat echo the input
});
```

### Process Exit

`process.exit()`

``` js
//exit listener
process.on('exit', function(){
    process.stdout.write('Process Exit'); //repeat echo the input
});

```

## Timer

``` js
var waitTime = 3000;
console.log("wait"...);

//setTimeout once
setTimeout(function(){
    console.log("done");
}, waitTime);
```

``` js
var currentTime = 0;
var waitInterval = 500;

//always call when interval reach
var interval = setInterval(function() {
	currentTime += waitInterval;
	console.log(`waiting ${currentTime/1000} seconds`);
}, waitInterval);

//to stop the interval after 3000
setTimeout(function(){
    clearInterval(interval);
}, 3000);
```

``` js
//update current line inside each interval
process.stdout.clearLine();
process.stdout.cursorTo(0);
process.stdout.write(`waiting ... ${p}%`);
```

