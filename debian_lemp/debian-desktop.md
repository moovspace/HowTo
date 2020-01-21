### Create USB
```bash
sudo  if=debian.iso of=/dev/sdb1
```
### Install debian 10
Graphical Expert install -> with Mate desktop

### Grub doouble boot (1,2,3)
nano /etc/default/grub
```bash
GRUB_DEFAULT=3

# next 
sudo update-grub
```

### Sudo user (as root user)
```bash
su

# in file
nano /etc/sudoers

# Add user to sudo
user ALL=(ALL:ALL) ALL

# Logout root
exit
```

### Apt https
```bash
sudo apt install apt-transport-https net-tools git curl openssl mate-tweak
sudo apt remove avahi-daemon
sudo apt purge avahi-daemon
sudo apt autoremove
sudo apt update

# check services
sudo netstat -tulpn
```

### Sublime text 3
```bash
sudo wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | sudo apt-key add -
sudo echo "deb https://download.sublimetext.com/ apt/stable/" | sudo tee /etc/apt/sources.list.d/sublime-text.list
sudo apt update
sudo apt install sublime-text
```

### Wifi
```bash
sudo apt install firmware-b43-installer
sudo apt install firmware-b43legacy-installer
sudo apt install firmware-brcm8211
sudo apt install firmware-iwlwifi
sudo modprobe -r iwlwifi
sudo modprobe iwlwifi

# wifi interface
sudo ifconfig

# search your wifi SSID
sudo iwlist wlp2s0b1 scan

Add new connection WiFi in NetworkManager (Mate right top corner) and set SSID and credentials
```

### Lemp (as root user)
```bash
su

# Install
apt install nginx php-fpm php-mysql php-gd php-json php-curl php-mbstring mariadb-server
mysql_secure_installation

# Host folder
mkdir -p /var/www/html/domain.xx

# Permissions
sudo chown -R $USER:$USER /var/www/html
sudo chmod -R 775 /var/www/html
```

### Nginx virtualhost
sudo nano /etc/nginx/sites-available/default
```bash
server {
    listen 80;
    listen [::]:80;

    root /var/www/html/domain.xx;
    index index.php index.html index.htm;

    server_name domain.xx;

    location / {
        # Get file or folder or error
        # try_files $uri $uri/ =404;
        
        # Get file or folder or redirect uri to url param in index.php
        try_files $uri $uri/ /index.php?q=$uri&$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;

        # Or sockets
        # fastcgi_param HTTP_PROXY "";
        # fastcgi_pass 127.0.0.1:9000;
        # fastcgi_index index.php;        
        # include fastcgi_params;
    }
}
```

### Domain hosts for local domains
sudo nano /etc/hosts
```bash
127.0.0.1 localhost domain.xx domain1.xx domain2.xx
```

### Nginx Ssl, load balancer
https://github.com/moovspace/HowTo/blob/master/debian_lemp/ssl-virtual-host.sample

### Enable nginx virtual host
```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart server
sudo systemctl restart nginx
sudo systemctl restart php7.3-fpm
```

### Mysql user
mysql -u root -p
```bash
# Database
CREATE DATABASE example_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;

# User
GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY 'toor' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'toor' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### For more
https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mariadb-php-lemp-stack-on-debian-10


### Firewall desktop
```bash
sudo apt install ufw

sudo nano /etc/default/ufw
IPV6=YES

# Add rules
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow ssh if needed
sudo ufw allow 22

# Allow from net mask
sudo ufw allow from 2.1.0.0/16 to any port 22

# Allow http, https
sudo ufw allow 80
sudo ufw allow 443

# Deny from
sudo ufw deny from 2.1.0.0

# Delete
sudo ufw delete allow 80

# Enable
sudo ufw enable

# Show rules
sudo ufw status numbered
sudo ufw status verbose

# Ip addres
ip addr
```

### For more
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-debian-10


### Bash prompt colored
cd; nano .bashrc
```bash
export PS1="\[\e[32m\][\[\e[m\]\[\e[31m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[32m\]\h\[\e[m\]:\[\e[36m\]\w\[\e[m\]\[\e[32m\]]\[\e[m\]\[\e[32;47m\]\\$\[\e[m\] "
```
