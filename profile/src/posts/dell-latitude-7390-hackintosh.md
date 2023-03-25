---
title: Dell Latitude 7390 Hackintosh Mojave
date: 2018-11-21 05:34:56
tags:
- MacOS
- Tutorial
categories: Config
---
<video src="https://i.imgur.com/rEK36iq.mp4" autoplay="" muted="" loop="">
Your Browser does not support see this gif file, upgrade to Firefox 3.5+, Google Chrome, or Safari.
</video></br>

Just want to share some achievements in Dell Latitude 7390 Hackintosh. I did not find anyone sharing with this specs. And here is what I have done to install macOS Mojave 10.14 for now.

## Specs
- i7-8650U vPro
- 16GB DDR4 Single Channel
- Intel UHD 620 unkown ram
- FHD touchscreen
- 1T NVME PCIE Toshiba SSD
- ...

![](https://i.imgur.com/axU3QUH.jpg)

## Steps
1. Download the store version of a dmg image file in macOS, using [Unibeast](https://www.tonymacx86.com/resources/unibeast-9-0-0-mojave.406/)  write into the 8+ GB USB flash drive. This step could also be done by using [TransMac](https://www.acutesystems.com/scrtm.htm) in PC.
2. Made an empty space in the drive for the new macOS installation. Formating into `FAT` or `exFAT` would be easier later for recognizing and formating again into `APFS` or `HFS+` partition.
3. Bios configurations disable: [1]
    - VT-D
    - CFG-Lock
    - Secure Boot
    - Io Serial Port 
    - USB 3.0 (not sure)
    - XHCI - handoff
4. Keeping booting from EFI in the USB driver when installing the Mac when several restarts needed.
5. Entering into the system by using [Clover Configurator](https://mackie100projects.altervista.org/download-clover-configurator/), mounting both EFI in PC and EFI in USB. Copy to the whole `Clover` folder USB EFI into system EFI
6. Tweaking the Clover file again and again ..., could be done by using [Multibeast](https://www.tonymacx86.com/resources/categories/tonymacx86-downloads.3/) or downloading from the Internet, like [markwithtech](https://markwithtech.com/d/43-common-kexts-and-other-downloads-for-hackintosh) and [tonymacx86](www.tonymacx86.com), especially from [RehabMan](https://bitbucket.org/RehabMan/). Some Kext tools you could use are: [Kext Wizard](https://macdownload.informer.com/kext-wizard/3.7/), [KextBeast](https://www.tonymacx86.com/resources/kextbeast.32/) and [[Kext Utility](http://cvad-mac.narod.ru/files/Kext_Utility.app.v2.6.6.zip)
7. (Repeat 6)

## My Clover and S(ystem)/L(ibrary)/E(xtensions)

![](https://i.imgur.com/SzmOKOT.png)
![](https://i.imgur.com/EZdjfCS.png)
![](https://i.imgur.com/cdAqgK8.jpg)
![](https://i.imgur.com/5u3Mzow.jpg)

[Download](https://drive.google.com/open?id=1XeXAOfZySyNpA46vMFapCvMrkrNYmRpT)

## Work

- UHD 620 flawlessly with screen bright light adjustment(`Fn + S` and `Fn + B`)
- Keyboard
- Audio / speaker
- The camera can be used for facetime
- Ethernet port
- AC and battery
- Sleep (but no lip action)
- 2 USB ports
- Touch Screen

![](https://i.imgur.com/lkvityz.png)

## Not work

- Touchpad
- Wifi - intel 9265 / 8265
- Bluetooth in the wireless card is shown usable but can not find devices and can not close
- HDMI and Type c docking (will reboot when plugging)
- Feel very hot some times, but overall looks good
- (still not sure)

![](https://i.imgur.com/VbNSYJW.png)

## Reference:
- [1](https://www.youtube.com/watch?v=MAoOAa_izh0)
- [2](https://www.tonymacx86.com/threads/guide-dell-xps-13-9360-on-macos-sierra-10-12-x-lts-long-term-support-guide.213141/)
- [3](https://www.tonymacx86.com/threads/intel-hd-620-only-7mb.248357/)