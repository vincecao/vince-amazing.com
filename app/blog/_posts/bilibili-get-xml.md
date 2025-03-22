---
title: b站转跳到弹幕xml的网站
date: 2017-05-02 20:58:05
tags:
- Javascript
- Anime
categories: Rice
---

发现b站下载弹幕文件的一个小方法，<del>目前还没有找到js获取view source的方法，所以目前好像只能适用于b站中有提供“追番”的番剧的视频</del> (_为嘛切换到Firefox就都能显示在chrome下没有“追番”的视频就会有问题嘛_)，有兴趣的小伙伴尝试看看，等我以后的找到方法的更新了 【立个flag先

<a href="javascript:(function(){var f=document.createElement('script');f.src='/res/turn-to-bilibili-xml/main.js';document.body.appendChild(f);})();" alt="bilibili弹幕文件专挑书签">b站转跳xml</a> <-在这里拖到书签荚使用。

# 截图

## 转跳前

![](https://i.imgur.com/qOKIw9u.png '转跳前')

## 转跳后

![](https://i.imgur.com/ktbpy2C.png '转跳后')

# 代码

水平还比较菜，也很简单也就几行：

``` javascript
var patt = new RegExp('cid=(.+?)&a');
var cid = patt.exec(document.documentElement.innerHTML);
if (cid != null){
 location = "http://comment.bilibili.com/" + cid[1] + ".xml";
}else{
 alert("好像这个页面VINCE还没能找到方法")
}
```
