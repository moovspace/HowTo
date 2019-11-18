# PHP shell_exec() vs exec() bez sudo w apache2
Pozwól apache2 (user: www-data) php na używanie aplikacji konsolowych
```bash
# Edit sudo
nano /etc/sudoers

# Root privileges without password for user
www-data     ALL=(ALL) NOPASSWD:ALL

# Root privileges without password for user
www-data     ALL = NOPASSWD: /bin/chmod, /bin/chown, /bin/tar

# Members of the admin group may gain root privileges
# %admin  ALL=(ALL) ALL

# Members of the admin group may gain root privileges
# %admin  ALL=(ALL) NOPASSWD:ALL

# Allow members of group sudo to execute any command
# %sudo   ALL=(ALL:ALL) ALL
```

### Nadanie użytkownikom uprawnień root
```bash
# Dodaj linję do pliku i zapisz (CTRL+O i CTRL+X)
nano /etc/sudoers
# Pozwól userom z grupy sudo na wykonywanie poleceń jak root z hasłem
%sudo   ALL=(ALL:ALL) ALL

# Dodaj usera do grupy z treminala
usermod -a -G sudo username

# Lub usuń usera z grupy
deluser username sudo
```
