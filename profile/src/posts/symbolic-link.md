---
title: Symbolic Links 
date: 2018-06-28 12:29:12
tags: 
- Windows
- Linux
- MacOS
- Tips
categories: Rice
---

因为 hexo 的目录结构, 我想要分别 git 备份我的 `source/` 等博客本地的资源和 `public/` 公共 host 文件夹。push `public/` to `vcec.gitlab.io`, 而备份 `source/` 和 `themes/` 等在一个 private 的 `blog-source` 下, 于是使用一个链接的文件夹便是极好的了，每次在一个新电脑上建一个 `blog/` 文件夹, 然后从两个 git 文件夹下分别链接到 `blog/` 内, `hexo new` 和 `hexo g` 后的变化就会自己生成到外部的 `vcec.gitlab.io` 和 `blog-source` 文件包内了

Because of the folder structure of hexo, it becomes difficult when I want to backup my local `source/` resource and public hosted `public/` resource.

I plan to keep all files in `vcec.gitlab.io` in my gitlab page always be same as `public/`, while backup all other including `source/` and `themes/` files and folders into a private `blog-source` in my gitlab page. Thus if there is a linked way of operating those source folder and target folder, that will is the best.

# Windows

_Check my small mklink GUI version tools for Windows - [vSymlinks](https://github.com/vincecao/vsymlinks)_

<a href='//www.microsoft.com/store/apps/9n4skx6602h2?cid=storebadge&ocid=badge'><img src='https://assets.windowsphone.com/13484911-a6ab-4170-8b7e-795c1e8b4165/English_get_L_InvariantCulture_Default.png' alt='English badge' style='width: 127px; height: 52px;'/></a>

Windows 本身有个 shortcut 的 link，但是那不是我们想要的，那只会生成一个`.lnk`文件而不是完整的文件或文件夹目录；我们需要的是 Symbolic Links。

Windows has a link approach named shortcut, but that can only generate a `.lnk` file but not a link path of certain files or folders. We need Symbolic Links.

{% blockquote Link Shell Extension, http://schinagl.priv.at %}
"Symbolic Links differ from Shortcuts in that they offer a transparent* pathway to the desired data object, with a shortcut (.lnk), something has to read and interpret the content of the shortcut file and then open the file that it references (i.e. it is a two-step process). When an application uses a symlink it gains immediate access to the data object referenced by the symlink (i.e. it is a one-step process)." [1](http://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html)
{% endblockquote %}

![](https://i.imgur.com/NZNPXq3.png "mklink")

在CMD的管理员下运行

Run the code under the CMD Admin.

``` bash
# create a file symbolic link so that typing pad.exe will allow you to launch notepad.exe.
mklink pad.exe notepad.exe

# create a symbolic link called a fruit that points directly to the folder oranges.
mklink /D c:\fruit c:\apples\bananas\oranges
```

![](https://i.imgur.com/GGQ2mlQ.png "mklink pad.exe notepad.exe")

![](https://i.imgur.com/nk0163l.png "mklink /D c:\fruit c:\apples\bananas\oranges")

![](https://i.imgur.com/8DiLLen.png "使用lnk")
使用`lnk`

![](https://i.imgur.com/9xCNUHn.png "使用mklink")
使用`mklink`

# Linux

## Terminal Way

``` bash
ln -s /folderorfile/link/will/point/to /name/of/the/link
```

## Desktop Way

>hold `Shift + Ctrl` and drag the file or folder you want to link to to the location where you want the shortcut.

KDE dolphins 中拖动可以直接选择 `move`, `copy` 或者 `link`

Under KDE Dolphins, we can directly choose  `move`, `copy` or `link` when we drag files.

# macOS

## Terminal Way

Same as Linux

```
ln -s /path/to/original /path/to/link
ln -s /Users/name/Downloads /Users/name/Desktop
ln -s "/Users/name/My Files" "/Users/name/Desktop/My Link"
sudo ln -s /path/to/original /path/to/link

#remove
rm /path/to/link
```

## Desktop Way

[SymbolicLinker](https://github.com/nickzman/symboliclinker/releases)

![](https://i.imgur.com/7Prg9C2.png)
_SymbolicLinker.app_

![](https://i.imgur.com/n1zi5hz.png)
_Select `Services`_

![](https://i.imgur.com/G5eWqzw.png)
_Select `Make Symbolic Link`_

# Reference

- [How to take advantage of symbolic links in Windows 10](https://www.techrepublic.com/article/how-to-take-advantage-of-symbolic-links-in-window-10/)
- [Create shortcuts in Linux (symbolic links)](https://www.faqforge.com/linux/create-shortcuts-in-linux-symbolic-links/)
- [How to Create and Use Symbolic Links (aka Symlinks) on a Mac](https://www.howtogeek.com/297721/how-to-create-and-use-symbolic-links-aka-symlinks-on-a-mac/)