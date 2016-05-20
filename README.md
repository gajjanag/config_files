dotfiles
========

Central repository for all my dotfiles.

* bin: some simple and useful scripts (I include them in my path, personally place under ~/.local/bin)
* zshconfig: zsh configuration files that work with [prezto](https://github.com/sorin-ionescu/prezto) ([AUR](https://aur.archlinux.org/packages/prezto-git)).
* vim: Vim customization (heavily inspired by [config-vim](https://github.com/mattjj/config-vim)).
I currently use with packages [vim-ctrlp](https://www.archlinux.org/packages/community/any/vim-ctrlp), [vim-surround](https://www.archlinux.org/packages/community/any/vim-surround), [vim-syntastic](https://www.archlinux.org/packages/community/any/vim-syntastic), [vim-latexsuite](https://www.archlinux.org/packages/community/any/vim-latexsuite), [julia-vim-git](https://aur.archlinux.org/packages/julia-vim-git), [vim-rust-git](https://aur.archlinux.org/packages/vim-rust-git), [vim-commentary](https://aur.archlinux.org/packages/vim-commentary), [vim-unimpaired-git](https://aur.archlinux.org/packages/vim-unimpaired-git), [vim-pathogen](https://aur.archlinux.org/packages/vim-pathogen), and [vim-colors-zenburn](https://aur.archlinux.org/packages/vim-colors-zenburn).
At one point, I was using [vim-youcompleteme-git](https://aur.archlinux.org/packages/vim-youcompleteme-git) as well. Note that this plugin is significantly heavier than the others, but provides fantastic autocompletion capabilities.
* mozilla: Firefox customization via the [user.js/mozilla.cfg method](https://wiki.archlinux.org/index.php/Firefox). This is heavily based off [pyllyukko/user.js](https://github.com/pyllyukko/user.js), with minor tweaks. Please note that this is not frequently updated as Firefox is too fast moving, and evolves based on my web needs. It is sufficiently different in structure that I do not simply maintain a fork of this repo.
* awesome: Awesome tiling WM customization (trimmed and modified from powerarrow-darker theme of [awesome-copycats](https://github.com/copycat-killer/awesome-copycats)).
This is meant to be used with the [lain-git](https://aur.archlinux.org/packages/lain-git) package for various widgets.
* alias: custom aliases, most from [aliases](https://gist.github.com/anonymous/a9055e30f97bd19645c2).
* gitconfig: global git configuration
* tlp: a very useful (especially for laptops) advanced power management utility. See the [Arch wiki](https://wiki.archlinux.org/index.php/TLP), and the [project page](http://linrunner.de/en/tlp/tlp.html) for more information.
* tmux.conf: a simple tmux configuration obtained from various sources. Have not got around to using it much yet.
* xinitrc: nothing special here, except the standard caps lock/control key mapping especially useful for Vim. Also contains a hack for redshift, since provided systemd unit fails on my Arch laptop.
* redshift.conf: a nice tool for shifting the color spectrum of light based on time of day. This is especially useful for reducing eyestrain at night-time, and supposedly helps in getting better sleep as well. The [project page](https://github.com/jonls/redshift), the [Arch wiki article](https://wiki.archlinux.org/index.php/Redshift), and similar apps (not open source) [f.lux](https://justgetflux.com), [Twilight] (https://play.google.com/store/apps/details?id=com.urbandroid.lux).
* gpg.conf: configuration for [GnuPG](https://gnupg.org), mostly to use more secure default algorithms.
* connman.conf: [ConnMan](https://01.org/connman) configuration file with minor tweaks as detailed in the [Arch wiki](https://wiki.archlinux.org/index.php/Connman).
* i3lock-sleep.service: Uses [i3lock](https://github.com/popoffka/i3lock), and this systemd service file automatically locks screen while suspending.
* juliarc.jl: [Julia](https://julialang.org) settings.
* ctags: [ctags](https://en.wikipedia.org/wiki/Ctags) settings.
* ccache.conf: configuration for [ccache](https://ccache.samba.org), a very useful compilation cache speeding up builds on large projects.
* qpdfview: configuration for [qpdfview](https://launchpad.net/qpdfview), a very elegant, simple qt/poppler based tabbed pdf/djvu/ps viewer.
* makepkg.old: < 4.2 version of [makepkg](https://wiki.archlinux.org/index.php/Makepkg). 4.2 removed --asroot. In general, the idea is good, but it is a PITA to do automated installation of systems via scripting if one relies heavily on the AUR. I use it only temporarily until we get the base scaffold of the system up.
* lxterminal: configuration for [lxterminal](https://github.com/lxde/lxterminal), a lightweight, tabbed terminal emulator from the [lxde](http://lxde.org) project.
* powertop.service: Uses [powertop](https://01.org/powertop), and this systemd service file automatically auto-tunes parameters on boot.
