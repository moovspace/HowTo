# Grub boot order change
```bash
cat /boot/grub/grub.cfg | awk -F\' '$1=="menuentry " {print i++ " : " $2}'

# output
0 : Debian GNU/Linux
1 : Windows Vista (na /dev/sda1)

# Set Windows
grub-set-default 1

# or
sudo nano /etc/default/grub

# Ser
GRUB_DEFAULT=1
```
