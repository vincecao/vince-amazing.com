---
title: Git Note
date: 2020-12-15 22:02:40
tags: 
- Linux
- Windows
- MacOS
categories: Notes
---

_Update -12/15/2020-_

## Git pull error message
`Pulling without specifying how to reconcile divergent branches is discouraged`

```
  git config pull.rebase false  # merge (the default strategy)
```

This is the existing default behaviour; set this for no warning, and no change in behaviour; `git` will merge the remote branch into your local one.

```
  git config pull.rebase true   # rebase
```

Here, `git` will attempt to rebase your changes on top of the remote branch. See [When should I use git pull --rebase?](https://stackoverflow.com/questions/2472254/when-should-i-use-git-pull-rebase) for more detail on why you might want that.

```
  git config pull.ff only       # fast-forward only
```

If a fast-forward merge is not possible, `git` will refuse to proceed. As [Difference between git pull --rebase and git pull --ff-only](https://stackoverflow.com/questions/25430600/difference-between-git-pull-rebase-and-git-pull-ff-only)

## Git commit message style
``` bash

<type>[optional scope]: <description>

[optional body]

[optional footer]

---

feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test
```

More Examples:
- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)

_Update -3/10/2020-_
## Git merge from other branch but isolate some file 

``` bash
git checkout master

# merge from dev, but manually check is required
git merge --no-commit --no-ff dev

# Not merge package.json and Readme.md in original branch
git reset HEAD -- package.json
git reset HEAD -- readme.md
```

---

## Move repository to a subfolder of another repository

To merge a Repo B into Repo A as a subfolder, run this command inside Repo A;

``` bash
git subtree add -P <prefix> <repo> <rev>
```

Set `<prefix>` to the name of the subdirectory, `<repo>` to the clone URL of Repo B, and `<rev>` to the revision of Repo B you want (HEAD if latest)

This will take the history of Repo B and merge it with Repo A, along with an additional merge commit.

[REF](https://stackoverflow.com/questions/47559855/git-move-repository-to-a-subfolder-of-another-repository)

---

## Init new Project

``` bash
echo "# new" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:vincecao/new.git
git push -u origin master
```

---

## Git back to last commit
``` bash
git reset --soft HEAD~1
git push --force
```

---

## History file of git bash in Windows

``` bash
echo "PROMPT_COMMAND='history -a'" >> ~/.bash_profile
# or
echo "PROMPT_COMMAND='history -a'" >> ~/.bashrc
```

---

# Common Clone Command / Git 常用 clone 命令

``` bash
#Cloning to a specific folder
git clone <repo> <directory>

#Cloning a specific tag
git clone -branch <tag> <repo>

#Clone from ssh
git clone ssh://john@example.com/path/to/my-project.git
cd my-project
```

---

# Git config

``` bash
cat .git/config # to check the config
```

---

# Git push / fetch / pull

``` bash
git push
git push -u origin master # tracking to origin/master

#从远程拉取最新版本 到本地, 自动合并 merge  
git pull # git pull origin master = git fetch origin master:tmp && git diff tmp && git merge tmp

#从远程获取最新版本 到本地, 不会自动合并 merge
git fetch
#nomoral use:
# git fetch origin master
# git log -p master..origin/master
# git merge origin/master
```

---

# Git Reset --hard and --soft && Git Revert

![](https://i.imgur.com/5aU9Zxe.png "git log --oneline -n")

``` bash
### git reset
## hard 不保留原始 commit 结点的任何资讯, 直接将工作区、暂缓区及 git 目录都重置成目标Reset结点的资料内容。
git reset --hard HEAD #to newset version
git reset --hard HEAD~ #to last upload version
git reset --hard HEAD~n #to last nth upload verison

# check most recent n logs
git log --oneline -n

# then enter the version number
git reset --hard HEAD #master
git reset --hard HEAD~ 
git reset --hard HEAD~2
git reset --hard HEAD~3

# success output
HEAD is now at 4f0f054 test2

# 你回复之前的版本后，又想回复到最新提交的版本 【反悔
git reflog #list all the log
git reset --hard commit_id #with commit_id


## 不会异动到目前所有的实体档案内容；也会保留暂缓区资料内容，让暂缓区与 git 目录资料内容是一致的。
git reset --soft HEAD / commit id

git reflog
git reset --soft HEAD~3

### git revert
git revert HEAD #增加一个 Commit 来取消, Revert some existing commits
```

---

# Set Git Proxy / 设置git代理

``` bash
# set git proxy
# shadowsocks的本地端口默认是1080
git config --global http.proxy ‘socks5://127.0.0.1:1080’
git config --global https.proxy ‘socks5://127.0.0.1:1080’ 

# cancel git proxy
git config --global --unset http.proxy
git config --global --unset https.proxy
```

---

## More Commands

- [Basic Git commands](https://git-scm.com/docs/gittutorial)
- [gittutorial](https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html)

---

# Init a local repo and push to github

``` bash
#create a new blank repo in github

git remote add origin https://github.com/mbcrump/SampleProject.git
git push -u origin master
```

---

# Git clone from private repo of github need add ssh rsa

``` bash
#1. Generating a new SSH key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter] #enter is default

Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]

#2. Adding your SSH key to the ssh-agent
eval "$(ssh-agent -s)" #Agent pid 59566

ssh-add ~/.ssh/id_rsa

#3. Adding a new SSH key
#install xclip or manual copy from /.ssh/
xclip -sel clip < ~/.ssh/id_rsa.pub

# Github -> Settings -> SSH and GPG keys. -> New SSH key or Add SSH key.

#make config file local
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
git config --global core.ignorecase false

#check list
git config --list
#user.name=John Doe
#user.email=johndoe@example.com
#color.status=auto
#color.branch=auto
#color.interactive=auto
#color.diff=auto
```

# Reference

- [git clone](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone)
- [Generating a new SSH key and adding it to the ssh-agent](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)
- [Adding a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)
- [Setting up Github with Visual Studio Code on OSX](https://www.michaelcrump.net/using-github-with-visualstudio-code/)
- [1.6 開始 - 初次設定 Git](https://git-scm.com/book/zh-tw/v2/%E9%96%8B%E5%A7%8B-%E5%88%9D%E6%AC%A1%E8%A8%AD%E5%AE%9A-Git)
- [讓你的代碼回到過去，git reset 與 git revert 的用處](https://www.jianshu.com/p/c9fbec63558f)
- [Git fetch和git pull的区别](https://blog.csdn.net/hudashi/article/details/7664457)
- [git 拉取和获取 pull 和 fetch 区别](https://blog.csdn.net/u010094934/article/details/52775653)
- [git pull 和 git fetch 有什么区别？](https://ruby-china.org/topics/15729)
- [Changing capitalization of filenames in Git](https://stackoverflow.com/questions/10523849/changing-capitalization-of-filenames-in-git)
- [I change the capitalization of a directory and Git doesn't seem to pick up on it](https://stackoverflow.com/questions/6899582/i-change-the-capitalization-of-a-directory-and-git-doesnt-seem-to-pick-up-on-it)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Git Commit Msg](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
- [How are you writing a commit message?](https://dev.to/puritanic/how-are-you-writing-a-commit-message-1ih7)
- [How to deal with this git warning? “Pulling without specifying how to reconcile divergent branches is discouraged”](https://stackoverflow.com/questions/62653114/how-to-deal-with-this-git-warning-pulling-without-specifying-how-to-reconcile)