---
title: Linux 下 Grub 的各种问题笔记
date: 2018-06-19 14:27:11
tags: 
- Linux
categories: Config
---

If need to repair boot in solus, go to [this article](../../../11/19/solus-efi-repair/index.html)

# Patch PICe Bus error though grub

- _Temporarily add a boot parameter to a kernel:_ edit `linux` in the end，`ctrl + x` to boot.
- _Make this change permanent:_
    1. `$ sudo nano /etc/default/grub`
    2. `GRUB_CMDLINE_LINUX_DEFAULT="quiet splash foo=bar"`
    3. Regenerate the GRUB: 
      - `$ sudo update-grub` 
      - or `sudo os-prober` 
      - or `$ sudo grub-mkconfig -o /boot/grub/grub.cfg` 
      - or `$ sudo grub2-mkconfig -o /boot/grub2/grub.cfg`
    4. (optional) make own _update-grub_
    ``` bash
    sudo nano /usr/sbin/update-grub

    #!/bin/sh
    set -e
    exec grub2-mkconfig -o /boot/grub2/grub.cfg "$@"

    #save & chmod
    chmod +x /usr/sbin/update-grub
    ```

---

# grub rescue 的解决方法

- `ls` 找到对应的分区
- `set prefix=(hd0,gpt5)/boot/grub` 确认之后设置 prefix
- `set root=(hd0,gpt5)` 设置 root
- `ls /`
- `insmod normal`
- `normal`
- 进入系统
- `sudo update-grub` & `sudo grub-install /dev/sda` 更新引导文件 _(sudo grub-install /dev/sdX, where /dev/sdX is your boot drive)_

## 相关：

- [Linux 与 Windows 10 用 GRUB 引导教程](https://blog.itswincer.com/posts/ad42f575/)
- [GRUB rescue problem](https://askubuntu.com/questions/493826/grub-rescue-problem-after-deleting-ubuntu-partition)

---

# Manjaro 等 Linux 安装完无法进入 grub 的解决方法

- **重启到Windows 10后无法进入Linux系统**
  - 进入管理员命令行，方法：`win+x`，再按`a`；
  - 输入：`bcdedit /set {bootmgr} path \EFI\manjaro\grubx64.efi` or `bcdedit /set {bootmgr} path \EFI\ubuntu\grubx64.efi`
  - 提示操作成功后就设置好了；

- **重新设置Windows 10 为默认 :**
  - `bcdedit /set {bootmgr} path C:\Windows\system32\winload.efi`

- 添加 Windows10 boot [具体查看](http://www.jianshu.com/p/5007e555ec12)
  `/boot/grub/grub.cfg`

  ``` bash
  menuentry "Microsoft Windows 10" {
    insmod part_gpt
    insmod fat
    insmod search_fs_uuid
    insmod chain
    search --fs-uuid --set=root $hints_string $fs_uuid
    chainloader /EFI/Microsoft/Boot/bootmgfw.efi
  }
  ```

---

- <del>添加 Android x86 7.1-rc1</del> **(第一次可以启动，第二次无法启动，需手动删除“LOST。DIR”)**
  原本手上的小黑 yoga 已经装了 Android x86（ext4）看 kindle 漫画，但是装完 Linux 后 Android 的引导就不见了，网上搜了下都是 Android x86 早期 (4.4) 的引导设置，那些设置在 7.1 版本下无法引导成功，自己尝试了好久终于找到了本地完美成功的方法：
  修改 `/etc/grub.d/40_custom`

  ``` bash
  menuentry 'Android 7.1-rc1 (on /dev/sdb7)'{
      set root='(hd0,sda7)' #sda7 根据自己修改
      search --file --no-floppy --set=root /android-7.1-rc1/kernel
      linux /android-7.1-rc1/kernel quiet root=/dev/ram0 androidboot.selinux=permissive
      initrd /android-7.1-rc1/initrd.img
  }

  $ sudo chmod +x /etc/grub.d/40_custom #修改 40_custom 权限并更新 grub
  $ sudo update-grub
  ```

- **一次成功的解决 grub 中的引导问题！！！**
  我的引导出错的顺序是这样的，先装了 Android x86, 然后装的时候把整个 efi 都给格了。。之后重装电脑中Linux的分区，折腾捣鼓了一个下午，结果发现一个很简单的解决方法，按以下步骤：
  1. Linux下，先删除`/boot/efi/EFI/Microsoft/` 的主目录
  2. 先往u盘写一个win10，u盘启动，`Shift+F10`调出命令提示符，输入`bcdboot c:\windows /l zh-cn`， 重启成功进入 windows。[来源](https://www.zhihu.com/question/23499575)
  3. win下管理员命令行，`win+x`，再按`a`；`bcdedit /set {bootmgr} path \EFI\manjaro\grubx64.efi`,更改至 grub 启动。[来源](http://www.jianshu.com/p/5007e555ec12)
  4. 在文件管理器中mount Windows分区, `sudo os-prober`, `sudo update-grub`,成功！[来源](https://askubuntu.com/questions/197868/grub-does-not-detect-windows)
  5. 如果上述方法失效，卸载`grub`再重新安装

---

# 其他

以下是其他的一些笔记，先保留以备未来用到：

- grub-customizer
  `yaourt -S grub-customizer`

- [Arch Wiki](https://wiki.archlinux.org/index.php/GRUB#Dual-booting) _([拓展](https://wiki.archlinux.org/index.php/Dual_boot_with_Windows_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)))_

  Throughout this section, it is assumed your Windows partition is `/dev/sda1`. A different partition will change every instance of hd0,msdos1. Add the below code to `/etc/grub.d/40_custom` or `/boot/grub/custom.cfg` and regenerate `grub.cfg` with `sudo grub-mkconfig` as explained above to boot Windows (XP, Vista, 7, 8 or 10) installed in BIOS-MBR mode:
  partition UUID getten with command `sudo lsblk --fs`.

  ``` bash
  if [ "${grub_platform}" == "pc" ]; then
    menuentry "Microsoft Windows Vista/7/8/8.1/10 BIOS-MBR" {
      insmod part_msdos
      insmod ntfs
      insmod search_fs_uuid
      insmod ntldr
      search --fs-uuid --set=root --hint-bios=hd0,msdos1 --hint-efi=hd0,msdos1 --hint-baremetal=ahci0,msdos1 69B235F6749E84CE
      ntldr /bootmgr
    }
  fi
  ```

- [How to repair Windows Boot Manager from Linux](https://gist.github.com/keegoid/f35601c1095337d842ff), [25.5. Customizing the GRUB 2 Configuration File](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/system_administrators_guide/sec-customizing_the_grub_2_configuration_file/)

  ```bash
  [vincec@vincec-pc ~]$ sudo gdisk -l /dev/sda
  [sudo] password for vincec:
  GPT fdisk (gdisk) version 1.0.3

  Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

  Found valid GPT with protective MBR; using GPT.
  Disk /dev/sda: 500118192 sectors, 238.5 GiB
  Model: SAMSUNG MZ7TY256
  Sector size (logical/physical): 512/512 bytes
  Disk identifier (GUID): C03C819B-223D-4D3A-97DB-93140E8B3C68
  Partition table holds up to 128 entries
  Main partition table begins at sector 2 and ends at sector 33
  First usable sector is 34, last usable sector is 500118158
  Partitions will be aligned on 32-sector boundaries
  Total free space is 2014 sectors (1007.0 KiB)

  Number Start (sector) End (sector) Size Code Name
  1 2048 923647 450.0 MiB 2700 Basic data partition
  2 923648 1128447 100.0 MiB EF00 EFI system partition
  3 1128448 1161215 16.0 MiB 0C01 Microsoft reserved ...
  4 1161216 226494463 107.4 GiB 0700 Basic data partition
  5 251660288 438744991 89.2 GiB 0700 Basic data partition
  6 438744992 500118158 29.3 GiB 8300
  7 226494464 251660287 12.0 GiB 8300
  [vincec@vincec-pc ~]$ blkid /dev/sda2
  /dev/sda2: LABEL="EFI" UUID="59D0-9D37" TYPE="vfat" PARTLABEL="EFI system partition" PARTUUID="f9e7071c-350a-42d9-bc5c-8debc47fda13"

  [vincec@vincec-pc ~]$ cd /boot/efi/efi
  [vincec@vincec-pc efi]$ sudo mkdir Microsoft
  [vincec@vincec-pc efi]$ cd Microsoft/
  [vincec@vincec-pc Microsoft]$ sudo cp -r /run/media/vincec/8EEC2ADEEC2ABFF7/Windows/Boot/EFI/ /boot/efi/EFI/Microsoft/
  [vincec@vincec-pc Microsoft]$ sudo mv EFI Boot
  ```

---

# Reference

- [grub2 update-grub?](https://forums.opensuse.org/showthread.php/477980-grub2-update-grub)
- [How do I add a kernel boot parameter?](https://askubuntu.com/questions/19486/how-do-i-add-a-kernel-boot-parameter)
- [How to Fix: error: unknown filesystem. grub rescue in Linux Mint and Ubuntu](https://www.easytechguides.com/error-unknown-filesystem-grub-rescue.html)
- [Linux与Windows 10用grub引导教程](http://www.jianshu.com/p/5007e555ec12)
- [How to add Android-x86 entry to GRUB2?](https://ubuntuforums.org/showthread.php?t=2307580)
- [Android-x86 7.1 rc1 on PC](http://www.hallergard.com/Blog/Android-x86-7.1-rc1.html)
- [GRUB2 boot stanza for Android x86 7.1 rc1](https://groups.google.com/forum/#!topic/android-x86/fUCo8QaiqXU)
