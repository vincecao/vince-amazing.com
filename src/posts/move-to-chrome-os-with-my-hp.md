---
title: Chrome OS on my HP Elitebook 840 G5 & Installation
date: 2021-01-17 00:09:24
tags:
  - ChromeOS
  - Linux
  - Laptop
categories: Rice
---

Finally, I found a perfect development setup for my HP Elitebook 840.

![](https://i.imgur.com/BvJM8pI.jpg)

![](https://i.imgur.com/m12PVH2.jpg)

## Some background

I started using this laptop which was purchased from eBay back in Dec 2018. It is not my only setup, since I also have a Macbook and all-in-one Lenovo Gaming PC at that time. But it is eventually a business laptop. I love its TrackPoint, physical left/right button and extremely great keyboard tapping feeling, a little small but great touchpad (I feel it is better than XPS 15 2020) all of them make me feel so comfortable when coding on it.

After some upgrade by simply replacing components, the spec of this laptop now is i7-8650U, 32GB RAM, 1TB NVME SSD, and 72% NTSC FHD screen. It holds very great port configurations, 2 USB and 1 thunderbolt, other is one hp dock port, sim card slot & smartcard reader (I never have used those).

But one thing I am annoyed with is the fan. The laptop is very easy to trigger the fan under Windows. Then I try to make a setup with Linux. Manjaro, Ubuntu & Solus are all good, the fan seldom run, but I feel the graphics always have some issue, some input setup is also very annoying since I would like to have Pinyin as an option for Chinese. For that part, I will give my big credits to Popos because it has Pinyin out of the box.

I have used an arm Chromebook before, the model is Asus Chromebook flip C100, 10.1 inches, 4GB RAM (base spec is 2GB, OMG) & 16GB eMMC. The processor is not even matched my phone's processor. And experience, emmm. Very terrible, not even for some causal usage.

## Then I tried Chrome OS on HP

Occasionally, I followed one video and turn into Chrome OS, I feel this HP now is amazing.

The graphic driver seems much better than a normal Linux distro. The install steps are not complex and the Linux user experience is great too.

For the most of time, I will use it with some basic Linux features (installing vscode, docker, etc) with Chrome as background opened to do some causally google research, and I feel this Chrome OS setup on this machine is amazing for my workflow.

First, Chrome is smooth and quiet. Drivers are great. Compared with Windows, the Chrome performance is no different or maybe slightly better, but always fanless feeling. With Linux, the firefox under Linux (ubuntu-mate) performance test score is almost the same in Linux(beta) under Chrome OS, but Chrome score is lower in normal Linux distro. I would say google is working a lot for those low spec Chromebooks and that is a great big win for my case.

![](https://i.imgur.com/btqycUT.png)

Plus, power management is great! I could simply use it up to more than 10 hours, very pleasing result, can not imagine that showing under windows. Lip to sleep is working perfectly as well. And gesture! it supports two, three, and four-finger detection. some shortcut is not well mapped in function key bar, due to some key placement by ChromeOS. but I am now can blindly type all of them, following are some cheat sheet:

- adding extra workspace (f4), switch workspace (four fingers movement)
- brightness (f5, f6)
- mute(f8)
- audio volume adjustment (f9, f10)
- screenshot (ctrl + f4)
- split wind to left (alt + ]), to right (alt + [)
- and so on...

There are some simple comparisons for Chrome, and I would say I am very satisfied with this 8th gen U series i7 score.

_HP Elitebook 840 G5 with Chrome OS, i7-8650U, 32gb ram, 1tb storage_
![](https://i.imgur.com/LijsYoO.png)

![](https://i.imgur.com/8vdrAi6.png)

_Macbook pro 2018 15 inch, i7-8850H, 16gb, 512gb storage_
![](https://i.imgur.com/5dfiidd.png)

![](https://i.imgur.com/ALKwHcF.jpg)

_XPS 15 2020, i7-10750H, 16gb, 256gb storage_
![](https://i.imgur.com/Wc0irWI.png)

![](https://i.imgur.com/CjjTjzr.png)

## Conclusion

With Android app support + lovely Linux feature, this Chrome OS is stand out. For now, I think it is greater than most Linux distro if you only want to have a stable development setup.

---

## How to install

> All the following install steps are for the experiment proposed. I'm not responsible for your DEVICE and DATA. Please back up and take your own risk !!!!

1. Get a live [ubuntu mate](https://ubuntu-mate.org/) iso file and write to a USB flash driver
2. Download [brunch](https://github.com/sebanc/brunch/releases), and save it into saving USB as a second folder.
3. Download recovery-bin file from [CrOS Updates Serving](https://cros-updates-serving.appspot.com/). _(I am using 8th gen Intel processer, so I chose Recovery [87](https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_13505.73.0_atlas_recovery_stable-channel_mp.bin.zip) from `Google Pixelbook Go`, you could choose another rec bin file name based on your spec)_. Then place the bin file in the same folder with brunch files.

![](https://i.imgur.com/S8xFgLc.png)

![](https://i.imgur.com/cjuKvBR.png)

4. Make sure **BACKUP ALL YOUR DATA** for the target laptop. Then restart the laptop with ubuntu mate live USB
5. In the terminal

```bash

# cd to your chromeOS folder
cd /cdrom/chromeOS

sudo apt-get update
sudo apt-get install figlet pv cgpt

# replace YOUR_NAME.bin with the correct bin file's name. Please also check your disk name. For my HP installation, the SSD is named as `/dev/nvme0n1`. You could check it under disk software.
sudo bash chromeos-install.sh -src YOUR_NAME.bin -dst /dev/sda
```

6. restart the laptop.

## Some setup for nodejs

Install nvm, latest node & npm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

# restart bash

command -v nvm

# nvm

# check all nodejs version
nvm ls-remote

# install latest nodejs
nvm install node

# nvm use v14.xxx

sudo apt update && sudo apt install npm
```

Install yarn

```bash
# install yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update && sudo apt install --no-install-recommends yarn
```

## Some setup for docker

Install docker

```bash
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

# To verify key with fingerprint
sudo apt-key fingerprint 0EBFCD88

# result should be same
# pub   rsa4096 2017-02-22 [SCEA]
#       9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
# uid           [ unknown] Docker Release (CE deb) <docker@docker.com>
# sub   rsa4096 2017-02-22 [S]

# Add ppa, chrome os will use debian, docker website use ubuntu instead
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

# Check distro
cat /etc/issue

# Should be
# Debian GNU/Linux 9 \n \l

sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io

# Docker under superuser is installed
sudo docker run hello-world
```

Because we only installed docker under sudo, you will face `docker.sock permission denied` error in vscode docker container extension

```bash
# Solution, add a new user with docker permission
echo $USER
sudo usermod -aG docker $USER

# Logout

# Restart docker systemctl
sudo systemctl restart docker
docker ps
```

## Install firefox in Linux

```bash
sudo apt update
sudo apt install fonts-noto-cjk firefox-esr
```

## Reference

- [CrOS Updates Serving](https://cros-updates-serving.appspot.com/)
- [sebanc/brunch](https://github.com/sebanc/brunch)
- [2020 Chrome OS 安装教程 ，在旧笔记本、闲置台式机上安装原生 Chrome OS ｜亲测有效 保姆级 chromeOS 安装教程](https://www.youtube.com/watch?v=HGH96fXk4p0&t=1s)
- [How To Install NodeJS On Linux](https://ostechnix.com/install-node-js-linux/)
- [Installation](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/)
- [docker.sock permission denied](https://stackoverflow.com/questions/48568172/docker-sock-permission-denied)
- [How to Install fonts-noto-cjk in Ubuntu 18.04](https://www.howtoinstall.me/ubuntu/18-04/fonts-noto-cjk/)
