---
title: 在 Windows 下优雅使用 npm 和 git bash
date: 2018-06-28 12:27:11
tags: 
- Windows
- Tips
categories: Config
---

一直都很像优雅的在 Windows 上也使用 npm 还有 bash, 自从在 Linux上发现Visual Studio Code 的强大之后，觉得自家亲儿子 Windows 应该更好的表现吧，那我们来试一试。

# Git Bash

下载好 [Visual Stuido Code](https://code.visualstudio.com/Download), 并且装好 [Git](https://git-scm.com/), 如果没有右下就弹出来一个小窗口提示没有找到。

熟悉的界面，然后我们打开 Veiw -> Integrate Terminal (Ctrl + `), 选择 bash，哇这界面真是太有好了，接下来就可以像在 Linux 下一样配置 git 了

![](https://i.imgur.com/Ez5V81A.png "Integrate Terminal")

![](https://i.imgur.com/iT8lzMF.png "Integrate Terminal bash")

# NPM

下载好 [Nodejs](https://nodejs.org/zh-cn/), 日常安装一波

我们可以正常在 cmd 中使用 `npm`，但是会发现在 git bash 中找不到 `npm` 的命令

![](https://i.imgur.com/yjBCbk0.png "cmd npm")

感觉不科学，于是打开node的安装目录发现是由npm这个命令的，那说明没有加到bash的path中去

![](https://i.imgur.com/1AvaIPy.png "npm path")

打开 Git Bash, 会发现顶部有默认的command path

![](https://i.imgur.com/LY5ukEp.png "git bash")

如果没有发现npm，则需要自己添加，如下

``` bash
#pwd check npm path
nano ~/.bash_profile
echo PATH=$PATH /c/Program Files/nodejs/npm/
```

![](https://i.imgur.com/xMU4cf0.png "echo PATH=$PATH /c/Program Files/nodejs/npm/")

重新启动下 Git Bash 或 Visual Studio Code 的 terminal，完美找到命令

![](https://i.imgur.com/aGGib3l.png "check in bash")

愉快的编辑博客起来

![](https://i.imgur.com/ZyxdMQM.png "Finish")

# Windows 下 Git 的一个错误
刚刚转移到windows下push就出现了一个问题 `LF will be replaced by CRLF`， 解决方法：

``` bash
git config core.autocrlf false
```

# Reference
- [关于 LF will be replaced by CRLF 问题出现的原因以及解决方式](https://blog.csdn.net/wowoniuzailushang/article/details/54317129)
- [git warning: LF will be replaced by CRLF in 解决办法](https://www.cnblogs.com/kpengfang/p/5962233.html)