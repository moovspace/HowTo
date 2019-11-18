# Klucze ssh debian
Folder domowy z kluczami ssh zalogowanego usera to: ~/.ssh

### Login do ssh
```bash
ssh username@remote_host_or_ip

# Lub z konkretnym kluczem
ssh -i ~/.ssh/id_rsa.priv username@remote_host_or_ip
```

### Nowy klucz
```bash
ssh-keygen -b 4096
ssh-keygen -t rsa -b 4096 -C "your_email@domain.com"

# Lub inne warianty
ssh-keygen -t dsa
ssh-keygen -t ecdsa -b 521
ssh-keygen -t ed25519

# Zobacz klucze
ls ~/.ssh
ls /home/username/.ssh
```

### Kopiowanie klucza publicznego na server, vps
Kopiuje klucz publiczny z: ~/.ssh/id_rsa.pub do zdalnego servera do pliku: ~/.ssh/authorized_keys (kluczy w tym pliku może być kilka)
```bash
ssh-copy-id user@remote_vps_host_or_ip

ssh-copy-id -i ~/.ssh/id_rsa.pub user@remote_vps_host_or_ip
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
PermitTunnel no
# Gateway setting
# GatewayPorts no
# No root login
# PermitRootLogin no
# Allow only users
# AllowUsers root username
```

### Firewall
```bash
# Open port 22 for ssh
sudo ufw allow from 89.230.0.0/16 to any port 22
sudo ufw logging on
sudo ufw enable
```

### Restart serwera
```bash
sudo systemctl restart ssh
```

### Dodanie kluczy do agenta ssh
```bash
ssh-add ~/.ssh/id_rsa
```
