---
title: Bit Operate with Unsigned Integer
date: 2019-06-24 13:57:47
tags:
- Java
- Leetcode
categories: Notes
---
## Bitwise Logical Operators and Shift Operators（位运算符）
[Java 位运算符（JAVA Bitwise Logical Operators）](https://denverj.iteye.com/blog/738671)
### Operator
`~`，`|`，`&`，`^` 
- `~` the NOT Operator （非运算符）, `～0 = -1, ～11 = -12`, 当取反为负数，最左侧位为1时，需要用补码方法获取他的正数，在倒获得正确的负数值
- `|` the OR Operator  （或运算符） 
- `&` the AND Operator （与运算符） 
- `^` the XOR Operator （异或运算符）， 有且只有一个为 1，则异或运算符会返回 1（0和1的情况才生成1） 
- `<<`, 左移
- `>>`, 右移
- `>>>`, 无符号右移

> 我们来看看它的移位过程 (可以通过其结果换算成二进制进行对比)：
> - `5` 换算成二进制： `0000 0000 0000 0000 0000 0000 0000 0101`
> - `5` 右移 3 位后结果为 `0`，`0` 的二进制为： `0000 0000 0000 0000 0000 0000 0000 0000`        // ( 用 0 进行补位)
> - `-5` 换算成二进制： `1111 1111 1111 1111 1111 1111 1111 1011`
> - `-5` 右移 3 位后结果为 `-1`，`-1`的二进制为： `1111 1111 1111 1111 1111 1111 1111 1111`   // (用 1 进行补位)
> - `-5` 无符号右移 3 位后的结果 `536870911` 换算成二进制： `0001 1111 1111 1111 1111 1111 1111 1111`   // (用 0 进行补位)
>
> **正数右移，高位用 0 补，负数右移，高位用 1 补，当负数使用无符号右移时，用 0 进行部位 (自然而然的，就由负数变成了正数了)**
> 
> 注意：**笔者在这里说的是右移，高位补位的情况。正数或者负数左移，低位都是用 0 补。**
> 
> [Source](https://blog.csdn.net/xiaochunyong/article/details/7748713)

### 二进制补码 表示 正负数
[转：关于二进制补码](https://denverj.iteye.com/blog/736583)

Two Steps:
- Reverse each bit (`00001000` -> `11110111`)
- Add `1` (`11110111` -> `11111000`)
可以运用到所有加法运算

### Tricks
- To find the last bit is `1` or `0`, `n & 1 === 1, One; n & 1 === 0, Zero;`
- To replace the last bit of `1` with `0`, `n & (n - 1)`

## Leetcode problem
### 190. Reverse-bits
[Reverse-bits](https://leetcode.com/problems/reverse-bits/)
``` java
public class Solution { 
    // you need treat n as an unsigned value 
    public int reverseBits(int n) { 
        int res = 0; 
        for(int i = 0; i < 32; i++){ 
            res = (res<<1) + (n&1); 
            n = n>>>1; //n&1 ===1 means last bit is 1, versa 
        } 
        return res; 
    } 
} 
```

### 191. Number of 1 Bits
[Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

_Tricks One_
``` java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {       
        //Way One
        int count = 0;
        for(int i = 0; i < 32; i++){
            if((n&1) == 1){
                count++;
            }
            n = n>>>1;
        }
        return count;
}
```

_Tricks Two_
``` java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        //Way two
        let count = 0;
        while (n !== 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}
```

# Reference
- [Java 位运算符（JAVA Bitwise Logical Operators）](https://denverj.iteye.com/blog/738671)
- [转：关于二进制补码](https://denverj.iteye.com/blog/736583)
- [Java 位运算 (移位、位与、或、异或、非）](https://blog.csdn.net/xiaochunyong/article/details/7748713)
- [191.number-of-1-bits.md](https://github.com/azl397985856/leetcode/blob/master/problems/191.number-of-1-bits.md)
- [190.reverse-bits.md](https://github.com/azl397985856/leetcode/blob/master/problems/190.reverse-bits.md)
- [n & (n-1) what does this expression do? [duplicate]](https://stackoverflow.com/questions/4678333/n-n-1-what-does-this-expression-do )