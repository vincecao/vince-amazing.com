---
title: Regual Expressions Notes
date: 2019-02-13 18:55:57
tags:
- Javascript
categories: Notes
---
# Syntax
`/pattern;/g`
- Starting and ending with slash, inside is a pattern
- Flags after ending slash, g, i, m

# Match for Characters

## \.
search for `.`

## \d
Digit (0-9), same as `[0-9]`, alphabetic, 0-9

## \D
Not Digit, same as `[^\d]`

## \w
Word Character, same as `[a-zA-Z0-9_]`, alphanumeric, including 0-9, letter, and some symbols.

## \W
Not word Character, same as `[^\w]`

## \s
Whitespace (space, tab, newline), almost same as `[\t\r\n ]`

## \S
Not whitespace, same as `[^\s]`

# Anchor, match for position before or after character

## \b
Word Boundary, beginning or after the word, between `\w` and `\W`

## \B
Not word boundary

## \N
Nth backreference, `('|").+?\1` to match `"He said 'boo'"`


# Metacharacters

## .
Any character except new Line, metacharacter, same as `[^\r\n]`

## ^
Begining of a String

## $
End of a String, in line
`^a$` is match a in `a\n`

## []
matching the char in the [], is only search for one char, not need `\`, [^] negative matching the char
- `\d\d\d[-.]\d\d\d[-.]\d\d\d\d` for normal phone with 123-456-7890 or 123.456.7890
- `[89]00[-.]\d\d\d[-.]\d\d\d\d` for phone with 800-123-4567 or 900-123-4567
- `[a-zA-Z]` include all word char a-z and A-Z
- `[^a-z]` everything not from a-z
- `[^b]at`, everything with *at but not bat

## | and ()
Either or, and Group
For avoid parenthese form capturing groups, use `?:`, example: `(?:Java|ECMA)Script`

## 
Group

# Quantifiers

## *
0 or More

## +
1 or More

## ?
0 or One

### ?=
`(?=a)` match anything followed a, look behind

### ?!
`(?!a)` match anything except followed by a, `ab` is not work, `ac` is work

## {}
`{3}`, `{3,5}`, `{3, }` = exact 3, 3 upto 5, >=3.
Exact number, or a range or number, min to max
- `\d{3}[-.]\d{3}[-.]\d{4}` same as `\d\d\d[-.]\d\d\d[-.]\d\d\d\d`
- `M(r|s|rs)\.?\s[A-Z]\w*`, for pattern Mr. Axxxx, Mr Bxxxx, Mrs. Cxxx and so on

# Email Example
- `[a-zA-Z]+@[a-zA-Z]+\.com` normal email address with only word
- `[a-zA-Z.]+@[a-zA-Z]+\.(com|edu)` normal email address with a.b@g.edu
- `[a-zA-Z.-]+@[a-zA-Z-]+\.(com|edu|net)` normal email address with a-b@g-d.net
- `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` more wide use email

# Domain Example
- `https?://(www\.)?\w+\.\w+` same as `https?://(www\.)?(\w+)(\.\w+)`, clean for domain.xxx, replaced by `$2$3`

# Performace
- Avoid greedy quantifiers
- Don't forget anchors(^ and $)
- specific
- Prefer non-capturing groups(?:)
- Minimize backtracking

# Reference
- [Regular Expressions (Regex) Tutorial: How to Match Any Pattern of Text](https://www.youtube.com/watch?v=sa-TUpSx1JA)
- [Best of Fluent 2012: /Reg(exp){2}lained/: Demystifying Regular Expressions](https://www.youtube.com/watch?v=EkluES9Rvak)

