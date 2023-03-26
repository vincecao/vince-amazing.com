---
title: 我的 i3 桌面配置笔记
date: 2018-04-15 16:55:41
tags: 
- Linux
categories: Config
---

# i3-wm

## install

``` bash
sudo pacman -S i3-wm
sudo pacman -S i3lock i3status
```

## Basic Operation

- __`mod` + `d`__: `dmenu_run`
- __`mod` + `enter`__: Terminal
- __`mod` + `shift` + `q`__: Quit or kill windows
- __`mod` + `s`__: Stacked layout
- __`mod` + `w`__: Tabbed layout
- __`mod` + `f`__: Fullscreen mode
- __`mod` + `V`/`H`__: vert. or horiz.
- __`mod` + `arrow keys` (or `j` , `k`, `l`, `;`)__: Change active windows (can replace by mouse)
- __`mod` + `shirt` + `arrow keys` (or `j` , `k`, `l`, `;`)__: Change position
- __`mod` + `r` / `arrow keys` (or `j` , `k`, `l`, `;`)__: Reize
- __`mod` + `shift` + `r`__: Reload i3-wm
- __`mod` + `shift` + `e`__: Exit i3-wm / logout
- __`mod` + `shift` + `num`__: Assgin to workspace
- __`mod` + `num`__: Change workspace

### Keys to use with $mod (Alt)

![](https://i3wm.org/docs/keyboard-layer1.png)

### Keys to use with Shift+$mod

![](https://i3wm.org/docs/keyboard-layer2.png)

# Config

- File path

`~/.config/i3/config` in Arch or Manjaro

- Media and volume keys snippet (might need to install `pactl` and `playerctl`)
    [Enabling multimedia keys](https://faq.i3wm.org/question/3747/enabling-multimedia-keys/?answer=3759#post-id-3759)

    ``` bash
    bar {
        status_command i3status
    }

    bindsym $mod+shift+x exec i3lock

    # Pulse Audio controls
    bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume 0 +5% #increase sound volume
    bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume 0 -5% #decrease sound volume
    bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute 0 toggle # mute sound

    # Sreen brightness controls
    bindsym XF86MonBrightnessUp exec xbacklight -inc 20 # increase screen brightness
    bindsym XF86MonBrightnessDown exec xbacklight -dec 20 # decrease screen brightness

    # Touchpad controls
    bindsym XF86TouchpadToggle exec /some/path/toggletouchpad.sh # toggle touchpad

    # Media player controls
    bindsym XF86AudioPlay exec playerctl play
    bindsym XF86AudioPause exec playerctl pause
    bindsym XF86AudioNext exec playerctl next
    bindsym XF86AudioPrev exec playerctl previous
    ```

    __toggletouchpad.sh__ for toggling your touchpad

    ``` bash
    #!/bin/bash
    if synclient -l | grep "TouchpadOff .*=.*0" ; then
        synclient TouchpadOff=1 ;
    else
        synclient TouchpadOff=0 ;
    fi
    ```

- Make applications load on i3 startup
    `exec` or `exec_always`

- Custom wallpaper

    ``` bash
    #install feh
    feh --bg-scale ~/xxxxx/wallpaper.jpg
    #Add autostart
    exec_always feh --bg-scale /home/XXXX/Pictures/xxxx.jpg
    ```

- Monitor layout
    - use `xrander` too complex, use `arander`.
    - Save in local file as `/.screenlayout` script file
    - Append into i3/config by `exec_always`

- [Rename workspace(s)](https://www.youtube.com/watch?v=8-S0cWnLBKg&t=1124s)

- Change fonts and theme
    change system font

    ``` bash
    unzip xxxxxxfont.zip
    mv *.ttf ~/.fonts/
    cd ./fonts/
    ls -al
    #change default font
    #cd to i3/config
    #font pango:monospace 8
    font pango:xxxxxxx 13
    ```

    intall lxappearance and change font and theme

    ``` bash
    sudo pacman -S lxappearance
    #change both gtk2.0 and 3.0
    vim .gtkrc-2.0
    vim .config/gtk-3.0/settings.ini
    ```
    [Emulating OS X font rendering on Linux with `Infinality`](http://www.webupd8.org/2013/06/better-font-rendering-in-linux-with.html)

    `install fontconfig-infinality`

- `dmenu` replacement with [`rofi`](https://github.com/DaveDavenport/rofi)

    ``` bash
    sudo pacman -S rofi
    #run rofi
    rofi -show run
    #bing into i3/config as exec_always
    bindsym $mod+d exec rofi -show run -lines 3 -eh 2 -width 100 -padding 800 -opacity "85" -bw 0 -bc "$bg-color" -bg "$bg-color" -fg "$text-color" -hlfg "#8575cd" -font "System San Francisco Display 18"
    man rofi #to see the details
    ```

- Configuare `i3lock`

Reddit page: [unixporn](https://www.reddit.com/r/unixporn/)

- Install `compton`

    ``` bash
    sudo pacman -S compton
    # append into i3/config for compton
    exce_always compton
    ```

- [Replace `i3status` with `i3blocks`](https://www.youtube.com/watch?v=ARKIwOlazKI&t=2488s)

- [Connect to a wireless network using command line nmcli](https://nullr0ute.com/2016/09/connect-to-a-wireless-network-using-command-line-nmcli/)

    ``` bash
    nmcli device wifi rescan
    nmcli device wifi list
    nmcli device wifi connect SSID-Name password wireless-password
    ```

## Related links:\

- [Install_Desktop_Environments#i3](https://wiki.manjaro.org/index.php/Install_Desktop_Environments#i3)
- [i3 User’s Guide](https://i3wm.org/docs/userguide.html)
- [i3wm: Jump Start (1/3)](https://www.youtube.com/watch?v=j1I63wGcvU4&t=281s)
- [i3wm: Configuration (2/3)](https://www.youtube.com/watch?v=8-S0cWnLBKg)
- [i3wm: How To "Rice" Your Desktop (3/3)](https://www.youtube.com/watch?v=ARKIwOlazKI&t=2429s)
- [bookercodes/dotfiles-1](https://github.com/bookercodes/dotfiles-1)
