---
title: My Linux Setup Scripts for Development Environment
date: 2023-06-19 13:02:42
---

_Scripts are updated on 04/12/2025_

---

Often, I find that I need to install several dependencies in the correct order for a new Linux sandbox. Below is how I like to configure my local environment. This order allows me to switch the default shell from `bash` to `zsh`, install [mise](https://github.com/jdx/mise) (which provides granular control over development tool versions per project), and log in with GitHub CLI or manually link with SSH to remote Git sources in Bitbucket or GitLab.

I favor this sequence because there are multiple methods to install these packages, but it's crucial to verify that all binary paths are correct and properly set up. Additionally, I can manage the installation of all development tools from a single source.

```bash
# Install Homebrew first
# https://brew.sh/
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Ensure `brew` is available for use
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

# Install zsh universally across Linux distributions
brew install zsh

# Install Oh My Zsh for further customizations
# https://ohmyz.sh/#install
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Write Homebrew bin path setup to .zshrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc

# If you are using Windows WSL, set zsh as the default shell with the following shortcut
# %systemroot%\system32\bash.exe ~ -c /home/linuxbrew/.linuxbrew/bin/zsh
# However, it is recommended to use chsh for changing a user's login shell, which also works under Linux and macOS
echo "/home/linuxbrew/.linuxbrew/bin/zsh" | sudo tee -a /etc/shells # Appends the brew-installed zsh shell to the available shell list
chsh -s /home/linuxbrew/.linuxbrew/bin/zsh

# Install mise (previously called rtx), a tool like nvm that controls development tools and runtimes
# https://lib.rs/crates/mise
# https://lib.rs/crates/rtx-cli
brew install mise

# Add mise setup to .zshrc
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/mise activate zsh)"' >> ~/.zshrc

# Sample mise usage:
# https://mise.jdx.dev/getting-started.html

# Use mise locally or globally, with mise use|u
# https://mise.jdx.dev/cli/use.html
mise u -g node@22 deno go@1 # Creates a global config (~/.config/mise/config.toml)
cd xxx && mise u node@20 pnpm # Generates a local mise.toml file under the xxx folder

# Execute mise for commands, with mise exec|x
# https://mise.jdx.dev/cli/exec.html
mise x node@22 -- node -v

# Run mise for tasks with mise.toml, using mise run|r
# https://mise.jdx.dev/cli/run.html

# ---- (Optional) Install GitHub CLI ----
# https://github.com/cli/cli/blob/trunk/docs/install_linux.md
brew install gh

# Log in to GitHub CLI
# https://cli.github.com/manual/gh_auth_login
gh auth login

# ---- (Optional) Log in to Git with SSH public and private keys ----
# https://cli.github.com/manual/gh_auth_login
ssh-keygen -t rsa -b 4096 -C "lineng.ca@gmail.com" # Replace with your email
# Enter a file in which to save the key (/home/you/.ssh/id_rsa): [Press enter]
# Enter passphrase (empty for no passphrase): [Type a passphrase]
# Enter the same passphrase again: [Type passphrase again]

# Add your SSH key to the ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# Copy the new public SSH key from ~/.ssh and paste it into remote Git sources
cat ~/.ssh/id_rsa.pub | pbcopy
# Or install xclip to copy
# xclip -sel clip < ~/.ssh/id_rsa.pub

# Tweak Git config
git config --global user.name "Lineng Cao" # Replace with your name
git config --global user.email "lineng.ca@gmail.com" # Replace with your email
# Optional file name case settings
git config --global core.ignorecase false
```

Thanks for reading.