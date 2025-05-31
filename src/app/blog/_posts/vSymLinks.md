---
title: vSymLinks - for Windows Symbolic Links
date: 2019-06-05 19:42:54
tags:
- Csharp
- UWP
categories: Rice
---
[vSymLinks](//github.com/vincecao/vsymlinks), a GUI verison of Mklink for Windows creating Symbolic Links. Using original mklink in Windows cmd command. Please also check my blog [Symbolic Links](/blog/2018/06/28/symbolic-link/). Also using [Desktop App Converter](//www.microsoft.com/en-us/p/desktop-app-converter/9nblggh4skzw) to submited to Windows Store. **(Need open "developer mode" to work)**

<a href='//www.microsoft.com/store/apps/9n4skx6602h2?cid=storebadge&ocid=badge'><img src='https://assets.windowsphone.com/13484911-a6ab-4170-8b7e-795c1e8b4165/English_get_L_InvariantCulture_Default.png' alt='English badge' style='width: 127px; height: 52px;'/></a>

_Lineng Cao_

# Screenshot
![](//github.com/vincecao/vsymlinks)

# Original mklink command in Windows
``` bash
# create a file symbolic link so that typing pad.exe will allow you to launch notepad.exe.
mklink pad.exe notepad.exe

# create a symbolic link called fruit that points directly to the folder oranges.
mklink /D c:\fruit c:\apples\bananas\oranges
```

# vSymLinks Usage
- Drag the file or folder into the form
- Click convert and you can move the Symbolic Links in `SymbolicLinks` to anywhere

# Download

## Github
[Exe file](https://github.com/vincecao/vSymLinks/raw/master/vSymlink/bin/Debug/vSymlink.exe)

## Windows Store
<a href='//www.microsoft.com/store/apps/9n4skx6602h2?cid=storebadge&ocid=badge'><img src='https://assets.windowsphone.com/85864462-9c82-451e-9355-a3d5f874397a/English_get-it-from-MS_InvariantCulture_Default.png' alt='English badge' style='width: 284px; height: 104px;'/></a>