---
title: 我的 Manjaro 配置
date: 2017-09-29 15:12:13
tags:
- Linux
categories: Config
---

![](https://i.imgur.com/AaPUAFV.jpg)

## 下载镜像
  - [官网](https://manjaro.org/get-manjaro/)

## 软件源
  - 根据软件源的速度排列源 [拓展](https://wiki.manjaro.org/index.php?title=Rankmirrors_to_Set_the_Fastest_Download_Server)

    `sudo pacman-mirrors -g`

## [更换国内源](http://www.im8.me/index.php/archives/101/)
- `sudo pacman-mirrors -i -c China -m rank`
  1. 勾选 http://mirrors.ustc.edu.cn/manjaro/ ，然后按 OK 键两次。

  2. 最后刷新缓存： `sudo pacman -Syyu`

  3. *(按 `#` 切换下一个源)*

- 添加源 *archlinuxCN* 和 *arch4edu*
  `sudo nano /etc/pacman.conf`

- 中科大的源
  ```bash
  # USTC
  [archlinuxcn]
  SigLevel = Optional TrustedOnly
  Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch

  [arch4edu]
  SigLevel = Never
  Server = http://mirrors.tuna.tsinghua.edu.cn/arch4edu/$arch
  ```

- 更新
  `sudo pacman -Syyu`

- 加 AUR
  `sudo pacman -S yaourt`

- 导入 GPG key
  `sudo pacman -S archlinuxcn-keyring`

- 若安装 archlinuxcn-keyring 失败
  ```bash
  pacman -Syu haveged
  systemctl start haveged
  systemctl enable haveged
  rm -rf /etc/pacman.d/gnupg
  pacman-key --init
  pacman-key --populate
  manjaro pacman-key --populate archlinuxcn
  ```

## 优化机械硬盘的命令（固态可跳过）
  - `sudo pacman-optimize && sync`

## 中文输入法
- 搜狗
  `sudo pacman -S fcitx-sogoupinyin fcitx-im fcitx-configtool`

- Rime
  `sudo pacman -S yaourt`
  `yaourt -S fcitx-im fcitx-configtool fcitx-rime`

- 环境变量(可无)
  ```bash
  > sudo nano ~/.xprofile

  export GTK_IM_MODULE=fcitx
  export QT_IM_MODULE=fcitx
  export XMODIFIERS="@im=fcitx"

  > fcitx
  ```

## Desktop Environment
__[Install Desktop Environments](https://wiki.manjaro.org/index.php/Install_Desktop_Environments)__

- #### LXDE
  LXDE 音量快捷键问题解决
  - [LXDEvolkeys](https://github.com/Lend27/linuxstuff/blob/master/LXDEvolkeys)
  - [LXDEvolumekeymapping](https://github.com/Lend27/linuxstuff/blob/master/LXDEvolumekeymapping)

- #### GNOME
  Extension
  - [Coverflow Alt-Tab](https://extensions.gnome.org/extension/97/coverflow-alt-tab/)
  - [Impatience](https://extensions.gnome.org/extension/277/impatience/)
  - [system-monitor](https://extensions.gnome.org/extension/120/system-monitor/)

- #### I3
  - [How to Install and Configure i3 WM on Arch Linux](https://www.linuxdeveloper.space/install-i3-window-manager/)
  - [How to install i3 on Arch Linux](https://erikdubois.be/how-to-install-i3-on-arch-linux/)
  - [安装使用i3wm窗口管理器](http://blog.topspeedsnail.com/archives/3615)
  - [i3窗口管理器的一些配置](https://blog.swineson.me/some-config-for-i3wm/)
  - [Linux I3窗口管理器调整优化](http://zsuil.com/?p=1650)
  - [我的i3wm配置](https://my.oschina.net/kylidboy/blog/639789)

- #### KDE
  - [KDE桌面加速](http://tieba.baidu.com/p/2381590168)
  - [桌面特效性能](https://userbase.kde.org/Desktop_Effects_Performance/zh-cn)
  - **[How to make Kubuntu (KDE) blazing fast and optimise it for performance](https://ubuntuforums.org/showthread.php?t=1889034)**
  - [Desktop Effects Performance](https://userbase.kde.org/Desktop_Effects_Performance#NVIDIA)
  - [Make KDE faster](https://forum.manjaro.org/t/make-kde-faster/21284)

- #### XFCE
  volume
  - [[SOLVED] How to bind volume function keys to xfce4-mixer](https://bbs.archlinux.org/viewtopic.php?id=67197)
  - go to `Settings` > `Keyboard` > `Shortcuts`
    ```bash
    amixer set Master 5%+
    amixer set Master 5%-
    amixer set Master toggle
    ```

  compiz
  - `yaourt -S compiz-manjaro`
  - `compiz --replace&` or `xfwm4 --replace&`

- #### ENLIGHTENMENT
- #### Pantheon (elementary OS)
- #### Trinity (fork of KDE)
- #### Budgie (by the Solus Linux, gnome)

## Windows Manager [拓展1](https://askubuntu.com/questions/18078/what-is-the-difference-between-a-desktop-environment-and-a-window-manager) [拓展2](https://www.slant.co/topics/390/~best-window-managers-for-linux)
- #### compiz
  - `yaourt -S compiz-manjaro`
  - `compiz --replace&` or `xfwm4 --replace&`

- #### kwin_x11
- #### Gala

## 拓展
- [Optimizing Linux for Slow Computers](http://www.akitaonrails.com/2017/01/17/optimizing-linux-for-slow-computers)
- [alternativeto.net](https://alternativeto.net/)
- [Awesome Linux Software](https://github.com/LewisVo/Awesome-Linux-Software)
- [写代码怎能不会这些 Linux 命令？](https://juejin.im/entry/599b9e07f265da246d6af09f)
- [配置和美化Arch Linux](http://www.jianshu.com/p/fe2165cc6af8)
- [简单提升linux音效，实测有效](https://bbs.deepin.org/forum.php?mod=viewthread&tid=137002)

### Reference
- [Manjaro挂掉之后...](http://silenwang.leanote.com/post/Manjaro%E6%8C%82%E6%8E%89%E4%B9%8B%E5%90%8E...)
- [Manjaro安装记录](http://www.jianshu.com/p/1a1208e37f2a)
- [hello manjaro](https://ealasou.com/artaicle/59228ccf5cc6312e2dc50b97)
- [萌妹子都能看懂的VMware Workstation安装Arch Linux和Cinnamon桌面教程](https://blog.mrx.one/2017/03/20/How-to-install-Arch-Linux-with-Cinnamon-desktop-on-VMware-Workstation/)
- [设置socks5代理](http://www.jianshu.com/p/ff4093ed893f)
- [Manjaro 安装记](http://www.jianshu.com/p/28b0484b8277)
- [10 Best Linux Music Player Apps](https://beebom.com/linux-music-player-apps/)
- [Top 9 Best Email Clients for Linux](https://itsfoss.com/best-email-clients-linux/)
- [10 Of The Best Linux Icon Themes Compared](https://www.devpy.me/10-of-the-best-linux-icon-themes-compared/)

_小插曲: 另外因为安全我把博客的源文件等杂七杂八的东西打包 .7z 保存在 gdrive 上， 结果7z因为里面有代码，gdrive死活都无法完成杀毒，一下子就报错，差点就以为要跪了，后来尝试了下和另外其他的文件打包一起下载这才成功下载下来，以后 code 还是本地自己保持下吧，云终究还是一个虚无缥缈的东西..._
