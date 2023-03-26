---
title: 部署你的博客到 Gitlab page
date: 2018-06-21 19:35:43
tags: 
- 教程
- Blog
categories: Config
---

之前有个玩笑说 github 的选手都跑路到 gitlab 了，今天小小捣鼓了下，看到也有类似的 Page，工具而且更加友善，蹭个热度把博客迁到了 Gitlab Page。

和 Github 不一样，Gitlab 可以让你不用本地 generate 而直接在线 host 一个静态博客框架，油管上官方的教程也非常的酷炫，不过这次弄了一个空白 html example 进行尝试，步骤基本类似

# Fork 一个模板

选择你的一个模板，官网有一个专门的页面["GitLab Pages examples"](https://gitlab.com/groups/pages)供选择, 教程选择`plain-html`

![](https://i.imgur.com/Rr8qGaE.png "选择一个模板")

fork 并加入自己的 space

![](https://i.imgur.com/8Aw2YnD.png "选择 Plain-html")

![](https://i.imgur.com/61VHj5d.png "fork")

## 修改 html 页面并使用 CI/CD 工具

简单修改下默认的 public 文件夹中的 index.html，打开左侧菜单栏中的 `CI/CD`，查看是不是运行

![](https://i.imgur.com/6DHMlZl.png "CI/CD")

如果有便不用操作，直接等出现`passed`即可，如果没有便点下`Run Pipelines`

![](https://i.imgur.com/QWj6Dxk.png "等出现`passed`即可")

## 一些设置

点开左侧栏设置，会发现有个 page 的选项，并且直接生成了一个domain。我们可以打开测试一下是不是正常显示

![](https://i.imgur.com/OxPxUg3.png "Page link")

如果完美显示，我们还需要做一些设置，进入settings -> General -> Advanced settings , 取消 `fork`

![](https://i.imgur.com/rjpKWBQ.png "取消 fork")

在 `Rename repository` 中改域名，如果想为 Github 那样的 .io 域名，便在 path 输入`username.gitlab.io`，如图， Project name 可以随意。

![](https://i.imgur.com/SYEqyjF.png "改域名和project name")

## 完成！

我们这下再去 page 就会发现域名已经变了，完美，这下就愉快的push 吧，把博客部署上去。如果想要 Jekyll，还可以参考[油管的教程](https://www.youtube.com/watch?v=TWqh9MtT4Bg&feature=youtu.be)，CI/CD自带终端，省时又省力。

![](https://i.imgur.com/d1kg57q.png "再次检查 page")

![](https://i.imgur.com/5Zl2Byd.png "成功")

## Reference

- https://pages.gitlab.io
- https://docs.gitlab.com/ce/user/project/pages/