# Klucze ssh debian

### Nowy klucz
```bash
ssh-keygen -b 4096
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"

# Zobacz klucze
ls ~/.ssh
```

### Kopiowanie klucza na server
Kopiuje klucz publiczny z: ~/.ssh/id_rsa.pub do zdalnego servera do pliku: ~/.ssh/authorized_keys (kluczy w tym pliku może być kilka)
```bash
ssh-copy-id user@remote_vps_host_or_ip
```

### Kopiowanie klucza z ssh
```bash
cat ~/.ssh/id_rsa.pub | ssh username@remote_vps_host_or_ip "mkdir -p ~/.ssh && touch ~/.ssh/authorized_keys && chmod -R go= ~/.ssh && cat >> ~/.ssh/authorized_keys"
cat ~/.ssh/id_rsa.pub | ssh remote_username@remote_vps_host_or_ip "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### Kopiowanie klucza ręcznie
```bash
# Lokalny server, desktop pokaż klucz
cat ~/.ssh/id_rsa.pub
```
### Zdalny server, vps
```bash
# Utwórz folder
mkdir -p ~/.ssh
# Dodaj klucz do pliku
nano ~/.ssh/authorized_keys
# Zmień uprawnienia pliku
chmod -R go= ~/.ssh
chown -R username:username ~/.ssh
```

### Login z ssh
```bash
ssh username@remote_host_or_ip

# Lub z konkretnym kluczem
ssh -i ~/.ssh/id_rsa.priv username@remote_host_or_ip
```

### Konfiguracja
sudo nano /etc/ssh/sshd_config
```bash
# Pub keys enable
AuthenticationMethods publickey
PubkeyAuthentication yes

# No pass only keys
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM no
HostbasedAuthentication no
IgnoreRhosts yes

# Forwarding, tunels
AllowTcpForwarding no
X11Forwarding no
AllowAgentForwarding no
# No root login
# PermitRootLogin no
# Allow only users
# AllowUsers root username
```

# Firewall
```bash
# Open port 22 for ssh
sudo ufw allow from 89.230.0.0/16 to any port 22
sudo ufw logging on
sudo ufw enable
```

# Restart servera
```bash
sudo systemctl restart ssh
```
