---
title: 新的神坑 720s 13ARR Ryzen
date: 2018-04-20 20:50:40
tags:
- 教程
- 剁手 / Chopping Hands
categories: Config
---

_`Update` - 4/27/2018 - [alpha](https://osdn.net/projects/manjaro/storage/) 版 Manjaro - kde 现已可以下载_
[Change Selected Pacman Branch](https://wiki.manjaro.org/index.php?title=Change_Selected_Pacman_Branch): `sudo pacman-mirrors --api --set-branch {branch} #stable, testing, unstable`, `sudo pacman-mirrors --fasttrack 5 && sudo pacman -Syyu`.

[Remove all the files](https://bbs.archlinux.org/viewtopic.php?id=96523): `pacman -Rsn <name>`

![](https://i.imgur.com/R5Engzz.png)


到手一台美帝想 720s APU，不买不知道，发现好像是个大坑，然而本着不折腾不死星人的属性，依然勇敢地往里面跳了下去。

## 小小的前言

_Ubuntu 18.04 with Cinnamon_
![](https://i.imgur.com/Bi4VTe1.jpg "Ubuntu 18.04 with Cinnamon")


我看中这台机子是因为他的 U，Ryzen 7 2700U，自带 vega 10 的集显，因为是第一个 APU 的机子，买前认真做了功课。可惜太新了，在英文网站上转了一圈，发现就只有一个德国的大叔做了几个高大上的[测试视频](https://www.youtube.com/watch?v=A_e16kOurJE&t=583s)，其他地方都只能看到这个 U 的几个横向对比图。买来后才发现可能入了天坑，才发现国内的评论大家都讨论得很激烈，我大贴吧比 reddit 网友分析的靠谱多了。。基本大家讨论两点坑：__联想设置的温度墙__，和 __单通道的内存__。

_和U盘高度对比_
![](https://i.imgur.com/qQ63AYzh.jpg "和U盘高度对比")

_帅气逼人的logo_
![](https://i.imgur.com/D1E1gsYh.jpg)

_和老的 MBP13 对比_
![](https://i.imgur.com/x2GUBHch.jpg)

![](https://i.imgur.com/ws6TY1dh.jpg)

![](https://i.imgur.com/CCQBSaTh.jpg)

![](https://i.imgur.com/GDxUMWWh.jpg)

_和 Thinkpad yoga 14 对比_
![](https://i.imgur.com/h5yejvYh.jpg)

![](https://i.imgur.com/vnfPQxrh.jpg)

到手后因为没有近期类似的机子对比，只能总体而言：

- 性能不错
- 键盘手感很好，逆天的好
- 屏幕大小还有清晰度都不错
- 外观不错而且轻薄！比 Thinkpad yoga 14 轻太多了，也比 13late 的 MBP13 略微小巧方便些，整体高度和一个U盘差不多。。

但是也有几个不足：

- 自带的螃蟹 8821CE 网卡太渣了，win 下好像没啥大感觉，然后转到 linux 下就发现这就是一个大天坑，当晚就和thinkpad yoga 14 上的 intel 网卡给换了一下
- 感觉品控比较一般，到手第一天windows刚设置完，自己升级了 1709，指纹模块就瞬间崩了。和售后换了台新的让发过来，整个过程也是很磨人。拿来后发现两台机子的屏幕颜色好像也有细微的区别，即使同一个 AMD 设置的色温，新的台会显得更冷一点
- 屏幕转轴两侧有略微倾斜，貌似网上外国网友也有吐槽的，不过不细看发现不了。

_更换网卡ing_
![](https://i.imgur.com/JEl5DRz.jpg "更换网卡ing")

## 天坑正题

因为到手的720s这个ryzen mobile的平台非常新，本来自信满满的继续manjaro，发现没一个可以正常boot，清一色卡在`started tlp` 或者 `header tlp`。最新的 elementary os 可以勉强点亮但显卡怎么都不驱动。继续做大量research后发现，貌似amd觉得没必要支持老的，把 Win7 还有 kernel 415 之前的兼容都给砍了。这样一来，只好找出厂 415 后的 distro。目前发现的有三种方法，一个是 [__ubuntu的18.04__]((https://wiki.ubuntu.com/BionicBeaver/ReleaseNotes))， [__arch__](https://www.archlinux.org/download/) 的自己配置还有就是 [__opensuse tumbleweed__](https://software.opensuse.org/distributions/tumbleweed) 了。我尝试了好多，后来还是觉得18.04比较靠谱，虽然是beta2版，但可能会比较稳。。。

_Kubuntu 18.04 with Kde_
![](https://i.imgur.com/IL5lBUO.jpg "Kubuntu 18.04 with Kde")

**Ubuntu 18.02 的安装配置 参见下一篇**