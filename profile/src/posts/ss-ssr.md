---
title: 酸酸 和 酸酸乳
date: 2018-05-15 21:09:26
tags:
- 科学
- Linux
- Windows
- MacOS
- IOS
- Android
categories: Config
---

- _Updated on June 2, 2018 - SSR_

之前就有写过一点配置 酸酸 的心得，现在在这里单独开一篇整理归类一下。

# Server端配置 

## 酸酸 SS

_ref： [科学上网的终极姿势-在-vultr-vps-上搭建](https://medium.com/@zoomyale/科学上网的终极姿势-在-vultr-vps-上搭建-shadowsocks-fd57c807d97e)_
- 注册 vps
- `ssh root@<host>`
-
    ``` bash
    wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh
    chmod +x shadowsocks.sh
    ./shadowsocks.sh 2>&1 | tee shadowsocks.log
    ```
- 输入个人密码
- 选择端口
- 加密方式
- TCP Fast Open
    ``` bash
    nano /etc/rc.local
    #add
    #echo 3 > /proc/sys/net/ipv4/tcp_fastopen

    nano /etc/sysctl.conf
    #add
    #net.ipv4.tcp_fastopen = 3

    nano /etc/shadowsocks.json
    #modify
    #"fast_open":true
    ```
- add firewall port _（optional）_
    ``` bash
    iptables -I INPUT -m state — state NEW -m tcp -p tcp — dport <newport> -j ACCEPT
    iptables -I INPUT -m state — state NEW -m udp -p udp — dport <newport> -j ACCEPT
    #<newport> with new port
    /etc/init.d/iptables save
    /etc/init.d/iptables restart
    ```
- 重启 ss

`/etc/init.d/shadowsocks restart`

- 部署锐速 _（本人失败， 不支持的内核）_
- BBR加速 _（ref：[安装锐速加速：不支持的内核 #81](https://github.com/Alvin9999/new-pac/issues/81)）_
    ``` bash
    yum -y install wget
    wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
    chmod +x bbr.sh
    ./bbr.sh
    ```
- 填 anyconnection server 的天坑

---

## 酸酸乳 SSR

酸酸 好像有时候会无缘无故上不去，于是更换了听说更加安全的 酸酸乳，也改了服务器到🇫🇷

- 同样安装大神的脚本

    ``` bash
    wget --no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocksR.sh
    chmod +x shadowsocksR.sh
    ./shadowsocksR.sh 2>&1 | tee shadowsocksR.log
    ```
- 同样选择密码和 port 号等，之后更改可以在 `nano /etc/shadowsocks.json`
- 重启 `/etc/init.d/shadowsocks restart`

## Google BBR and Optimize the Server

- BBR

    ``` bash
    wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
    chmod +x bbr.sh
    ./bbr.sh #may need reboot
    lsmod | grep bbr #show "tcp_bbr"
    ```
- Optimize the Server

    ``` bash
    nano /etc/sysctl.conf
    #add after = bbr line

    fs.file-max = 51200
    net.core.rmem_max = 67108864
    net.core.wmem_max = 67108864
    net.core.netdev_max_backlog = 250000
    net.core.somaxconn = 4096
    net.ipv4.tcp_syncookies = 1
    net.ipv4.tcp_tw_reuse = 1
    net.ipv4.tcp_tw_recycle = 0
    net.ipv4.tcp_fin_timeout = 30
    net.ipv4.tcp_keepalive_time = 1200
    net.ipv4.ip_local_port_range = 10000 65000
    net.ipv4.tcp_max_syn_backlog = 8192
    net.ipv4.tcp_max_tw_buckets = 5000
    net.ipv4.tcp_fastopen = 3
    net.ipv4.tcp_mem = 25600 51200 102400
    net.ipv4.tcp_rmem = 4096 87380 67108864
    net.ipv4.tcp_wmem = 4096 65536 67108864
    net.ipv4.tcp_mtu_probing = 1
    #save

    sysctl -p #apply the settings

    nano /etc/security/limits.conf
    #add
    * soft nofile 51200
    * hard nofile 51200
    #save

    nano /etc/pam.d/common-session
    #add
    session required pam_limits.so
    nano /etc/profile
    #add
    ulimit -n 51200

    ulimit -n 51200 #apply

    /etc/init.d/shadowsocks restart #restart the ssr
    ```

- Share your server

    ``` bash
    nano /etc/shadowsocks.json
    #edit

    {
        "server":"0.0.0.0",
        "server_ipv6":"::",
        "port_password": {
            "443": "password1",
            "1194": "password2",
            "8000": "password3",
            "8383": "password4",
            "8384": "password5",
            "3000": "password6", 
            "3001": "password7", 
            "3002": "password8",
            "3003": "password9", 
            "3004": "password10", 
            "3005": "password11", 
            "3006": "password12", 
            "3007": "password13", 
            "3008": "password14", 
            "3009": "password15", 
            "3010": "password16"
        },
        "local_address":"127.0.0.1",
        "local_port":1080,
        "timeout":120,
        "method":"chacha20",
        "protocol":"origin",
        "protocol_param":"",
        "obfs":"http_simple_compatible",
        "obfs_param":"",
        "redirect":"",
        "dns_ipv6":false,
        "fast_open":true,
        "workers":1
    }

    /etc/init.d/shadowsocks restart #restart ssr
    ```

# Client端配置

建议移步至酸酸乳

## 酸酸

- [ss](http://www.shadowsocks.org/en/download/clients.html) 
- [ssx](https://www.sednax.com/index.php) 
- ### Win-ss
    [ss-win](https://github.com/shadowsocks/shadowsocks-windows/releases)
- ### Mac-ss
    [ssX-NG](https://github.com/shadowsocks/ShadowsocksX-NG/releases)
- ### Android-ss
    1. [beta](https://play.google.com/store/apps/details?id=com.github.shadowsocks)
    2. [guyhub](GitHub)
- ### IOS（[国区下架情况](https://www.qimai.cn/rank/offline/date/2017-07-29)）- ss
    1. [SsrConnectPro in CN APPSTORE](https://itunes.apple.com/ua/app/ssrconnectpro/id1272045249?mt=8) - ssr 的大部分不支持
    2. [Mume Red in CN APPSTORE](https://itunes.apple.com/cn/app/寒梅-mume-red/id1256315160?mt=8) 
    3. [BananaNet in CN APPSTORE](https://itunes.apple.com/cn/app/banananet-专为ss-ssr设计/id1234881211?mt=8)

## 酸酸乳

- ### Win-ssr
    [SSR for Windows](https://github.com/shadowsocksrr/shadowsocksr-csharp/releases)
- ### Mac-ssr
    [SSR for Mac](https://github.com/qinyuhang/ShadowsocksX-NG-R/releases)
- ### Android-ssr
	[SSR for Android](https://github.com/shadowsocksrr/shadowsocksr-android/releases)
- ### IOS（[国区下架情况](https://www.qimai.cn/rank/offline/date/2017-07-29)）- ssr
    1. [Surge](https://itunes.apple.com/us/app/surge-3-web-developer-tool/id1329879957?ls=1&mt=8)
    2. [potatso lite](https://itunes.apple.com/us/app/potatso-lite/id1239860606?mt=8)

## Linux

1. Install dependencies

``` bash
sudo apt-get install git python-m2crypto libsodium18
```

2. Get SSR

``` bash
cd ~/Downloads
git clone -b manyuser https://github.com/shadowsocksrr/shadowsocksr.git
```

3.  Edit configuration json

``` bash
sudo nano /etc/shadowsocks.json
```

```json
{
"server":"12.34.56.78",
"server_ipv6":"::",
"server_port":8388,
"local_address":"127.0.0.1",
"local_port":1080,
"password":"happy2017",
"timeout":300,
"udp_timeout":60,
"method":"aes-256-ctr",
"protocol":"auth_aes128_md5", //origin
"protocol_param":"",
"obfs":"tls1.2_ticket_auth", //http_simple
"obfs_param":"",
"fast_open":true,
"workers":1
}
```

4. **Run**

``` bash
sudo python ~/Downloads/shadowsocksr/shadowsocks/local.py -c /etc/shadowsocks.json -d start
```

5. Check running (option)

``` bash
sudo tail /var/log/shadowsocksr.log
```

6. **Stop**

``` bash
sudo python ~/Downloads/shadowsocksr/shadowsocks/local.py -c /etc/shadowsocks.json -d stop
```

## Browsers

- Firefox  
    1. [`FoxyProxy`](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/)  _(FORMAT: `autoproxy`，Obfuscation: `BASE64`)_
    2. [`Proxy SwitchyOmega`](https://addons.mozilla.org/en-US/firefox/addon/switchyomega/?src=search)

- Chrome  
    1. [`Proxy SwitchyOmega`](https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif?utm_source=chrome-app-launcher-info-dialog)
    2. [crx离线下载](https://chrome-extension-downloader.com)
    3. [gfwlist.txt](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)
    4. setting config
        ![](https://i.imgur.com/3SWNlkZ.png 'instruction')

## Git

- 设置git代理

``` bash
# shadowsocks的本地端口默认是1080
git config --global http.proxy ‘socks5://127.0.0.1:1080’
git config --global https.proxy ‘socks5://127.0.0.1:1080’ 
```

- 取消git代理

``` bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## Terminal

- 设置ALL_PROXY, 可以通过curl -i [http://ip.cn](http://ip.cn) 查看IP改变来测试是否生效

``` bash
export ALL_PROXY=socks5://127.0.0.1:1080 #设置代理
curl -i http://ip.cn #查看ip测试是否生效

unset ALL_PROXY #清除代理
```

- Or edit `~/.zshrc` or `~/.bashrc`

_([拓展1](https://wiki.archlinux.org/index.php/Zsh) / [拓展2](https://wiki.archlinux.org/index.php/Proxy_settings))_

``` bash
export http_proxy="socks5://127.0.0.1:1080"
export https_proxy="socks5://127.0.0.1:1080"
```

# Reference

- [大概是萌新也看得懂的SSR功能详细介绍&使用教程](https://lolico.moe/tutorial/shadowsocksr.html/comment-page-1 '大概是萌新也看得懂的SSR功能详细介绍&使用教程')
- [部分使用 Network Extension 功能的 app 在国区被下架](https://cn.v2ex.com/t/378811?p=1 '部分使用 Network Extension 功能的 app 在国区被下架')
- [How to Setup a Fast Shadowsocks Server on Vultr VPS](https://www.tipsforchina.com/how-to-setup-a-fast-shadowsocks-server-on-vultr-vps-the-easy-way.html 'How to Setup a Fast Shadowsocks Server on Vultr VPS')
- [Setup Your Own Shadowsocks Server On Debian, Ubuntu, CentOS](https://www.linuxbabe.com/linux-server/setup-your-own-shadowsocks-server-on-debian-ubuntu-centos 'Setup Your Own Shadowsocks Server On Debian, Ubuntu, CentOS')
- [無VPN照上Facebook(iOS篇)](https://unwire.hk/2017/08/07/shadowsocksr-ios/tips-2/ '無VPN照上Facebook(iOS篇)')
- [ShadowsocksR Clients and Server](https://dcamero.azurewebsites.net/shadowsocksr.html 'ShadowsocksR Clients and Server')

-心累-
