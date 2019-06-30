#!/bin/sh

# Blocks Facebook's entire IP address range. As the list is in principle dynamic,
# it is best to not form a static config file. Instead, we run this script once
# per boot via e.g systemd. Needs to run as root.
# Based off: https://news.ycombinator.com/item?id=11791052.
# Better solution for OS'es with better network stacks:
# https://www.perpetual-beta.org/weblog/blocking-facebook-on-os-x.html.
# Facebook's ASN number

ASN=32934
ipset create fb_ipv4 hash:net family inet
# sadly, ipset guys are too lazy to add hash:net support for ipv6:
# https://patchwork.ozlabs.org/patch/79306/, so we use separate iptables rules for those.
# ipset create fb_ipv6 hash:net family inet6
# nftables would be nice, but is still not really mature.

for addr in $(whois -H -h riswhois.ripe.net -- -F -K -i $ASN | grep -v "^$" | grep -v "^%" | awk '{ print $2 }' ); do
    # short hack for checking whether ip is ipv4 or ipv6, NOT ROBUST
    if [[ $addr =~ .*:.* ]]
    then
        ip6tables -I OUTPUT -d $addr -j DROP
    else
        ipset add fb_ipv4 $addr
    fi
done
iptables -I OUTPUT -m set --match-set fb_ipv4 dst -j DROP
