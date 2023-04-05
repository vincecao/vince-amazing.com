---
title: Linux 的日常安利集合
date: 2018-04-23 11:56:07
tags: 
- Linux
categories: Config
---

![](https://i.imgur.com/zjRMDnF.jpg)

归类整理下目前发现的 Linux 好软笔记

# [](#Arch-Optional "Arch Optional")Arch Optional

* _Arch install AUR and GUI Package Manager pamac: `sudo pacman -Syu yaourt pamac` or `sudo yaourt -S pamac-aur`_
* _sync Yaourt with AUR:`yaourt -Syy`_
* _install AUR packages: `yaourt -S package-name`_
* _Codecs and plugins: `sudo pacman -S a52dec faac faad2 flac jasper lame libdca libdv libmad libmpeg2 libtheora libvorbis libxv wavpack x264 xvidcore gstreamer0.10-plugins`_
* _Kernel_

  ``` bash
  #check kernel
  uname -r
  #install the LTS kernel and Linux LTS headers
  sudo pacman -S linux-lts
  sudo pacman install linux-lts-headersbash
  #remove the older kernels
  sudo pacman -Rs linux
  ```

* _[Change Selected Pacman Branch](https://wiki.manjaro.org/index.php?title=Change_Selected_Pacman_Branch)_:
  ``` bash
  sudo pacman-mirrors --api --set-branch {branch} #stable, testing, unstable
  sudo pacman-mirrors --fasttrack 5 && sudo pacman -Syyu
  ```
* _Force to install all packages_

  ``` bash
  pacman -Qqen > pkglist.txt
  pacman --force -S $(< pkglist.txt)
  ```

# [](#Ubuntu-Optional "Ubuntu Optional")Ubuntu Optional

* _`synaptic`_
* _`muon package manager`_
* _`snap`_
* _Kernel_
  - **[Index of /~kernel-ppa/mainline]**([http://kernel.ubuntu.com/~kernel-ppa/mainline/](http://kernel.ubuntu.com/~kernel-ppa/mainline/))
  - [Ukuu Kernel Upgrade Utility](http://www.teejeetech.in/p/ukuu-kernel-upgrade-utility.html)

  ``` bash
  sudo apt-add-repository -y ppa:teejee2008/ppa
  sudo apt-get update
  sudo apt-get install ukuu
  ```

# [](#工具 "工具")工具

* [neofetch](https://github.com/dylanaraps/neofetch)

![](https://i.imgur.com/45csEKl.png)

![](https://i.imgur.com/U30TGTT.png)

* [etcher](https://etcher.io/)
* [woeUSB](https://github.com/slacka/WoeUSB)
* [himawaripy](https://github.com/boramalper/himawaripy)
* [albert](https://albertlauncher.github.io/docs/installing/)  
  `yaourt -S albert`
* [`rofi`](https://github.com/DaveDavenport/rofi) - used in i3
  `rofi -show run`
* Touchegg - improve touchscreen 提升触屏体验
* Variety
* Latte （已经成为主力）
* Persepolis （一个aria2界面的下载器， 在aur里面可以下载）
* uget （也是下载器）
* Gpick （超好用的屏幕取色软件）

# [](#虚拟机 "虚拟机")虚拟机

* VirtualBox

error fix: `sudo /sbin/rcvboxdrv setup`

* VMware Workstation

  * AUR install error:
    >Could not open /dev/vmmon: No such file or directory.
    >Please make sure that the kernel module `vmmon` is loaded.

    Solution:  <del>[One](https://wiki.archlinux.org/index.php/VMware#.2Fdev.2Fvmmon_not_found), [Two](https://communities.vmware.com/thread/245998), </del>Three: __UPDATE & install `linux-header-$(uname -r)`__

  * new error:
    >Could not connect 'Ethernet0' to virtual network '/dev/vmnet8'. More information can be found in the vmware.log file.
    >Failed to connect virtual device 'Ethernet0'.

    - <del>**Solution_One** ([link](https://bbs.archlinux.org/viewtopic.php?id=90433)): </del>
    1. <del>put vmnet in the modules line in the `/etc/rc.conf` file</del>
    2. <del>ran this at terminal:</del>
      ``` bash
      sudo modprobe vmnet
      sudo vmware-networks --start
      ```
    3. <del>ran VMWare</del>

    - **Solution_Two**:

    install `vmware-systemd-services` or `vmware-patch`

    - **<del>Solution_Three** ([link](https://communities.vmware.com/thread/580054)):</del>
    ``` bash
    $ cd /usr/lib/vmware/modules/source
    $ tar xf vmnet.tar
    $ mv vmnet.tar vmnet.old.tar
    $ sed -i 's/atomic_inc(&clone->users);/clone = skb_get(clone);/g' vmnet-only/bridge.c
    $ tar cf vmnet.tar vmnet-only
    $ rm -r vmnet-only
    ```
  * Bundle install (recommand):

    [Method One](https://www.youtube.com/watch?v=-tdz3DWyjEU&t=389s), [Method Two](https://www.youtube.com/watch?v=BMo42KOKeqo), **[Arch Wiki Steps](https://wiki.archlinux.org/index.php/VMware#VMware%20bundle)**

    ``` bash
    # install vmware-patch
    $ chmod a+x xxxxxx.bundle
    $ sudo sh xxxxxx.bundle
    # uninstall
    $ sudo vmware-installer -u vmware-player
    ```

    **Tip:**

    ``` bash
    #install vmware-patch
    $ vmware-patch -f
    #(or install vmware-systemd-services)
    $ sudo vmware-modconfig --console --install-all
    $ sudo modprobe -a vmw_vmci vmmon vmnet
    ```

    Win 10 image:  [link](https://www.microsoft.com/en-us/software-download/windows10ISO)

# [](#输入法 "输入法")输入法

**首选 [RIME](https://github.com/rime/home/wiki/RimeWithIBus) 不解释**

* ## [](#ibus "ibus")ibus

  ``` bash
  #彻底删除ibus_ubuntu
  apt-get remove ibus && apt-get autoremove && apt-get update
  #...
  #autostart
  ibus restart
  ibus-daemon
  ```

* Ref

  * [IBus](https://wiki.archlinux.org/index.php/IBus)
  * [Ibus Not Appearing?](https://askubuntu.com/questions/931723/ibus-not-appearing)
  * [ibus 17.04 ibus sunpinyin 设置报错解决](http://forum.ubuntu.org.cn/viewtopic.php?p=3193236)

* ## [](#Fcitx "Fcitx")Fcitx

  ``` bash
  #彻底删除fcitx_ubuntu
  apt-get remove fcitx && apt-get autoremove && apt-get update
  #install deb from http://pinyin.sogou.com/linux/
  dpkg -i sogou_pinyin_linux_1.0.0.0011_i386.deb
  #solve the dependencies errors
  sudo apt-get install -f
  #autostart
  fcitx
  fcitx-qimpanel
  ```

* Ref
  * [Fcitx](https://wiki.archlinux.org/index.php/Fcitx)
  * [Installing SOGOU 搜狗拼音](https://askubuntu.com/questions/450255/installing-sogou-搜狗拼音)
  * [Sogou Pinyin 常见问题](https://github.com/FZUG/repo/wiki/Sogou-Pinyin-常见问题)

# [](#Git "Git")Git

* [SmartGit](https://www.syntevo.com/smartgit/) (antergos 下崩溃)  
  `yaourt -S smartgit`

  _无法打开的情况：更换OpenJDK 8，[Smartgit not opening](https://stackoverflow.com/questions/30101420/smartgit-not-opening)_  

  ``` bash
  #install openjdk 8
  $ sudo apt-get update
  $ sudo apt-get install openjdk-8-jdk
  #Make version 8 your default Java
  $ sudo update-java-alternatives --list # check different jdk version
  #Change default Java version:
  $ sudo update-java-alternatives --set java-1.8.0-openjdk-amd64
  #Update SmartGit config
  $ nano ~/.smartgit/smartgit.vmoptions
  #add
  jre=/usr/lib/jvm/java-1.8.0-openjdk-amd64/
  ```

* [gitkraken](https://www.gitkraken.com)

  *install `libcurl3` when it stuck*

# [](#IDE "IDE")IDE

* Konsole （kde自带，新版内置的高斯模糊肥肠帅气）
* Tilix （好像是个还挺火的终端）
* terminology （kde自带的高斯模糊出现以前的最爱）
* gedit
* Typora
* [Moeditor](https://github.com/Moeditor/moeditor.org/issues/1) （好用的markdown编辑器，就是不能自动保存）
* Vnote （也是编辑markdown的，还没怎么尝试）
* Vim
* [Visual Studio Code](https://code.visualstudio.com/docs/?dv=linux64_deb)
* Atom
* Sublime
* Bracket （实施预览功能很好用，其他的方面就一般般了）
* Eclipse-java
* Android Studio
* Intellij Idea  
  AUR `intellij-idea-ultimate-edition`

Preferred Arch sh: `sudo yaourt -S terminology vim moeditor-bin visual-studio-code-bin bracket-bin eclipse-java android-studio`

# [](#文件管理器 "文件管理器")文件管理器

* nemo (`nemo`， `nemo-fileroller`, `nemo-previewer` 以及 `nemo-share`)
* Midnight Commander
* Konqueror
* Dolphin
* Krusader
* Nautilus
* Thunar
* PCmanFM
* XFE

# [](#日常 "日常")日常

# [](#浏览器 "浏览器")浏览器

* [Chrome](https://www.google.com/chrome/)

  [附windows下chrome离线包下载彩蛋: [点我](https://www.google.com/chrome/browser/thankyou.html?standalone=1&amp;amp;amp;platform=win&amp;amp;amp;installdataindex=defaultbrowser)]

* Firefox
* [Vivaldi](https://vivaldi.com/download/?lang=en_US)
* [Opera](https://www.opera.com) (我才不会告诉你们自带的vpn在win下改区域为美国就能方便的使用了)

Arch 系 sh: `yaourt -S google-chrome firefox vivaldi opera`

# [](#办公 "办公")办公

* LibreOffice `yaourt -S libreoffice-fresh`

# [](#影音 "影音")影音

* 网易云 `yaourt -S netease-cloud-music`
* amarok  （目前为止个人最爱  `sudo pacman -S amarok`
* pragha `yaourt -S pragha`
* Rhythmbox `yaourt -S rhythmbox`
* Clementine `yaourt -S clementine`
* Lollypop `yaourt -S lollypop`
* VLC `yaourt -S vlc`
* mpv  （很好的播放器，可惜有点丑陋）
* [kodi](https://kodi.wiki/view/HOW-TO:Install_Kodi_for_Linux#Installing_Kodi_on_Ubuntu-based_distributions)
* baka （很好看的logo，可惜已死）

# [](#图像 "图像")图像

* Pix `yaourt -S pix`
* Gimp  （介个地球人都知道，可惜我就是不会用）
* KSquirrel
* [Krita](https://krita.org/en/) （看上去超级美观，也和photoshop更加接近）
* [Photopea](https://www.photopea.com) （还有一个网页端可以偶尔来充充数）

Preferred Arch sh: `yaourt -S libreoffice-fresh amarok lollypop vlc mpv`

# [](#SMS "SMS")SMS

* [Wechat](https://github.com/geeeeeeeeek/electronic-wechat)  （不得不用，然而还是比qq还有那啥tim好一万倍了，笔者的号在electronic上已死，用浏览器登录正常）
* [Discord](https://discordapp.com/download)  （超酷的国外版YY，可惜就是没人和我用）
* [Skype](https://www.skype.com/en/get-skype/) （肥肠好用，和win端一样可以分享桌面一边视频）
* [Telegram](https://desktop.telegram.org)  （更酷的聊天软件）

Preferred Arch sh: `yaourt -S electronic-wechat-bin telegram-desktop discord skypeforlinux-stable-bin`

# [](#Mail "Mail")Mail

* Thunderbird
* Nylas Mail
* Hiri
* Evolution
* KMail （喜欢这个，kde配套的）
* Geary
* Sylpheed
* Claws Mail

# [](#个人配置 "个人配置")个人配置

# [](#zsh "zsh")zsh

* zsh  
  `sudo pacman -S zsh`

* oh-my-zsh:  
  `sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

* 更换默认的 shell:  
  `chsh -s /bin/zsh`

# [](#磁盘管理程序 "磁盘管理程序")磁盘管理程序

* gnome-disk-utility  
  `gnome-disk-utility`

# [](#theme-icon "theme / icon")theme / icon

* MacOS 风
  ``` bash
  yaourt -S capitaine-cursors otf-san-francisco macos-arc-white-theme osx-el-capitan-theme-git

  ```
* Paper
* Numix
* Papirus
* Evolvere
* La Capitaine
