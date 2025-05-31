---
title: Opensuse Tumbleweed 大蜥蜴的配置清单
date: 2018-06-19 15:06:39
tags: 
- Linux
- 教程
categories: Config
---

经亲自检验，发现opensuse在720s上有着最好的体验，不烫，自带稳定新内核，还和amd有着官方支持。

![](https://i.imgur.com/H6hKm9G.png)

![](https://i.imgur.com/e6wByQa.png)

![](https://i.imgur.com/AOsbDbo.png)

## 包管理系统

opensuse可以使用 `apt-get`，`zypper` 和 `YaST`, 另外还可以用`brew`，`snap` 和 `flatpak`等

### apt-get

``` bash
#update
#sudo apt-get update
#sudo apt-get upgrade
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get dist-upgrade

#install
sudo apt-get install <package_name>

#remove
sudo apt-get remove <package_name>
#or remove everything related
sudo apt-get purge <package_name>

#clean
sudo apt-get clean
sudo apt-get autoclean
sudo apt-get autoremove
```

### [zypper](https://en.opensuse.org/SDB:Zypper_usage)

[cheat sheet](https://en.opensuse.org/images/1/17/Zypper-cheat-sheet-1.pdf)

``` bash
#update
zypper update
zypper dup #dist

#install Packages
zypper install
zypper in

#remove Packages
zypper remove
zypper rm

#Adding Repositories
zypper addrepo
zypper ar 
#followed by the repo url and alias

#Removing Repositories
zypper removerepo
zypper rr
zypper rr packman main
```

### RPM 包

``` bash
zypper install /path/to/manually/downloaded.rpm
#or
sudo rpm -i --nodeps <local rpm package>
```

### YaST

[Download software](https://software.opensuse.org/)

_自用软件_
- [latte-dock](https://software.opensuse.org/download.html?project=home%3Aaudoban&package=latte-dock)
- [discord](https://software.opensuse.org/package/discord)
- [Skype](https://software.opensuse.org/package/skype)
- [darktable](https://software.opensuse.org/package/darktable)
- [photivo](https://software.opensuse.org/package/photivo)
- [gitkraken](https://software.opensuse.org/package/gitkraken?search_term=gitkraken)

### [Linuxbrew](https://github.com/Linuxbrew/brew)

``` bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

sudo nano ~/.profile
# add
test -d ~/.linuxbrew && PATH="$HOME/.linuxbrew/bin:$HOME/.linuxbrew/sbin:$PATH"
test -d /home/linuxbrew/.linuxbrew && PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:$PATH"
test -r ~/.bash_profile && echo "export PATH='$(brew --prefix)/bin:$(brew --prefix)/sbin'":'"$PATH"' >>~/.bash_profile
echo "export PATH='$(brew --prefix)/bin:$(brew --prefix)/sbin'":'"$PATH"' >>~/.profile

#add to command 'brew'
export PATH=`pwd`/linuxbrew/.linuxbrew/bin:$PATH

#test
brew install hello
```

### Snappy

``` bash
#For 42.3:
sudo zypper addrepo --refresh http://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_42.3/ snappy

#For Tumbleweed:
sudo zypper addrepo --refresh http://download.opensuse.org/repositories/system:/snappy/openSUSE_Tumbleweed/ snappy

#install
sudo zypper install snapd
sudo systemctl enable --now snapd.socket

#Use https://docs.snapcraft.io/core/usage
snap install hello
```

### Flatpak

``` bash
#Install Flatpak
sudo zypper install flatpak

#Add the Flathub repository
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

#Restart

#https://flathub.org/home
```

---

## Kernel
update to Vanilla Kernel
``` bash
sudo zypper in kernel-vanilla
```

---

## Enable Packman Repository
``` bash
#Tumbleweed
sudo zypper ar -p 1 -f -n packman http://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Tumbleweed/ packman

#Leap
sudo zypper ar -p 1 -f -n packman http://ftp.gwdg.de/pub/linux/misc/packman/suse/openSUSE_Leap_42.3/ packman
```

---

## Multimedia Codecs
_[on-click YaST install](http://opensuse-community.org/)_
``` bash
sudo zypper install x264 libx265-130 libx264-148 ffmpeg

sudo zypper install gstreamer-plugins-bad gstreamer-plugins-libav gstreamer-plugins-ugly
```

---

## TLP For Battery
``` bash
sudo zypper install tlp tlp-rdw
sudo systemctl enable tlp
```

---

## 蓝牙问题
发现不能打开 720s 上的蓝牙
``` bash
#check device status
sudo hciconfig hci0 up

#output is 
# Can't init device hci0: Operation not possible due to RF-kill (132)

# check devices
lsmod | grep wmi

#RF-kill 解决方法
apt-get install rfkill
rfkill unblock all #完美解决

#这个blueman软件，不确定是不是也可修复
# sudo apt-get install blueman
# sudo /etc/init.d/bluetooth restart
```

---

## Install Build Essential

``` bash
#development packages
zypper se -t pattern devel

#install make and other
zypper install -t pattern devel_C_C++
```

---

## Reference
- [Using apt-get Commands In Linux [Complete Beginners Guide]](https://itsfoss.com/apt-get-linux-guide/)
- ["zypper update" vs "zypper dup"](https://forums.opensuse.org/showthread.php/407910-quot-zypper-update-quot-vs-quot-zypper-dup-quot)
- [Why is my Bluetooth not working?](https://www.reddit.com/r/openSUSE/comments/6f4hf6/why_is_my_bluetooth_not_working/)
- [解决ubuntu不能启用蓝牙的问题](https://gefangshuai.wordpress.com/2012/12/28/%E8%A7%A3%E5%86%B3ubuntu%E4%B8%8D%E8%83%BD%E5%90%AF%E7%94%A8%E8%93%9D%E7%89%99%E7%9A%84%E9%97%AE%E9%A2%98/)
- [Install snapd on openSUSE](https://docs.snapcraft.io/core/install-opensuse)
- [Installing on RPM-based Linux (CentOS, Fedora, OpenSuse, RedHat)](http://docs.grafana.org/installation/rpm/)
- [openSUSE Quick Setup](https://flatpak.org/setup/openSUSE/)