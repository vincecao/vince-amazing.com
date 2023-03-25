---
title: vConsole
date: 2019-05-30 16:12:39
tags:
- Csharp
categories: Rice
---

# [vConsole](https://github.com/vincecao/vconsole)
A small extension dll library for helping debuging

## Usage
- Download the `dll` file of the project
- Add as a reference and import
- make a instance and running as a popup window form
![](https://i.imgur.com/r4RqG5p.png)

``` csharp
//import
using vConsole2;

//constructor
v = vConsole.Instance;
v.Show();

//Log
v.Log("log something");
```

## Features
_v0.1_
- Modify font size, transparent, and theme preset
- Pin to top windows
- Corss-thread error avoid with invock and delegated

## Screenshots
![](https://i.imgur.com/ig56Gs5.png)

![](https://i.imgur.com/TNEglrk.png)

## Download
[dll file - v0.1](https://github.com/vincecao/vconsole/raw/master/vConsole2/bin/Debug/vConsole2.dll)
