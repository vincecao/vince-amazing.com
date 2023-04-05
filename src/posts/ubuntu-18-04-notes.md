---
title: Ubuntu 18.04 配置笔记 (720s)
date: 2018-04-20 21:50:40
tags: 
- Linux
- 教程
- 剁手 / Chopping Hands
categories: Config
---

## 安装镜像
[Ubuntu 18.04 TLS daily iso](https://wiki.ubuntu.com/BionicBeaver/ReleaseNotes)
- __#1KDE__(首选)
- #2Mate
- #3Budgie
- ...

---

## Kernel
([elementry下的loki](https://elementaryos.stackexchange.com/questions/7507/how-can-i-add-a-ppa-in-loki)， 需要先添加`ppa`， `sudo apt install software-properties-common`)
因为是只有415之后的才原生支持显卡，内核升级是必须的
- [__Index of /~kernel-ppa/mainline__](http://kernel.ubuntu.com/~kernel-ppa/mainline/)
- [Install Linux Kernel 4.15 In RPM And DEB Based Systems](https://www.ostechnix.com/install-linux-kernel-4-15-rpm-deb-based-systems/)
- [UKUU](http://www.teejeetech.in/p/ukuu-kernel-upgrade-utility.html)

---

## RTL8821CE wifi _([link](https://askubuntu.com/questions/990378/wifi-not-working-on-lenovo-thinkpad-e570))_
720s 自带了对开源不友好的 wifi 芯片，在 ubuntu 下需要手动装驱动，arch 可以在 pacman 中找到
- [Download the driver](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/endlessm/linux/tree/master/drivers/net/wireless/rtl8821ce)
- Unzip file and make change in `Makefile`
    ```bash
    $ cd ~/Downloads
    $ unzip rtl8821ce.zip
    $ cd rtl8821ce
    $ nano Makefile
    ```
    change `export TopDIR ?= $(srctree)/drivers/net/wireless/rtl8821ce` with `export TopDIR ?= $ ~/Downloads/rtl8821ce`

- `make` (may need with `gcc`)
    ```bash
    $ make
    $ sudo make install
    $ sudo modprobe 8821ce
    ```
- After update the kernel verison
    ```bash
    $ cd rtl8821ce
    $ make clean
    $ make
    $ sudo make install
    $ sudo modprobe 8821ce
    ```

Other link
- [Driver rtl8821ce](https://launchpad.net/~slonua/+archive/ubuntu/rtl8821ce)
- [Realtek wifi driver problem in Linux Mint 18.2](https://unix.stackexchange.com/questions/379049/realtek-wifi-driver-problem-in-linux-mint-18-2)

---

## 美化
Installing Arc Icons
```bash
$ sudo add-apt-repository ppa:noobslab/icons
$ sudo apt-get update
$ sudo apt-get install arc-icons
```

Installing Adwaita Dark
```bash
$ cd /usr/share/themes
$ sudo wget https://blog.ronakshah.net/downloads/adwaita-osx.zip
$ unzip adwaita-osx.zip
```

Installing the fonts and configuring them
```bash
$ cd /usr/share/fonts
$ sudo mkdir tmp
$ cd tmp
$ sudo git clone https://github.com/AppleDesignResources/SanFranciscoFont
$ cd SanFranciscoFont
$ sudo mv *.otf ../../opentype
$ sudo fc-cache -fv
```

Installing Tweak Tool to put everything together
```bash
$ sudo add-apt-repository ppa:tualatrix/ppa
$ sudo apt-get update
$ sudo apt-get install ubuntu-tweak
```

Installing `Plank`
```bash
$ sudo add-apt-repository ppa:ricotz/docky
$ sudo apt-get update
$ sudo apt-get install plank
```

- [Making Ubuntu look like macOS](https://blog.ronakshah.net/Installing-Ubuntu-Like-A-Mac-User/)
- [13 Best Linux Desktop Environment for Ubuntu: How to Install Those](https://www.ubuntupit.com/install-various-desktop-environment-ubuntu/)
- [How to Install Budgie Desktop in Ubuntu 16.04, 16.10](http://tipsonubuntu.com/2016/11/09/install-budgie-desktop-ubuntu-16-04-16-10/)
- [How to Install KDE Plasma 5.7 on Ubuntu 16.04 and Ubuntu 16.10](https://www.linuxbabe.com/ubuntu/install-kde-plasma-5-7-ubuntu-16-04-ubuntu-16-10)

---

## Ryzen的一些问题
- [Lenovo IdeaPad 720s (Ryzen)](https://wiki.archlinux.org/index.php/Lenovo_IdeaPad_720s_(Ryzen))
- [Laptop/Lenovo](https://wiki.archlinux.org/index.php/Laptop/Lenovo)
- [Trouble installing linux on Ideapad 720s AMD](https://forums.lenovo.com/t5/Linux-Discussion/Trouble-installing-linux-on-Ideapad-720s-AMD/td-p/4005509)
- [Log In Fix Ryzen lockups related to low system usage](https://forum.manjaro.org/t/fix-ryzen-lockups-related-to-low-system-usage/39723/2)
- [AMD Ryzen with Ubuntu - Here is What You Have to Do to Fix Constant Crashes](https://www.hardocp.com/news/2017/03/03/amd_ryzen_ubuntu_here_what_you_have_to_do_fix_constant_crashes)
- [Linux Mint 18.X Installation Instructions (4/19/2018)](https://docs.google.com/document/d/1HiIEPpPF9ycz7But8WafSO_Jaa_rS3wY53CURK9ciq8/edit)

---

## BUG
- 还是时不时会突然假死，估计是和 `pci=noaer` 的设置有关, 需要 grub 中增加 pci 的参数
- 鼠标在 Cinnamon 下卡的严重，kde就好了，首选kde (内核4-16比4-15要卡顿)
- KDE下 `ibus-rime` 失效
- 还是想回 manjaro，期待 manjaro 版的415出来

...未完，待续
