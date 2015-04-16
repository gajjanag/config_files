#!/bin/sh
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

# custom key bindings
setxkbmap -option ctrl:nocaps  # Make Caps Lock a Control key
redshift &

if [ -d /etc/X11/xinit/xinitrc.d ]; then
  for f in /etc/X11/xinit/xinitrc.d/*; do
    [ -x "$f" ] && . "$f"
  done
  unset f
fi

exec awesome
# exec gnome-session
# exec startkde
# exec startxfce4
# ...or the Window Manager of your choice
