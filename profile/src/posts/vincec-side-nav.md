---
title: VINCEC Side Navegation Bar
date: 2018-06-01 21:14:46
tags: 
- Javascript
- CSS3
categories: Rice
---

Made a pure JS, HTML and CSS3 based Side Navegation Bar

<!-- <iframe src="/res/vincec-side-nav/index.html" allowtransparency="false" style="border:none;height:375px;width:100%"></iframe> -->
[Demo Page](/res/vincec-side-nav/index.html)

## Featues
- Pure JS, HTML and CSS3 based
- Swtiching between two mode: `normal` or `side`

### The example Json code of Demo 

```json
{
  "Category": [
    {
      "innerhtml": "Archive",
      "src": "./img/alien-ship.svg",
      "class": "side",
      "subCategory": [
        {
          "innerhtml": "Tags",
          "src": "./img/secondLi.svg"
        },
        {
          "innerhtml": "Time",
          "src": "./img/secondLi.svg"
        }
      ]
    },
    {
      "innerhtml": "About Me",
      "src": "./img/big-dipper.svg",
      "class": "normal"
    },
    {
      "innerhtml": "Friends",
      "src": "./img/half-moon.svg",
      "class": "normal",
      "subCategory": [
        {
          "innerhtml": "Friends A",
          "src": "./img/secondLi.svg"
        }
      ]
    }
  ]
}
```
