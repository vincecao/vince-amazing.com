---
title: Let IE9 Support Flex?
date: 2018-07-02 16:01:03
tags: 
- Javascript
- CSS
categories: Notes
---

Flex学会后发现真是相当的方便，打算全面使用，但是一直觉得在各个浏览器上会出现问题，做个小笔记

Flex is a very elegant way for different browser sizes. However, it may fail in some case. Here is a note for testing when meeting flex failed. 

# Can I use

经过查询 [Can I Use](https://caniuse.com/#search=flex) 网站的意外的发现支持的还不错，基本主流都已经可以支持了。

Check the flex supporting in [Can I Use](https://caniuse.com/#search=flex) with modern broswers.

# Autoprefixer

通过 [Autoprefixer](http://autoprefixer.github.io/) 补全各种前缀以防浏览器未更新至最新的版本。

Add the experiment prefix automatically using [Autoprefixer](http://autoprefixer.github.io/).

# fixie.js

[Fixie.js](https://github.com/sfioritto/real-world-flexbox/tree/master/demos/flexie) 是一个大佬制作的 js 脚本，让 IE9 等完美支持 flex,当然以防万一还是先 Autoprefixer 过后

One way to use [Fixie.js](https://github.com/sfioritto/real-world-flexbox/tree/master/demos/flexie) simulating the flex features under IE9. Suggesting to use it after Autoprefixer.

``` html
<head>
<!--[if lte IE 9]>

      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>

      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js" type="text/javascript"></script>

      <script src="flexie.js" type="text/javascript"></script>

    <![endif]-->
</head>
```

# Reference
- [flex现在的兼容性如何 ](https://segmentfault.com/q/1010000005990624)
- [现在实现flexbox 的策略和工具（flexbox兼容到IE8的跨浏览器解决方案）](https://blog.csdn.net/haihuan2004/article/details/50445398)