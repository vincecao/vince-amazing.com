---
title: Gifsicle - powerful tools for gif on web
date: 2019-04-25 17:03:09
tags:
- Gif
- Tools
categories: Path
---
Just find a very powerful gif compressor with command line.

# Install
## [Mac](http://macappstore.org/gifsicle/)
`brew install gifsicle`

## [Windows](https://eternallybored.org/misc/gifsicle/)

# Usage
``` bash
gifsicle -O3 --lossy=80 -o lossy-compressed.gif input.gif

gifsicle -i anim.gif --optimize=3 -o anim-opt.gif
```

# Resize
``` bash
# Scaling of an image - 50%
gifsicle --scale 0.5 -i animation.gif > animation-smaller.gif

# Scale to a given width with unspecified height
gifsicle --resize-fit-width 300 -i animation.gif > animation-300px.gif

# Scale to a given height with unspecified width
gifsicle --resize-fit-height 100 -i animation.gif > animation-100px.gif

# Clip to size
gifsicle --resize 300x200  -i animation.gif > animation-clipped.gif
```

## Reference
- [Optimize animated GIF size in command-line](https://superuser.com/questions/1107200/optimize-animated-gif-size-in-command-line)
- [Gifsicle](https://www.lcdf.org/gifsicle/)
- [Lossy Gif compressor](https://kornel.ski/lossygif)
- [Resize an Animated GIF](https://davidwalsh.name/resize-animated-gif)