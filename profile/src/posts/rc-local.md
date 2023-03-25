---
title: 在 Linux 启动的时候加载自定义脚本自己的 —— rc.local
date: 2018-06-20 10:08:40
tags: 
- Linux
categories: Config
---

因为每次得手动启动酸酸乳，很麻烦，网上找了下自己启动 sh 脚本的方法，而且可以默认使用 sudo 执行。

## 编写自己的 `sh`
``` sh
python /home/vincec/Downloads/shadowsocksr/shadowsocks/local.py -c /etc/shadowsocks.json -d start 
# python /home/vincec/shadowsocksr/shadowsocks/local.py -c /etc/shadowsocks.json -d stop
```

## 编辑 `rc.local`
``` bash
sudo nano /etc/rc.local

#modify
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

sh '/home/vincec/Documents/sh/ssr.sh' &
exit 0
```

## 更改权限
``` bash
sudo chown root /etc/rc.local
sudo chmod 755 /etc/rc.local

#or
# sudo chmod +x /etc/rc.local
```

## 测试启动
``` bash
sudo /etc/rc.local start
```

## `rc-local` servies
``` bash
#测试 `rc-local` 状态
sudo systemctl status rc-local

#启动
sudo systemctl enable rc-local

#unit files 找不到，则
sudo nano /etc/systemd/system/rc-local.service
#add
[Unit]
Description=/etc/rc.local Compatibility

[Service]
Type=forking
ExecStart=/etc/rc.local
TimeoutSec=0
StandardInput=tty
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target

#or
# [Unit]
#  Description=/etc/rc.local Compatibility
#  ConditionPathExists=/etc/rc.local

# [Service]
#  Type=forking
#  ExecStart=/etc/rc.local start
#  TimeoutSec=0
#  StandardOutput=tty
#  RemainAfterExit=yes
#  SysVStartPriority=99

# [Install]
#  WantedBy=multi-user.target

#启动并检查
sudo systemctl start rc-local.service
sudo systemctl status rc-local.service
```

## Reference
- [Startup script with sudo in Ubuntu 16.10](https://askubuntu.com/questions/889632/startup-script-with-sudo-in-ubuntu-16-10)
- [How can I make “rc.local” run on startup?](https://askubuntu.com/questions/9853/how-can-i-make-rc-local-run-on-startup)
- [How to Enable /etc/rc.local with Systemd](https://www.linuxbabe.com/linux-server/how-to-enable-etcrc-local-with-systemd)
- [[SOLVED] systemd and rc-local.service](https://bbs.archlinux.org/viewtopic.php?id=147790)