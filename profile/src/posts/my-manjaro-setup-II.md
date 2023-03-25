---
title: 我的 Manjaro 配置 Mark II
date: 2018-04-08 12:17:15
tags:
- Linux
categories: Config
---

时隔多日又开始捣鼓Liunx，每到心情不好或者比较郁闷的时候就想着换换操作系统，很气。。继续胡乱做笔记

![](https://i.imgur.com/TaDW5AE.png)

## Setup 安装时注意点:
- alongside for pure Windows with freespace disk. 如果原来就一个 Win，分一块空磁盘分区直接使用 alongside 安装。跳过之后麻烦的步骤
- Manual partitioning for original linux and windows dual sys. 手动分区当原来就是双系统的时候
- load `/` mount point for main btrfs(ext4), `/boot/efi` for EFI(MSR) partition. 加载 `/`在 btrfs 或 efi 分区， 加载 `/boot/efi` 在 EFI 分区
- Swap always twice as the RAM size for keep the memory data when the computer is in sleep mode. 交换空间一般是内存的两倍，保证睡眠的时候磁盘内的数据
- 如果之后无法引导，uefi 选择磁盘而不是 Windows boot manager。或者重新进 win CMD 操作，加载引导，参见上一篇。

---

## 画面撕裂问题
#### 检测：
[Youtube测试地址](https://www.youtube.com/watch?v=gmHaa5pvpVc&t=0s&index=1&list=FLh5Vlje9XYc_5j18Wz7xlUQ)

#### 解决方法 —— compton

example:
`compton -o 0 -D 0 -b`
or
`compton -D0 -l -24 -t -24 -r 16 --shadow-exclude 'bounding_shaped' --shadow-red 0.5 --shadow-green 0 --shadow-blue 1 -o 0.8`

参考:
 - [画面撕裂的问题](https://bbs.archlinuxcn.org/viewtopic.php?id=5412)
 - [Compton Compositor](https://www.reddit.com/r/elementaryos/comments/4nei8r/compton_compositor/)
 - [Switching window manager/desktop environments?](https://askubuntu.com/questions/162516/switching-window-manager-desktop-environments)

#### 解决方法 —— NVIDIA驱动设置

安装合适的驱动，（_决不能让自己手贱在之后乱改双显卡的显卡驱动，如果是最大分辨率的问题，`sudo nvidia-xconfig`之后 `sudo rm /etc/X11/xorg.conf` 试一试，一次作死之后的成功还原_）

```bash
$sudo nvidia-xconfig
$sudo nvidia-settings #为了root的身份保存 Configuration File
```

Steps _(Source: [4])_:
- X Server Display Configuration
- Advance
- Force Full Composition Pipeline
- Apply
- Save to Configuration File__

1. Enable Force Full Composition Pipeline（如果不行也可以試試看 Force Full Composition Pipeline 左邊的 Force Composition Pipeline）
2. 套用完設定後，就可以去測試還會不會撕裂了。
3. 確定沒問題後用把設定存下來，不然重開機後就沒了。

Related Reference:
 - [n 卡闭源驱动，对屏幕撕裂就没有办法了吗？](https://www.v2ex.com/t/386133)
 - [NVIDIA](https://wiki.archlinux.org/index.php/NVIDIA#Avoid_tearing_with_GeForce_500.2F600.2F700.2F900_series_cards)
 - [Linux 下 NVIDIA 显卡闭源驱动的一些优化](https://blog.robotshell.org/2012/linux-nvidia-driver-tweak/)
 - [Unity3d Linux 下面画面撕裂问题](https://blog.csdn.net/leoleocs/article/details/50058753)
 - [为何一提起Linux，总有人指出显卡驱动配置不好等问题？](https://www.zhihu.com/question/22703223)

---

## 装自己偏好软件
 - #### Pamac
 替换 Octopi，个人不是很喜欢
 - #### iBus (参考: [5])：
 Fcitx 版本的 sogou 在最新的版本上不知道为什么有错误。

``` bash
$sudo pacman -S ibus-qt
$sudo pacman -S ibus-libpinyin #Pinyin (ibus-libpinyin) 1.9.3-1
$sudo pacman -S ibus-rime #rime (f4 for config in SC)
$ibus-setup
```

```
#Modify ~/.xprofile
#export LANG="ja_JP.UTF-8"
export XMODIFIERS="@im=ibus"
export XMODIFIER="@im=ibus"
export GTK_IM_MODULE=ibus
export QT_IM_MODULE=ibus
export DefaultIMModule=ibus
ibus-daemon -drx
```

```
#Modify ~/.bashrc
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
```

 - #### <del>i3-wm</del>
    [See the newer post](/blog/2018/04/15/i3-configuation/)

---

## Power Mangement
- __设置盖上笔记本盖子或按下电源键休眠__
_(source: [1])_

>1. 编辑 `/etc/systemd/logind.conf` ， 盖上盖子休眠，添加 `HandleLidSwitch=hibernate`

>2. 按下电源键休眠，添加 `HandlePowerKey=hibernate`

>3. 执行以下命令使其立即生效： `systemctl restart systemd-logind`

- __Maximize Linux Laptop’s Battery Life__
_(source: [2])_

``` bash
#to install and run PowerTOP (carefully use)
$sudo apt install powertop
$sudo powertop --calibrate

#to install TLP
$sudo apt install tlp
#To avoid restarting immediately, you can launch it by running
$sudo tlp start
```

---

## 自己喜欢的 KDE 设置
- 增加时区设置
- Autostart
- 在桌面加 cpu 内存等参数信息
- Corner
	- Screen Edges:
        ```
        Trigger: `35%`
        Activation delay: `50 ms`
        Reactivation delay `200 ms`
        ```

- 更改鼠标参数
	- Mouse Controls ->
        - Icons: `Double-click` ;
        - Advanced
        ```
        Pointer acceleration: `1.0 x`
        Pointer threshold: `2 pixels`
        Double click interval: `200 msec`
        Drag start time: `200 msec`
        Drag start distance: `10 pixels`
        Mouse wheel scrolls by: `12 lines`
        ```
- 改主题
	- Workspace Theme
        ```
        Look And Feel: `Numix`
        Desktop Theme: `Glassified` or `Breeze Transparent with Antu icons` or `Diamond` or `Bare Naked`
        Cursor Theme: `Capitaine Cursors`
        Splash Screen: `Breeze`
        ```
	- Colors
	- Fonts
        ```
        General: `SF Pro Display 10`
        DPI: `120`
        ```
	- Icons
        ```
        Theme: `Breeze Dark`
        ```
        - Application Style
        ```
        Window Decorations - Border size: `No Borders`
        ```
- Desktop Effects

---

## Bash basic _(Note from: [3])_
#### NAVIGATION
- `ls` - list directory contents
- `pwd` - print name of current/working directory
- `cd` - change working directory
- `popd` - put working directory on a stack
- `file` - determine file type
- `locate` - find files by name
- `updatedb` - update database for locate
- `which` - locate a command
- `history` - display bash command history

#### GETTING HELP
- `whatis` - display the on-line manual descriptions
- `apropos` - search the manual page names and descriptions
- `man` - an interface to the on-line reference manuals

#### WORKING WITH FILES

- `mkdir` - create a directory/make directories
- `touch` - change file timestamps/create empty files
- `cp` - copy files and directories
- `mv` - move (rename) files
- `rm` - remove files or directories
- `rmdir` - remove empty directories

#### TEXT FILES

- `cat` - concatenate files and print on the standard output
- `more`/`less` - file perusal filter for crt viewing
- `nano` - command line text editor

#### USERS

- `sudo` - execute a command as superuser
- `su` - change user ID or become another user
- `users` - print the user names of users currently logged in
- `id` - print real and effective user and group IDs

#### CHANGING FILE PERMISSIONS

- `chmod` - change permissions of a file

#### KILLING PROGRAMS AND LOGGING OUT

- `Ctrl`+`C` - kill a running command
- `killall` - kill processes by name
- `exit` - log out of bash

#### USEFUL SHORTCUTS

- `Ctrl`+`D` - signal bash that there is no more input
- `Ctrl`+`L` - redraw the screen
- `Ctrl`+`+` - make text bigger in terminal emulator
- `Ctrl`+`-` - make text smaller in terminal emulator

---

## Soft Bookmark
- [Awesome Linux Software](https://github.com/luongvo209/Awesome-Linux-Software#productivity)
- [Awesome Linux Dev Tools](https://github.com/madbob/awesome-linux-dev)
- [awesome-linux](https://github.com/aleksandar-todorovic/awesome-linux)
- ...

## Reference
1. [Power management/Suspend and hibernate](https://goo.gl/NkqxV7)
2. [How to Maximize Your Linux Laptop’s Battery Life](https://www.howtogeek.com/55185/how-to-maximize-the-battery-life-on-your-linux-laptop/)
3. [Beginner's Guide to the Bash Terminal](https://www.youtube.com/watch?v=oxuRxtrO2Ag)
4. [Linux 上 Nvidia 顯卡畫面撕裂的解法](https://ianliniblog.wordpress.com/2017/05/06/linux-%e4%b8%8a-nvidia-%e9%a1%af%e5%8d%a1%e7%95%ab%e9%9d%a2%e6%92%95%e8%a3%82%e5%95%8f%e9%a1%8c/)
5. [日本語の設定](https://wiki.manjaro.org/index.php?title=%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%81%AE%E8%A8%AD%E5%AE%9A)