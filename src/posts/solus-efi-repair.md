---
title: Solus Efi Repair
date: 2018-11-19 04:15:04
tags:
- Linux
categories: Config
---

Had faced a bad time, because just accidentally deleted the EFI partition, now I need to repair two Linux and one Windows on my laptop. 

For Ubuntu, I simple use repair grub tool. I have already created an old [notes](../../../06/19/grub-note/index.html) for it.

For windows, I make a liveCD and `Shift+F10` in the welcome page, typing `bcdboot c:\windows /l zh-cn` to repair the `Microsoft` folder in the EFI partition.

However, for the Solus, it becomes complex for me. Since Solus using UEFI called goofiboot instead of using grub[1], I only find a way by referring the steps by official website[2] with Solus liveCD. It should also be done in other Linux live CDs technically.
Here is the steps:

``` bash
#install efibootmgr package in update center of liveCD
sudo efibootmgr --create --disk /dev/nvme0n1 --part 1 --loader /EFI/systemd/systemd-bootx64.efi --label "Solus" #/dev/nvme0n1 or /dev/sdaX is your EFI partition

# BootCurrent: 0009
# Timeout: 0 seconds
# BootOrder: 000A,0007,0008,0006,0000,0005,0001,0002,0003,0004,0009
# Boot0000* ubuntu
# Boot0001* Diskette Drive
# Boot0002* USB Storage Device
# Boot0003* CD/DVD/CD-RW Drive
# Boot0004* Onboard NIC
# Boot0005* Windows Boot Manager
# Boot0006* Ubuntu
# Boot0007* opensuse-secureboot
# Boot0008* neon
# Boot0009* UEFI: SanDisk Extreme 0001, Partition 1
# Boot000A* Solus


lsblk #check the partition
# NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
# loop0         7:0    0   1.4G  1 loop /run/initramfs/squashfs
# loop1         7:1    0   6.4G  1 loop /run/rootfsbase
# loop2         7:2    0   6.4G  1 loop 
# └─live-base 253:0    0   6.4G  1 dm   
# sda           8:0    1  14.9G  0 disk 
# ├─sda1        8:1    1   1.4G  0 part /run/initramfs/live
# └─sda2        8:2    1    40M  0 part 
# nvme0n1     259:0    0 953.9G  0 disk 
# ├─nvme0n1p1 259:1    0   599M  0 part 
# ├─nvme0n1p2 259:2    0    16M  0 part 
# ├─nvme0n1p3 259:3    0   683G  0 part 
# ├─nvme0n1p4 259:4    0  70.5G  0 part 
# ├─nvme0n1p5 259:5    0  62.1G  0 part 
# ├─nvme0n1p6 259:6    0  58.6G  0 part 
# ├─nvme0n1p7 259:7    0  63.5G  0 part 
# └─nvme0n1p8 259:8    0  15.6G  0 part 


cd /
sudo su
mkdir /target
mount /dev/nvme0n1p5 /target #/dev/nvme0n5 or /dev/sdaX is your solus partition
mount /dev/nvme0n1p1 /target/boot
mount --bind /proc /target/proc
mount --bind /dev /target/dev
mount --bind /sys /target/sys
chroot /target
sudo clr-boot-manager update

# Then reboot the system.

```

## Reference:
- [1](https://www.reddit.com/r/SolusProject/comments/919e4d/solus_disappeared_from_boot_options_after_cmos/)
- [2](https://getsol.us//articles/troubleshooting/boot-rescue/en/)