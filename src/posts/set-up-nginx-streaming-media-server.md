---
title: Set up Nginx Streaming Media Server
date: 2020-03-11 01:13:05
tags: 
- Linux
---

This is a tutorial about how to set up a `nginx` + `rtmp-module` server for personal purpose.

# Server (CentOS or Ubuntu)

``` bash
# install nginx
$ wget http://nginx.org/download/nginx-1.16.1.tar.gz
$ tar -zxvf nginx-1.16.1.tar.gz

$ git clone https://github.com/arut/nginx-rtmp-module.git

# install related package
$ yum install -y httpd-devel pcre perl pcre-devel zlib zlib-devel
#or
$ sudo apt-get install libpcre3 libpcre3-dev zlib1g zlib1g-dev

# install openssl
$ wget https://www.openssl.org/source/openssl-1.1.1d.tar.gz
$ tar -zxvf openssl-1.1.1d.tar.gz

# build nginx with rtmp module
$ cd nginx-1.16.1
$ ./configure --add-module=../nginx-rtmp-module --prefix=/usr/local/nginx --with-openssl=../openssl-1.1.1d --with-cc-opt="-Wimplicit-fallthrough=0"
$ make && make install

# symbolic link
$ ln -s /usr/local/nginx/sbin/nginx /usr/bin/nginx

# test nginx
$ nginx
$ curl localhost
```

## Setting nginx-rtmp-module

``` bash
$ mkdir -p /usr/local/nginx/html/vincec

$ nano /usr/local/nginx/conf/nginx.conf

#insert above http{}
rtmp {
     server {
         listen 1935; # 监听端口
         chunk_size 4000;
         application vincec { # 应用名
             live on;
             hls on;
             hls_path /usr/local/nginx/html/vincec; # 与之前创建的 hls_path 对应
             hls_fragment 5s;
         }
     }
}
```

## Reload nginx
``` bash
$ nginx -s reload
```


# OBS

_Notice: the latest OBS version is not working, version 23-2-1 under windows is working as expected, could [download here](https://open-broadcaster-software.en.uptodown.com/windows/download/2048010)_

![](https://i.imgur.com/YEMZ9l4.png)

![](https://i.imgur.com/vyFMzwq.png)

``` bash
# Close 
$ systemctl stop firewalld

# OBS
rmtp://192.168.199.99/vincec/
key: live

# output URL
http://192.168.199.99/vincec/live.m3u8
```

# Client
Chrome can download [Play HLS M3u8](https://chrome.google.com/webstore/detail/play-hls-m3u8/ckblfoghkjhaclegefojbgllenffajdc) for playing `m3u8`, Edge, safari under Mac is natively support

## Ref:
- https://github.com/arut/nginx-rtmp-module/issues/1283
- https://github.com/arut/nginx-rtmp-module/issues/1358
- https://lichunorz.com/2019/05/05/centos7-nginx-nginx-rtmp-module-obs搭建直播流媒体服务器/
