---
title: Asus Zenbook Pro UX550GE Linux Configure
date: 2018-10-13 17:52:09
tags:
  - Linux
categories: Config
---

![](https://i.imgur.com/KhJMlna.jpg?1)

There almost no information about running Linux on Asus Zenbook Pro UX550GE. This is my first Asus laptop and I did find something that needs to tweak a little bit for Linux running on an Asus machine.

## Bios

Get into bios on my Zenbook is extremely hard. I have to try to press F2 then open the power button but that still not work at the beginning. That is what I did:

- Close the quick boot option, under: `Setting -> Power -> under "close lip option"`
- Go to the `Setting -> recovery -> advanced reboot -> UEFI firmware`
- Finally, enter my Bios
- I also close the quick boot option in the bios
- Now I can easily open bios by pressing F2 when the Asus logo is appearing

## Linux Distro

I had tried plenty of different distributions, including Manjaro KDE/Budgie, Angers, Elementry 0.4.1, Opensuse Tumbleweed, Kubuntu 18.04LTS, Solus Budgie 3.999, but only Kubuntu and Solus Budgie liveCD work. The one that I worked in Ubuntu 18.04 and Solus. Manjaro does open in liveCD but will freeze and can not shut down or reboot) in later.

For Kubuntu and Solus, some tweaks need to be done for reboot or logout normally.

I tried the [[1]arch page on zenbook pro UX501](https://wiki.archlinux.org/index.php/ASUS_Zenbook_Pro_UX501), and some parts work. I add parameters of `i915.enable_execlists=0` and `acpi_osi= acpi_backlight=native` on both of them.

More can refer [[2]](https://wiki.archlinux.org/index.php/Laptop/ASUS) [[3]](https://wiki.archlinux.org/index.php/Category:ASUS)

![](https://i.imgur.com/7Z5HCND.png?1)

### For Kubuntu:

Also can refer my [previous post](//blog/2018/06/19/grub-note/))

```bash
> sudo nano /etc/default/grub
#Add the paremeters before 'quite splash'
> sudo update-grub
```

### For Solus:

Some different in add parameter because it is not bootload though grub under UEFI, see [[4] page](https://getsol.us/forums/viewtopic.php?t=9038sudo)

I manually open the EFI file under the EFI partition to boot from Solus.

```bash
> sudo su
> mkdir -p /etc/kernel
> echo "i915.enable_execlists=0 acpi_osi= acpi_backlight=native" > /etc/kernel/cmdline
> clr-boot-manager update
> exit
```

## Problem Found

The function key: `keyboard light` is still can not open through a key shortcut on my keyboard.
