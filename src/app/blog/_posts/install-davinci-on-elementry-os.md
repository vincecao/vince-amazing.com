---
title: Install DaVinCi 15 on Elementry OS
date: 2018-10-27 01:03:00
tags: 
- Linux
categories: Config
---

Just found DaVinCi 15 is also available on Linux with its version 15. This is an almost perfect alternative with Final Cut Pro because it's free and Linux-friendly.

But still met some problem when installing it on Elementry OS 5.0 Juno

After downloading from the official website, and ran the `sh` file. I just can not directly open it. I Downloaded the `AppEditor` for finding the command of DaVinCi was `'/opt/resolve/bin/resolve'`. Then checking through the terminal and found `error while loading shared libraries: libOpenCL.so.1: cannot open shared object file: No such file or directory`. 

Then it is what I did for this problem. Due to touchpad issue, I RMA my Asus Zenbook pro, for now, I decide to get an alternative dell 7390 with its great price. Since the laptop did not have a dedicated graphics card but only a poor Intel graphic card, I first checked if it had correctly installed Intel Driver. It seems the driver was not complete from a fresh install by liveCD[1](https://plumz.me/archives/8086/). By checking `sudo cat /sys/kernel/debug/dri/0/i915_huc_load_status` and `sudo cat /sys/kernel/debug/dri/0/i915_guc_load_status`, I decide to add the parameter in the boot grub. And that correct my color profile in chrome browser.

``` bash
$ sudo nano /etc/default/grub

#GRUB_CMDLINE_LINUX_DEFAULT= "intel_pstate=skylake_hwp i915.enable_guc_loading=1 i915.enable_guc_submission=1 quiet splash"

$ sudo update-grub
```

Also the `libOpenCL.so` need to be install [2](https://askubuntu.com/questions/796770/how-to-install-libopencl-so-on-ubuntu).

``` bash
$ sudo apt update
$ sudo apt install ocl-icd-opencl-dev
```

For those having AMD or Nvidia card, the extra drivers should work for the `libOpenCL.so` file.

Then I can open it start menu. However, after showing some welcome windows. It just aborted again.

``` bash
$ '/opt/resolve/bin/resolve'

ActCCMessage Already in Table: Code= c005, Mode= 13, Level=  1, CmdKey= -1, Option= 0
ActCCMessage Already in Table: Code= c006, Mode= 13, Level=  1, CmdKey= -1, Option= 0
ActCCMessage Already in Table: Code= c007, Mode= 13, Level=  1, CmdKey= -1, Option= 0
ActCCMessage Already in Table: Code= 2282, Mode=  0, Level=  0, CmdKey= 8, Option= 0
15.1.2 (#008) Linux/Clang
Main thread starts: A8F91B00
[0x7ff4a8f91b00] | Undefined            | INFO  | 2018-10-27 01:57:06,145 | --------------------------------------------------------------------------------
[0x7ff4a8f91b00] | Undefined            | INFO  | 2018-10-27 01:57:06,145 | Loaded log config from /opt/resolve/configs/log-conf.xml
[0x7ff4a8f91b00] | Undefined            | INFO  | 2018-10-27 01:57:06,145 | --------------------------------------------------------------------------------
Aborted

```

I did some research and after installing GStreamer Multimedia Codecs and `apt-get install beignet clinfo`[3](https://askubuntu.com/questions/1058598/davinci-resolve-15-doesnt-start-on-ubuntu-18-04), it finally works. But my intel graphic might to weak for running it. So sad.

![](https://i.imgur.com/eURtdor.png)
![](https://i.imgur.com/gg2JwRf.png)

## Reference
1. [不知道有用没用的 Intel 显卡优化](https://plumz.me/archives/8086/)
2. [How to install libOpenCL.so on ubuntu](https://askubuntu.com/questions/796770/how-to-install-libopencl-so-on-ubuntu)
3. [DaVinci Resolve 15 doesn't start on Ubuntu 18.04](https://askubuntu.com/questions/1058598/davinci-resolve-15-doesnt-start-on-ubuntu-18-04)
4. [DaVinci Resolve on Linux - Install issues](https://forum.blackmagicdesign.com/viewtopic.php?f=21&t=56878&start=50)