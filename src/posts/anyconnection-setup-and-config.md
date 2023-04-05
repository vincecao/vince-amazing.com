---
title: AnyConnect Server(Ocserv) & Client(Openwrt, Linux, Windows & Mac) Configuares
date: 2019-08-02 14:09:11
tags: 
- 科学
- Linux
- Windows
- MacOS
- IOS
- Android
categories: Config
---

_Update -3/10/2020-_

# Server(Ocserv) Setup

``` zsh
#Distro is in Debain
sudo apt-get install ocserv #yum install ocserv
# package is quite new in apt-get

sudo apt-get install gnutls-bin

# Check staus
systemctl status ocserv

# Start & restart Serive
sudo systemctl start ocserv.service
sudo systemctl restart ocserv.service

```
![](https://i.imgur.com/NhB3xqo.png)

## Config

``` zsh
mkdir /etc/ocserv
cd /etc/ocserv

ocpasswd A_USER_NAME
# ocpasswd -c /etc/ocserv/.ocpasswd username

# Create certificates
cat << _EOF_ > ca.tmpl
cn = "fff"
organization = "fff"
serial = 1
expiration_days = 3650
ca
signing_key
cert_signing_key
crl_signing_key
_EOF_

certtool --generate-privkey --outfile ca-key.pem
certtool --generate-self-signed --load-privkey ca-key.pem --template ca.tmpl --outfile ca-cert.pem

cat << _EOF_ > server.tmpl
cn = "<YOUR DNS OR VPS IP ADDRESS>" 
organization = "fff" 
expiration_days = 3650
signing_key 
encryption_key
tls_www_server
_EOF_

certtool --generate-privkey --outfile server-key.pem
certtool --generate-certificate --load-privkey server-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template server.tmpl --outfile server-cert.pem

```

Modify with _/etc/ocserv/ocserv.conf_

``` zsh
# EDIT config file as follow:
auth = "plain[passwd=/etc/ocserv/ocpasswd]"
server-cert = /etc/ocserv/server-cert.pem
server-key = /etc/ocserv/server-key.pem
ca-cert = /etc/ocserv/ca-cert.pem

tcp-port = 8080 #443, as default
udp-port = 8080 #443

#https://www.publicdns.xyz/country/cn.html
dns = 8.8.8.8 #cn: 119.29.29.29
dns = 8.8.4.4

# comment out all route fields
#route = 10.10.10.0/255.255.255.0
#route = 192.168.0.0/255.255.0.0
#route = fef4:db8:1000:1001::/64
#no-route = 192.168.5.0/255.255.255.0

try-mtu-discovery = true
cisco-client-compat = true

###################### END EDIT CONFIG

# More can check 
# https://www.linuxbabe.com/ubuntu/openconnect-vpn-server-ocserv-ubuntu-16-04-17-10-lets-encrypt
# https://github.com/iMeiji/shadowsocks_install/wiki/OpenConnect-VPN-server
```

[Sample Config](/res/ocserv-config/ocserv.conf)

``` zsh
####################### EDIT /etc/sysctl.conf as follow:

net.ipv4.ip_forward=1
# Accept IPv6 advertisements when forwarding is enabled
net.ipv6.conf.all.accept_ra = 2
# enable bbr to increase performance
net.core.default_qdisc=fq
net.ipv4.tcp_congestion_control=bbr

###################### END EDIT /etc/sysctl.conf

# Apply changes to sysctl
sysctl -p /etc/sysctl.conf

# Config iptables
iptables -t filter -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
iptables -t filter -A INPUT -p udp -m udp --dport 443 -j ACCEPT
iptables -t nat -A POSTROUTING  -j MASQUERADE

# OR 
#iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

check individual port
nc -vz localhost 80
nc -vz localhost 443

# Test nginx content
# curl localhost:80

# iptables start
# centos Install 
# yum install iptables-services
sudo service iptables start

# Run debuggable process to test evertything. Remove `-f -d 1` to run it as daemon
ocserv --config=/etc/ocserv/config -f -d 1
```

## Setup Network Rules(options)

``` zsh
# Add IPTables Rule
iptables -A FORWARD -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

# Open necessary ports on the firewall
ufw allow 443
ufw allow 443/udp
sudo ufw allow out to any port 443

ufw allow 80
ufw allow 80/udp
sudo ufw allow out to any port 80

ufw allow 22
ufw allow 22/udp
sudo ufw allow out to any port 22

# Verify the firewall ruleset
sudo ufw status verbose

# Change the default forwarding policy
DEFAULT_FORWARD_POLICY="ACCEPT"

# Set NAT Rules
# Set NAT Rules to any routes that you want to be able to access through the VPN
echo "*nat" >> /etc/ufw/before.rules
echo ":POSTROUTING ACCEPT [0:0]" >> /etc/ufw/before.rules

# Change NAT IP/subnet HERE accordingly to your ocserv.conf configs
echo "-A POSTROUTING -s 192.168.1.0/24 -d 10.12.0.0/24 -o eth0 -j MASQUERADE" >> /etc/ufw/before.rules
echo "-A POSTROUTING -s 192.168.1.0/24 -d 10.13.0.0/24 -o eth1 -j MASQUERADE" >> /etc/ufw/before.rules

echo "COMMIT" >> /etc/ufw/before.rules

# Restart the firewall
ufw disable && sudo ufw enable

# Force start ufw
sudo /etc/init.d/ufw force-reload

```

## Setting up Your Own CA (Certificate Authority) - Manual

``` zsh
sudo apt install gnutls-bin
sudo mkdir /etc/ocserv/ssl/
cd /etc/ocserv/ssl/

...
# Check more
#https://www.linuxbabe.com/ubuntu/certificate-authentication-openconnect-vpn-server-ocserv
```

# Client

## Openwrt Openconnect

![](https://i.imgur.com/vzX6c1o.png)
![](https://i.imgur.com/sxE1MM3.png)
![](https://i.imgur.com/dlzbfrE.png)

``` bash
opkg update
opkg install luci-proto-openconnect openconnect

# Add interface with OpenConnect(CISCO)

# get SHA1has fingerprint of a server
#gnutls-cli --insecure globalprotect.gateway.server.com
openssl s_client -connect vpn.example.com:443 -showcerts 2>/dev/null </dev/null | awk '/-----BEGIN/,/-----END/ { print $0 }' | openssl x509 -noout -fingerprint -sha1 | sed 's/Fingerprint=//' | sed 's/://g'
```

## linux Anyconnect & Openconnect

### KDE

直接网络 connection 中设置添加 `Cisco AnyConnect Compatible VPN (openconnect)`, 按提示操作即可

Add `Cisco AnyConnect Compatible VPN (openconnect)` in `connection` of the `setting`. Then following the instruction.

![](https://i.imgur.com/I2xYScU.png)

*Note: If Meet vpn plugin missing (I met in KDE Neon)*

``` zsh
#install openconnect and network-manager-openconnect
sudo apt-get install openconnect network-manager-openconnect
```

### non-KDE / 非 KDE

[sh Link](https://sslvpn1.usc.edu/CACHE/stc/11/binaries/vpnsetup.sh)

``` bash
$ chmod 755 vpnsetup.sh
$ sudo ./vpnsetup.sh

#Fedora 20
$ sudo yum install pangox-compat

#Ubuntu 17
$ sudo apt install libpangox-1.0-0
```

### openconnect

``` zsh
openconnect https://vpn.mycompany.com/
openconnect -b vpn.mydomain.com
openconnect -c certificate.pem https://vpn.mycompany.com/
openconnect -c pkcs11:id=X_%b04%c3%85%d4u%e7%0b%10v%08%c9%0dA%8f%3bl%df https://vpn.mycompany.com/
```

## Windows Anyconnect

[Link](https://sslvpn2.usc.edu/CACHE/stc/1/binaries/anyconnect-win-4.6.03049-core-vpn-webdeploy-k9.exe)

## Mac Anyconnect

[Link](https://sslvpn2.usc.edu/CACHE/stc/2/binaries/anyconnect-macos-4.6.03049-core-vpn-webdeploy-k9.dmg)

---

# Reference

- [How do I install the Cisco AnyConnect Client on Linux?](https://faq.oit.gatech.edu/content/how-do-i-install-cisco-anyconnect-client-linux)
- [Set up OpenConnect VPN Server (ocserv) on Ubuntu 16.04/18.04 with Let’s Encrypt](https://www.linuxbabe.com/ubuntu/openconnect-vpn-server-ocserv-ubuntu-16-04-17-10-lets-encrypt)
- [Install OpenConnect Server on Ubuntu 16.04](https://lowendbox.com/blog/install-openconnect-server-on-ubuntu-16-04/)
- [OpenConnect VPN server](https://github.com/iMeiji/shadowsocks_install/wiki/OpenConnect-VPN-server)
- [OpenConnect VPN Server Installation](https://steemit.com/linux/@rnason/openconnect-vpn-server-installation)
- [ufw complains when ipv6 and/or ip6_tables is not available](https://bugs.launchpad.net/ubuntu/+source/ufw/+bug/194844)
- [openconnect client for openwrt](https://www.fanyueciyuan.info/fq/oc-for-openwrt.html)
- [Connecting to the VPN](https://www.infradead.org/openconnect/connecting.html)
- [How to Set up Certificate Authentication in OpenConnect VPN Server (ocserv)](https://www.linuxbabe.com/ubuntu/certificate-authentication-openconnect-vpn-server-ocserv)
- [OpenWRT Openconnect client setup #280](https://github.com/StreisandEffect/streisand/issues/280)

## Other Reference

- [OpenWrt Project: OpenConnect Client](https://openwrt.org/docs/guide-user/services/vpn/openconnect-client)
- [OpenWrt with OpenVPN client on TP-Link TL-MR3020](https://www.loganmarchione.com/2014/10/openwrt-with-openvpn-client-on-tp-link-tl-mr3020/)
- [Welcome to OpenConnect graphical client pages.](https://openconnect.github.io/openconnect-gui/)
- [How to uninstall nginx from Ubuntu](https://reviewdb.io/questions/1506789407655/how-to-uninstall-nginx-from-ubuntu)
- [How To Install Nginx on Ubuntu 18.04 [Quickstart]](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04-quickstart)
- [在 OpenWrt 上搭建 OpenConnect (ocserv) 服务器 ](https://tommy.net.cn/2016/07/18/setting-up-openconnect-server-ocserv-on-openwrt/)
- [OpenWRT/LEDE Project and Cisco VPN client in 4 easy steps ](http://randronov.blogspot.com/2017/06/lede-project-and-cisco-vpn-client-in-4.html#)
- [Openconnect VPN Server](http://www.telecom-cafe.com/forum/viewthread.php?tid=7067)

## Nginx Related Reference

- [Creating a Simple Website on Vultr With OpenBSD and httpd](https://www.vultr.com/docs/creating-a-simple-website-on-vultr-with-openbsd-httpd)
- [How To Create a Self-Signed SSL Certificate for Nginx in Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-18-04)
