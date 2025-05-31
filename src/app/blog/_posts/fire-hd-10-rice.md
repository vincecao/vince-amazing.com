---
title: (7/28/2018 updated) Fire HD 10 tablet 7 Tweaks and Root tutorial
date: 2018-05-29 21:43:33
tags:
- 剁手 / Chopping Hands
- Android
categories: Config
---

_7/28/2018 教程更新, 因为发现又有新的OS `5.6.2.0`， 查了一波资料后又更新了 retyre 大神的`offline root`的方法和 安装 `xposed` 的方法_

_7/28/2018 updated, There is a new verison of ROM `5.6.2.0` coming out， had updated the `offline root` methods and the way to install `xposed` from posts of retyre in XDA website_

# Fire HD 10 2017

我的 Fire 10 也到手一段时间了，99刀美亚减价的时候收的，ebay10刀拍了格壳子。对屏幕尺寸续航比较满意，但是性能弱了点，还有Android的平板环境真是不砸地，真想拿bilibili吐槽，特么连个横屏模式都没有！bilibili白那会还是有的啊！坑爹呢

买来的时候自带的亚马逊桌面强制不让改，还有各种不好用的系统应用，在硬着头皮尝试了一个月后还是root了。

I was lucky that got my Fire 10 on Amazon with $99. I am satisfied with the battery life and screen display but the performance. The android application environment is still torturing me in most of the time.

I finally rooted it for breaking the limitation of not allowing changing default launcher and dozens of badly optimized system apps.

![](https://i.imgur.com/SLuO14x.jpg)

![](https://i.imgur.com/iepxfV1.jpg)

![](https://i.imgur.com/8bsFlDq.jpg)

![](https://i.imgur.com/UPeDU4Y.jpg)

![](https://i.imgur.com/MK9vNCm.png)

![](https://i.imgur.com/xWDOTvI.png)

![](https://i.imgur.com/QaM5bwe.png)

# Root Step / Root 步骤
如平板打不开或卡死需要强刷，见之后的[强刷](#强刷)系列操作

If the Tablet can not wake up or start, it may need to hard flash the ROM. Please check the (Manually Flash) section

## Kingoroot Approach / Kingoroot 方式

（刷机需谨慎，本教程不保证百分百可行性 / The tutorial does not take responsibility for your data and machine. Please take your own risk）- _ref: [source](https://forum.xda-developers.com/hd8-hd10/general/tut-fire-hd-10-7th-gen-2017-root-box-t3726443)_

1. Check the system verison / 确认下系统的版本号

截至目前为止，笔者 FireOS `5.6.0.0`，`5.6.0.1` 和 `5.6.1.0` 都测试过了可以root， `5.6.2.0` 测试 offline 方法可以 root。

This tutorial had successfully rooting with FireOS `5.6.0.0`, `5.6.0.1` and `5.6.1.0`. The tutorial also had a successfully offline root with FireOS `5.6.2.0`.

2. Download Kingoroot / 下载 Kingoroot

没错就是得用下这个软件，至少我尝试的方法是成功了的。

3. Open ADB Debugging / 打开 ADB Debugging

平板进 `Settings/Device Options` 点 `Serial Number` 7次进入 **开发者模式**, 开启 `ADB Debugging`

Select `Settings -> Device Options -> Serial Number(tap 7 times) -> Developer Mode -> ADB Debugging`

4. Open Apps from Unknown Sources /  打开 允许未知来源

进 `Settings/Security`, 打开 `允许未知来源`

Select `Settings/Security -> Apps from Unknown Sources`

5. Adb Devices

在电脑上使用adb，如果未装见文章最后, `adb devices` 检查设备， authorize ADB connection

Open ADB in a computer. If you did not have installed before install please check (ADB Installation) section above the reference.

6. Download SuperSu 2.79 / 下载 SuperSu 2.79

[Download SuperSu 2.79](https://s3-us-west-2.amazonaws.com/supersu/download/zip/SuperSU-v2.79-20161205182033.apk)

7. adb cmd

    ``` bash
    adb devices
    adb uninstall eu.chainfire.supersu
    ```

8. Kingoroot roots on PC

9. adb cmd again

    ``` bash
    adb shell
    su
    mount -w -o remount /system
    mv /system/priv-app/DeviceSoftwareOTA/DeviceSoftwareOTA.apk /system/priv-app/DeviceSoftwareOTA/DeviceSoftwareOTA.apk_
    ls -l /system/priv-app/DeviceSoftwareOTA/
    ```

10. Switch to first adb cmd

    ``` bash
    adb uninstall com.lionmobi.powerclean
    adb uninstall com.kingoapp.link
    adb uninstall kingoroot.supersu
    adb install SuperSU-v2.79-20161205182033.apk
    adb shell "am start -n eu.chainfire.supersu/eu.chainfire.supersu.MainActivity"
    ```

11. Quote - #1
    >On your Fire, SuperSu should pop up. Update SuperSu binary as `Normal`, it should report `Installation failed.` Proceed to reboot. (If it doesn't report an outcome (`failed`) in a couple of minutes, go to the Fire's Apps and force-stop SuperSU and retry.)

12. Quote - #2
    >Upon reboot, SuperSU should be functional. Choose `Grant` as the default access.

13. Delete all Kingoroot trash files / 删除所有 kingoroot 的垃圾

    ``` bash
    adb uninstall com.nemo.vidmate
    adb shell rm -rf /sdcard/VidMate
    adb shell rm -rf /sdcard/.a
    adb shell rm -rf /sdcard/.DataStorage
    adb shell rm -rf /sdcard/.UTSystemConfig
    ```

## Offline Root Approach (By retyre@XDA) / Offline Root 方式 （retyre 大神）

这种方法使用`Dirty COW: CVE-2016-5195`的漏洞，原帖在 [ref_source： HD 10 (2017): Offline rooting](https://forum.xda-developers.com/hd8-hd10/general/hd-10-2017-offline-rooting-t3734860)

To see a full English version can refer to the original post [ref_source： HD 10 (2017): Offline rooting](https://forum.xda-developers.com/hd8-hd10/general/hd-10-2017-offline-rooting-t3734860) by using `Dirty COW: CVE-2016-5195`.

Simple Steps / 具体方法见下:

- Download related zip files / 下载相关工具文件

下载 `Dirty COW: CVE-2016-5195`: [20165195.zip](http://myphone-download.wondershare.cc/mgroot/20165195.zip) 和 [SuperSU_18+.zip](http://myphone-download.wondershare.cc/mgroot/SuperSU_18+.zip) 两个文件, 合并在一个文件夹中，帖子中命名为 `c`

Download `Dirty COW: CVE-2016-5195`: [20165195.zip](http://myphone-download.wondershare.cc/mgroot/20165195.zip) and [SuperSU_18+.zip](http://myphone-download.wondershare.cc/mgroot/SuperSU_18+.zip). Put them into one folder named as `c`.

- Do on the tablet / 在平板上

正常打开 Fire HD，打开`未知文件`，打开`开发者adb连接`，连接电脑

Open Fire HD, select `Apps from Unknown Sources`, select `ADB Debugging`. Connect to PC.

- Copy `c` to `internal storage`/ 复制 `c` 文件夹至 `内置储存`
- Do the following code / 执行如下代码，意思是复制进入 tmp 下 然后使用 exploited 代码， 笔者环境linux，其他环境类似

    ``` bash
    adb shell

    cp /sdcard/c/* /data/local/tmp
    cd /data/local/tmp
    ls -l

    chmod 755 * #Change permisson / 更改权限

    ./Matrix /data/local/tmp 2 #Run / 运行，代码解释具体见原帖

    #If fails do / 如有失败
    rm /data/local/tmp/*
    #Hard shutdown the tablet and repeat the whole process / 强制重启然后重新复制操作
    ```

- Check if is root / 确认是否成功 root

    ``` bash
    adb shell

    su
    ```

- Install `SuperSu` / 安装 `SuperSu`

在平板上手动安装 `SuperSu`，打开选择正常安装，然后等待重启，并设置为 `Grant` 为默认选项

Install `SuperSu` on tablet and wait for the reboot. Set `Grant` to default operation in `SuperSu`.

- Delete some file / 删除一些文件

``` bash
adb shell

cd /data/data-lib
rm -r com.wondershare.DashRoot
rm -r wondershare
```

![](https://i.imgur.com/pSGGpeE.png)

- Success / 成功！

# Xposed, FlashFire Install
[Ref：Source](https://forum.xda-developers.com/hd8-hd10/general/xposed-framework-fire-hd-8-6th-t3549043)
 - 下载 [`Xposed Framework installer`](https://forum.xda-developers.com/xposed/material-design-xposed-installer-t3137758)
 - 打开后的官方标签中选择 `xposed-v87-sdk22-arm64`
 - 会遇到报错 `an error finding "app_process64"`， 使用文件夹管理器删除 `/system/bin/app_process64_xposed` 即可（注意这里报错后无法安装新的app，需要在卸掉 `xposed-v87-sdk22-arm64` 后再安装文件夹管理器再安装 `xposed`）
 - 重启

 未完待续


# Software Recommand / 软件推荐

1. [Sony z5 launcher](https://forum.xda-developers.com/crossdevice-dev/sony-themes-apps/app-xperia-z5-compact-launcher-t3203711) （[Drive](https://drive.google.com/open?id=0B1GTUFPthvxDbUg5emw3MmJUTVk)） - My favorite launcher after getting my first phone - Xperia Z / 从Xperia Z往后的这么多年了还是最习惯大法的桌面

![](https://i.imgur.com/Btlg99Y.png)

![](https://i.imgur.com/VcvYMqv.png)

2. [Sony Music 通用版](https://forum.xda-developers.com/showthread.php?t=2728110) （[Drive backup](https://drive.google.com/open?id=1DcDaLBlRLm3nQ8aaCiUJPi99XAbUKhK4)）

3. [Sony album 通用版](https://forum.xda-developers.com/crossdevice-dev/sony-themes-apps/app-sony-album-6-1-0-14-ui-updated-22-t2378816) （[Drive backup](https://drive.google.com/open?id=1u2TmSy3AbJ-8bp4nFqXtXxqN9m-fNM6f)）

4. [Air Dog / 空调狗](https://play.google.com/store/apps/details?id=me.yourbay.airfrozen&hl=zh) - 冻结系统应用个人感觉比太备份安全

![](https://i.imgur.com/6OTzJdw.png?1)

5. [MXplayer Full Plugins Ver / 全插件版](https://drive.google.com/open?id=0B1GTUFPthvxDaVBxTW1DakZCM0E) - 这么好的屏幕不用可惜了

6. [Brevent](https://play.google.com/store/apps/details?id=me.piebridge.brevent&hl=zh) / [黑域](https://play.google.com/store/apps/details?id=me.piebridge.brevent&hl=zh)

7. [Pureapk](https://apkpure.com) - 国内下载play版必备

8. [L Speed](https://play.google.com/store/apps/details?id=com.paget96.lspeed&hl=en) 或者 [HEBF Optimizer](https://play.google.com/store/apps/details?id=com.androidvip.hebf)

9. [Google play installer](https://forum.xda-developers.com/attachment.php?attachmentid=4333476&d=1510785697)- 差点忘了这个，快快逃离亚马逊appstore，_试了很多只有这个可以_

10. [Google Camera with HDR+ (另一个有趣的xda 大神做的app， 备份一下，有兴趣可以看看，支持821）](https://forums.oneplus.com/threads/google-camera-with-hdr-ported-to-oneplus-3-3t.599504/)

9. [太备份](https://drive.google.com/open?id=0B1GTUFPthvxDWTEyV3VFVkQzM0k)- 虽然强大但个人已经不用了，容易出问题不捣鼓了

# Manually Flash / 强刷

## Return to stock FireOS version / 恢复原生版本

_ref: [source](https://forum.xda-developers.com/hd8-hd10/help/reflash-hd-10-to-remove-root-t3781419)_

1. Download Stock firmware 

[version 5.6.1.0 Fire HD 7 Gen](https://kindle-fire-updates.s3.amazonaws.com/0EUD1Luh9x5wNH2DCdmU2yswyB/update-kindle-40.6.0.5_user_605485120.bin)

2. Put bin into PC / bin文件放在电脑上，为了之后adb使用

3. Enter Recovery / 进入 恢复模式

重启平板至 **恢复模式** （音量下 + 电源） 或者 使用 `adb reboot recovery`

Reboot tablet into **Recovery Mode** (Vol Down + Power), or by using `adb reboot recovery` on PC command line.

4. Choose `apply update from ADB` / 选择`apply update from ADB`

5. Copy bin / 拷贝bin

使用命令拷贝bin文件 `adb sideload update-kindle-40.6.0.5_user_605485120.bin`

Use command copy the file `adb sideload update-kindle-40.6.0.5_user_605485120.bin`

6. Wipe

`wipe the data` or `wipe data/factory reset` (Factory is an optional)

7. `reboot system now`

8. Back to Stock / 完美恢复至原来的系统

9. notice / 注意

<del>*xda上有人提示说有些系统可以降有些不行，为了保险还是别降级，使用最新的firmware*</del> 按 retyre 大神的说法： 
- 如果版本是 `5.6.0.1` 的，可以刷 `5.6.1.0` 或者 `5.6.0.1` 的；
- 如果版本是 `5.6.1.0` 的，可以刷 `5.6.2.0` 或者 `5.6.1.0` 的；
- 如果版本是 `5.6.2.0` 的，目前只能刷 `5.6.2.0` 的

Based on retyre:
- If the version is `5.6.0.1`, can flash to `5.6.1.0` or `5.6.0.1`
- If the version is `5.6.1.0`, can flash to `5.6.2.0` or `5.6.1.0`
- If the version is `5.6.2.0`，only can flash to `5.6.2.0`.

## ADB Installation / ADB的安装

adb有多种方式安装，最简单的当然是 Linux 或者 Mac 下使用软件包工具安装了，当然 Win 下也可以就是麻烦点，有好几种方法:

There are many ways to install ADB. The easiest way is to install under Linux or Mac by using the package management system. You can install under windows with the following options. 

1. Official ADB website, may needed used by `.adb xxxxx` / 官方adb， 需要使用 `.adb xxxxx`，我常常出现问题

2. [minimal-adb-and-fastboot](https://freeandroidroot.com/download-minimal-adb-and-fastboot-all-versions/)

3. [adb driver installer](http://adbdriver.com/downloads/)

4. [ADB Installer v1.4.3](https://forum.xda-developers.com/showthread.php?t=2588979)

### Enjoy the adb / 好了，接下来就享受adb吧

- Install apk / 用 adb 安装 apk 命令

``` bash
#System app， copy to your system/app， set permition to 644 (rw-r--r--)
adb push *.apk /system/app

#normal
adb install *.apk
```

- ...

Reference：

- [Reflash HD 10 to remove root etc?](https://forum.xda-developers.com/hd8-hd10/help/reflash-hd-10-to-remove-root-t3781419)
- [FireOS 5.6.0.0 HD 8 (2017) + Google play store](https://forum.xda-developers.com/hd8-hd10/general/fireos-5-6-0-0-hd-82017-t3705400)
- [[TUT] ROOT HD 10 (7th Gen 2017) - EASY SuperSu (read this before 1st power on!)](https://forum.xda-developers.com/hd8-hd10/general/tut-fire-hd-10-7th-gen-2017-root-box-t3726443)
- [How do install a apk from adb command line?](https://forum.xda-developers.com/showthread.php?t=1497880)
- [HD 10 (2017): Offline rooting by retyre](https://forum.xda-developers.com/hd8-hd10/general/hd-10-2017-offline-rooting-t3734860/post75214599#post75214599)
- [HD 10 (2017): Xposed, FlashFire, etc. by retyre](https://forum.xda-developers.com/hd8-hd10/general/hd-10-2017-xposed-t3722252)
- [[Working] Xposed Framework on Fire HD 8 (6th Generation)](https://forum.xda-developers.com/hd8-hd10/general/xposed-framework-fire-hd-8-6th-t3549043)
