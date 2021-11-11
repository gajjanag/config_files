#!/bin/sh
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

# custom key bindings
setxkbmap -option ctrl:nocaps  # Make Caps Lock a Control key
xbindkeys

# disable bell
xset b off

# execute redshift
[ -f /usr/bin/redshift ] && redshift &

if [ -d /etc/X11/xinit/xinitrc.d ]; then
  for f in /etc/X11/xinit/xinitrc.d/*; do
    [ -x "$f" ] && . "$f"
  done
  unset f
fi

# source custom profile before exec'ing the window manager/desktop environment
# of choice
[ -f /etc/xprofile ] && source /etc/xprofile
[ -f ~/.xprofile ] && source ~/.xprofile

# start Dropbox (if present) and start it with the Window manager
# For all that Dropbox harps on ``cross-platform support''; hacks like this
# are needed for Linux users who have a window manager different from KDE/Gnome,
# etc (simply checkmarking Dropbox's preference to startup at boot automatically
# does not work)
[ -f /usr/bin/dropbox ] && /usr/bin/dropbox &

exec awesome
# lower power consumption/debug awesome config, uncomment below
# exec awesome -c /etc/xdg/awesome/rc.lua

# exec gnome-session
# exec startkde
# exec startxfce4
# ...or the Window Manager of your choice
