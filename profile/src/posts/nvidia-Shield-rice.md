---
title: Nvidia Shield 折腾记－吐血篇
date: 2016-06-24 02:00:27
tags:
- 剁手 / Chopping Hands
- Android
categories: Rice
---

手上这台shield也有些年头了，是刚出来第一批时候让哥哥从美国稍回来的。期间遇到了一次难得的电池问题召回，结果不但没拿回去还白送我了一台，就卖掉赚了点零花钱，但老的那台就注定不能在用原生的系统了，因为会通过原生固件强制报废电池。

这是后话，而今天在打算捣鼓ubuntu之前已经刷到了[RR的3.6.9 MM](http://forum.xda-developers.com/shield-tablet/development/rom-ressurrection-remix-m-t3327192)，相当稳定流畅。

然后我就看到了这个帖子[《Linux4Tegra R23.1/R24.1 beta for the Shield Tablet》](http://forum.xda-developers.com/shield-tablet/development/running-ubuntu-natively-shield-tablet-t2985238)
<!--more-->
## 一条不归路

首先先得解决MultiROM(MRom)的问题，根据xda教程[《MultiROM v32 - unofficial port》](http://forum.xda-developers.com/shield-tablet/development/multirom-v30-unofficial-port-t3025355 "MultiROM v32 - unofficial port")

MRom 是装Ubuntu的关键，装成功成功之后似乎就可以直接用.mrom的类似镜像ghost般写入。
但是第一个问题出现了， MRom 在主页上最后更新是LP(Lollipop)的，并没有MM(Marshmallow)，进去能看见几秒的MROM的页面，但是竟然不能使用触摸。一番费大力寻找之后，[点这查看这个回复贴是藏的这么深](http://forum.xda-developers.com/shield-tablet/development/multirom-v30-unofficial-port-t3025355/page34 "不容易")。

终于在这个不起眼的尾页发现了大神新更新的两个MM下的[Modified TRWP_MM版](https://www.androidfilehost.com/?fid=24499762636005537 "Modified TRWP_MM版") ` twrp-multirom-20160422-EXPERIMENTAL-shieldtablet.img ` 与[MROM.zip](https://www.androidfilehost.com/?fid=24499762635998042 "MROM.zip") ` multirom-20160410-v33-UNOFFICIAL-shieldtablet.zip ` 刷机包文件，加上之前就得到的[触摸文件](https://www.androidfilehost.com/?fid=23991606952608123 "MultiROM Touch Support")，看来是要大功告成了!


_一切都似乎非常顺利 MultiRom 到此为止成功在MM bootloader 下刷入，并顺利进入multiROm修改过后的twrp界面。_

![](http://i.imgur.com/9WWWYGt.jpg "正在刷入Linux4Tegra")

_然而，Linux4Tegra 却还不支持MM的bootloader_，开心的刷入Linux4Tegra结果一直都在“黑英达节界面”一切又绕回了原点，到后来只能全部弄回LP。

![](http://i.imgur.com/ZuQvsfZ.jpg "眼看就要成功")

![](http://i.imgur.com/OFjHqwG.jpg "黑英达界面")

## 一切又回到起点

按照官方文档， 并且手头上存有2.2的官方ota包，从中提取出了 ` boot.img, blob ` 还有 ` tegra<version>.dtb ` 。
*因为实在已经刷了太多遍了*

> 可参照[官方文档](http://docs.nvidia.com/gameworks/content/devices/shield_flashing_from_image.htm)

在windows上adb中按次序依次刷入：

```
fastboot flash recovery twrp-multirom-20150909-UNOFFICIAL-shieldtablet.img
fastboot flash boot boot.img
fastboot flash staging blob
fastboot flash dtb tegra124-tn8-p1761-1270-a04-e-battery.dtb

fastboot reboot
```

并重启，并进入recovery刷入

> MultiROM(上文中有新的v33): [multirom-20150909-v32a-UNOFFICIAL-shieldtablet.zip](https://www.androidfilehost.com/?fid=24052804347811950)

> MultiROM Touch Support (only needed if not upgrading): [multirom_shieldtablet_touch_support.zip](https://www.androidfilehost.com/?fid=23991606952608123)

> Modified recovery_LP版的 (based on TWRP 2.8.7.0): [twrp-multirom-20150909-UNOFFICIAL-shieldtablet.img](https://www.androidfilehost.com/?fid=24052804347811951)

> <ins>按照xda教程[《Linux4Tegra R23.1/R24.1 beta for the Shield Tablet》](http://forum.xda-developers.com/shield-tablet/development/running-ubuntu-natively-shield-tablet-t2985238)的描述，应该只用把一个镜像包文件（快照），一个 ` New_boot.img ` 按照指令 ` fastboot boot new_boot.img -c "console=tty1 fbcon=map:10 fbcon=rotate:2 fbfix" `</ins> 。

_重启，再次进入modified recovery, 刷入《Linux4Tegra R23.1/R24.1 beta for the Shield Tablet》中提供的.mrom系统文件_` Linux4TegraR241beta.mrom `_.

![](http://i.imgur.com/KQPwoiM.jpg "又回到LP了，好久不见的画面")

*这里不知道什么原因，外置的otg加U盘无法使用在recovery里，于是又得绕回去，因为系统已经是MM了，但bootloader回到了LP的，还好已经装了MultiRom, 尝试了重装原版 ` twrp-2.8.7.1-shieldtablet.img ` 再装了第二个第三方LP的ROM在internal下*

目前折腾了一个晚上还卡在这一步，实在一下子研究不透了，现在依然在尝试,还是卡在ubuntu进入页面

啊，好想玩上Ubuntu，像这个[小哥](http://wincak.besaba.com/category/shield-tablet/)一样。。。

## 6/28/2016 更新

大功告成，通过新刷入一个cm12.1的rom（这似乎非常有用，不然一直卡在英伟达界面上），重新在LP的bootloader下刷入所有之前都有涉及过的文件（MultiROM，MultiROM Touch Support，Modified recovery_LP版的 (based on TWRP 2.8.7.0)）并采用Linux4TegraR241beta固件。

![](http://i.imgur.com/9i8bcES.png)

以下是一个小的演示视频：

{% youtube H14cy29nWWM %}
