---
title: 在 VS Code 中配置 php
date: 2018-07-03 14:05:44
tags: 
- PHP
- Html
categories: Config
---

# XAMPP

安装 [XAMPP](https://www.apachefriends.org/index.html) 大礼包

# PHP extensions

- [php-intellisense](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-intellisense)
- brapifra.phpserver

# 配置 php.validate.executablePath

Windows
``` json
{
    "php.validate.executablePath": "C:/xampp/php/php.exe"
    //"php.executablePath": "C:/xampp/php/php.exe"
    //"php.executablePath": "C:\\xampp\\php\\php.exe"
}
```
``` json
Linux and macOS
{
    "php.validate.executablePath": "/usr/bin/php"
}
```

# Reference

- [PHP programming in VS Code](https://code.visualstudio.com/docs/languages/php)