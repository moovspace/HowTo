# Bash commands w php bez sudo (exec)
Pozwól apache2 php na używanie aplikacji konsolowych
```bash
# Edit sudo
nano /etc/sudoers

# Root privileges without password for user
www-data     ALL=(ALL) NOPASSWD:ALL

# Root privileges without password for user
# apache2 user: www-data
www-data     ALL = NOPASSWD: /bin/chmod, /bin/chown, /bin/tar

# Members of the admin group may gain root privileges
# %admin  ALL=(ALL) ALL

# Members of the admin group may gain root privileges
# %admin  ALL=(ALL) NOPASSWD:ALL

# Allow members of group sudo to execute any command
# %sudo   ALL=(ALL:ALL) ALL
```
