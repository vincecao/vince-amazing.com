---
title: Linux CPU 压力测试
date: 2018-06-27 16:07:30
tags: 
- Linux
categories: Config
---

# CPU信息和总频率查看
## Terminal Way

``` bash
#CPU所有核心信息
cat /proc/cpuinfo

#CPU架构信息
lscpu

#每一秒读取CPU总频率
watch -n 1 "lscpu"

#每一秒读取目前CPU频率
watch -n 1 "cat /proc/cpuinfo | grep MHz"

#温度检测
## install sensors
sudo apt-get install lm-sensors
yes | sudo sensors-detect
## 检测
sensors
```

## CPUG

CPU Details Viewer

## lbench

Multi-Threaded Benchmarking tool

## [dstat](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwi20aj-tvPbAhUHUhQKHVfIC8sQFgg8MAE&url=https%3A%2F%2Fgithub.com%2Fdagwieers%2Fdstat&usg=AOvVaw1P7Rb8SZkBG2WLqFZc6diz)

Versatile resource statistics tool

# 压力测试软件
## cpuburn

``` bash
sudo pacman -S cpuburn

#For Intel 
burnP5
burnP6 # better than P5
burnMMX # supports AMD
burnBX # a CPU cache memory related test


# For AMD
burnK6
burnK7
burnMMX
```
## systester

``` bash
sudo pacman -S systester

# Run
systester
```

# Reference

- [Linux系統下如何查看CPU型號、核心數量、頻率和溫度？](https://magiclen.org/linux-view-cpu/ "Linux系統下如何查看CPU型號、核心數量、頻率和溫度？")
- [cpuburn: CPU Stress Tester for Ubuntu Linux](https://www.hecticgeek.com/2012/03/cpuburn-cpu-stress-test-ubuntu-linux/)
- [CPU Based Simple System Stability and Benchmark Tester for Ubuntu Linux – systester](https://www.hecticgeek.com/2012/01/cpu-based-simple-system-stability-benchmark-tester-ubuntu-linux/)
- [A Simple CPU Details Viewer for Ubuntu – CPUG](https://www.hecticgeek.com/2011/10/a-simple-cpu-details-viewer-for-ubuntu-cpu-g/)
- [lbench: Multi-Threaded Benchmarking tool for Ubuntu Linux](https://www.hecticgeek.com/2012/06/lbench-multi-threaded-benchmarking-tool-ubuntu-linux/)
- [LINUX 常用的 Performance / Monitor 工具](http://b8807053.pixnet.net/blog/post/323415378-linux-常用的-performance---monitor-工具)