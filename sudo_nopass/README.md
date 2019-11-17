# Allow sudo in php
```bash
# Edit sudo
nano /etc/sudoers

# Without sudo password all apps (root)
# username     ALL=(ALL) NOPASSWD:ALL

# Without sudo password only app
# apache2 user: www-data
www-data     ALL = NOPASSWD: /bin/chmod, /bin/chown, /bin/tar
```