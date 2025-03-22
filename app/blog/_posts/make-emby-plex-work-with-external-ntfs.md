---
title: Make Emby(Plex) support nfts external hdd driver
date: 2019-07-07 00:43:44
tags:
- Linux
categories: Config
---

[Emby](https://emby.media/) is a great media origizaion and delivery solution. But I found need to tweak for make ntfs extermal drive set as a path in Linux. Othrwise, the access problem will show. Under Plex should be work as same.

# Step
- Add autostart command, `sudo systemctl enable emby-server`
- Find UUID of ntfs drive, `sudo blkid`
- Add line in fstab, `sudo nano /etc/fstab`, with `UUID=YOUR_UUID /mnt/YOUR_MOUNT ntfs-3g nofail,rw,user,uid=1000,gid=1000,dmask=022,fmask=133,permissions,noatime,windows_names 0 0
`
- If not work, change permisson for accessing,

``` bash
groupadd movies
usermod -aG movies emby
sudo chown -R root:movies /media/<drive_name>

sudo chmod -R u+rwX /media/<drive_name>
#sudo chmod -R g+rwX /media/<drive_name>
#sudo chmod -R o+rX /media/<drive_name>
sudo systemctl restart emby-server
```

# Reference
- [help-with-emby-and-ntfs-drives](https://forum.manjaro.org/t/help-with-emby-and-ntfs-drives/51903/8)
- [Linux noob needs help. (Path for external drive)](https://emby.media/community/index.php?/topic/55874-linux-noob-needs-help-path-for-external-drive/)
- [Find UUID of Storage Devices in Linux](https://linuxhint.com/uuid_storage_devices_linux/)