---
title: ibus Chinese input config - finally
date: 2019-07-01 12:16:37
tags:
- Linux
categories: Config
---

# KDE
>1. Delete any layouts you may have setup in `> System Settings > Input Devices > Keyboard > Layouts`. This will ensure that you do not have a double set of icons on your task bar for the input methods.
>2. Open Konsole and enter the following command: `sudo apt-get install ibus ibus-gtk ibus-gtk3 ibus-qt4 ibus-clutter`
>3. Enter your password when requested and answer all prompts with "`Y`" when asked.
>4. Install your ibus language packages by running the following command (these are the language packages I installed): `sudo apt-get install ibus-hangul ibus-sunpinyin ibus-anthy`
>This is a listing of ibus language packages:
>    - Japanese, MOZC (best): `ibus-mozc` (This may be best but I > could not get it to work)
>    - Japanese, Anthy (good): `ibus-anthy`
>    - Japanese, SKK (EMACS style): `ibus-skk`
>    - Korean language: `ibus-hangul`
>    - Traditional Chinese: `ibus-chewing`
>    - Simplified Chinese: `ibus-pinyin`
>    - Simplified Chinese (SUN): `ibus-sunpinyin`
>    - Simplified Chinese (Google): `ibus-googlepinyin`
>    - Vietnamese: `ibus-unikey`
>    - Many table based input method: `ibus-table*`
>5. Run `im-congif` from Konsole with: "`sudo im-config`" Click "OK" on the Input Method Configuration window. Click "Yes" on the next window that pops up. In the next window, select "ibus" and click "OK."
>6. Run "`Set IBus Preferences`" and click on the "`Input Method`" tab and add your input methods.
>7. Restart your system and everything should work fine. 

# Elementary
- > 一个**必要**设置 --> 语言一定要选汉语 (Chinese) ，不然 ibus-rime 无法输中文。
- `sudo apt install ibus-rime`
- `ibus-setup`
- `killall ibus-daemon`, `ibus-daemon -d` / `ibus-daemon -dr start` into autostart
- `ibus restart`

# Important
Always try `ibus-daemon -dr start` into autostart command

# Reference
- [Kubuntu 17.10 Korean Chinese Japanese Input ](https://www.kubuntuforums.net/showthread.php/72637-Kubuntu-17-10-Korean-Chinese-Japanese-Input)
- [如何解决elementary os中文本编辑器无法输入中文？ - 知乎](https://www.zhihu.com/question/49812071)