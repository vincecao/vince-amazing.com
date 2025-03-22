---
title:  Linux Machine Initialize Scripts
date: 2023-06-19 13:02:42
---

```bash
# install brew
# https://brew.sh/
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# install zsh
brew install zsh

# install oh my zsh
# https://ohmyz.sh/#install
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# add brew setup to .zshrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc

# install rtx
# https://lib.rs/crates/rtx-cli
brew install rtx

# add rtx setup to .zshrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/rtx activate zsh)"' >> ~/.zshrc

# use nodejs with rtx
rtx use -g nodejs

# use deno with rtx
rtx use -g deno

# install github cli
# https://github.com/cli/cli/blob/trunk/docs/install_linux.md
brew install gh

# login gh
# https://cli.github.com/manual/gh_auth_login
gh auth login
```