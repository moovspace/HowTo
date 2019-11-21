# Apache2 lamp serwer debian 10 buster

## Włączenie sudo w Debian 10
nano /etc/sudoers
```bash
# Odkomentuj i zapisz CTRL+O, CTRL+X
%sudo   ALL=(ALL:ALL) ALL

# Dodaj usera do grupy z treminala
usermod -a -G sudo your_user_name
```

## Lub zaloguj się na root (nie dodajesz: sudo ...)
```bash
su -
```

### Instalacja Lamp debian 10 (dla usera root bez: sudo)
```bash
# Zainstaluj apache, php i mysql server
sudo apt -y install apache2 mariadb-server 
sudo apt -y install php libapache2-mod-php php-mysql php-pdo php-mbstring php-json 
sudo apt -y install php-opcache php-apcu php-imap php-curl

# Development stuff
sudo apt -y install git composer
 
# Dns utile, netstat
sudo apt -y install dnsutils tcpdump unbound

# Uruchom mysql
sudo mariadb

# Dodaj usera mysql
GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY 'toor' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'toor' WITH GRANT OPTION;
FLUSH PRIVILEGES;
# Utwórz bazę danych
CREATE DATABASE bdname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# Wyjście
exit

# Zabezpiecz mysql z terminala
sudo mysql_secure_installation

# Uruchom mysql z hasłem (opcjonalnie)
mariadb -u root -p
```

### Utwórz folder na pliki stron www (usero - nazwa Twojego usera)
Defaultowo w apache2 to folder: /var/www/html
```bash
mkdir -p /home/usero/Www/html
mkdir -p /home/usero/Www/virtualhost
```

### Zmień
sudo nano /etc/apache2/mods-enabled/dir.conf
```bash
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html
</IfModule>
```

### Dodaj virtualhosts z innej lokalizacji
nano /etc/apache2/apache2.conf
```bash 
# Virtual hosts
IncludeOptional /home/usero/Www/virtualhost/*.conf

# Www directory
<Directory /home/usero/Www/>
        Options Indexes FollowSymLinks MultiViews
        DirectoryIndex index.php index.html
        AllowOverride All 
        Require all granted
</Directory>
```

### Przykład virtual hosts
sudo nano /home/usero/Www/virtualhost/pages.conf
```bash
<VirtualHost *:80>
        ServerName test.xx
    	ServerAlias www.test.xx
        ServerAdmin webmaster@test.xx
        DocumentRoot /home/usero/Www/html/test
        LogLevel info ssl:warn
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        <Directory /home/usero/Www/html/test>
            DirectoryIndex index.php index.html
            Options Indexes FollowSymLinks MultiViews
            IndexIgnore *.sh *.htaccess
            AllowOverride All 
            Require all granted
        </Directory>      
</VirtualHost>

# Host wirtualny dla strony z ssl/tls
<IfModule mod_ssl.c>
        <VirtualHost *:443>
                ServerName test.xx
                ServerAlias www.test.xx
                ServerAdmin webmaster@test.xx
                DocumentRoot /home/usero/Www/html/test
                LogLevel info ssl:warn
                ErrorLog ${APACHE_LOG_DIR}/error.log
                CustomLog ${APACHE_LOG_DIR}/access.log combined

                SSLEngine on
                SSLCertificateFile      /etc/ssl/certs/ssl-cert-snakeoil.pem
                SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key

                #SSLCertificateChainFile /etc/apache2/ssl.crt/server-ca.crt

                <FilesMatch "\.(cgi|shtml|phtml|php)$">
                                SSLOptions +StdEnvVars
                </FilesMatch>
                <Directory /usr/lib/cgi-bin>
                                SSLOptions +StdEnvVars
                </Directory>
        </VirtualHost>
</IfModule>
```

### Zmień uprawnienia i właściciela folderu
```bash
chown -R www-data:usero /home/usero/Www
chmod -R 775 /home/usero/Www

# Lub dodaj swojego użytkownika do grupy: www-data
usermod -a -G www-data usero

# Usuń usera z grupy
# deluser usero www-data
```

### Włącz moduły
```bash
# Apache2
a2enmod rewrite ssl deflate headers

# Php
phpenmod mbstring json pdo curl imap

# Enable localhost ssl
a2ensite default-ssl
```

### Restart serwera
```bash
sudo systemctl restart apache2
sudo systemctl status apache2
```

### Uruchom firewall
```bash
# Instalacja
sudo apt -y install ufw

# Otwórz port: 22 ssh (tylko na vps na desktop pomiń)
sudo ufw allow 22/tcp

# Otwórz porty: 80, 443 (apache2 http, https)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Blokada innych portów (Desktop, vps)
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Włącz logi
sudo ufw logging on

# Uruchom na stałe
sudo ufw enable

# Status firewalla
sudo ufw status
```

### Dla domen z lokalnego hosta dodaj
sudo nano /etc/hosts
```bash
127.0.0.1 localhost test.xx www.test.xx your-domain.xx
```

## Konfiguracja apache2 prefork (opcjonalnie)
sudo nano /etc/apache2/mods-available/mpm_prefork.conf
```bash
# prefork MPM
# StartServers: number of server processes to start
# MinSpareServers: minimum number of server processes which are kept spare
# MaxSpareServers: maximum number of server processes which are kept spare
# MaxRequestWorkers: maximum number of server processes allowed to start
# MaxConnectionsPerChild: maximum number of requests a server process serves
 
<IfModule mpm_prefork_module>
	StartServers		   5
	MinSpareServers		   5
	MaxSpareServers		   30
	MaxRequestWorkers	   200
	MaxConnectionsPerChild 100
</IfModule>
```

### Włączenie modułu
```bash
sudo a2dismod mpm_event
sudo a2enmod mpm_prefork
```

## Apache2 php-fpm (opcjonalnie)
Instalacja php-fpm dla serwera apache2
```bash
# Wyłącz
sudo a2dismod php7.3

# Zainstaluj
sudo apt install php7.3-fpm

# Konfiguracja
sudo a2enmod proxy_fcgi setenvif
sudo a2enconf php7.3-fpm

# Run php-fpm
sudo systemctl enable php7.3-fpm
sudo systemctl start php7.3-fpm

# Show status
systemctl status php7.3-fpm

# Restart servera
sudo systemctl restart apache2

# Show apache2 modules
sudo apachectl -M
```

### Zmień Apache2 virtualhost dla php-fpm
sudo nano /home/usero/Www/virtualhost/pages.conf
```conf
# Add to virtualhosts
<Proxy "fcgi://localhost:9000/" enablereuse=on max=10> 
</Proxy>

# Dodaj do virtualhosta każdej domeny
<IfModule mod_proxy_fcgi.c>
    # Gdy w /etc/php/7.3/fpm/pool.d/www.conf jest:
    # listen = 127.0.0.1:9000
    ## ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://127.0.0.1:9000/home/usero/Www/html/test/$1
    
    # Gdy w /etc/php/7.3/fpm/pool.d/www.conf jest:
    # listen = /run/php/php7.3-fpm.sock
    ProxyPassMatch ^/(.*\.php(/.*)?)$ unix:/run/php/php7.3-fpm.sock|fcgi://127.0.0.1:9000/home/usero/Www/html/test/
</IfModule mod_proxy_fcgi.c>

# Lub tak
<IfModule mod_proxy_fcgi.c>
    <FilesMatch "\.php$">
        SetHandler "proxy:unix:/run/php/php7.3-fpm.sock|fcgi://127.0.0.1:9000/home/usero/Www/html/test/
    </FilesMatch>
</IfModule>
```
Po więcej: https://cwiki.apache.org/confluence/display/httpd/PHP-FPM

### Apache2 headers module
```bash
a2enmod headers

# Virtualhost part
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "sameorigin"
  Header always set X-Xss-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  RequestHeader unset Proxy early
</IfModule>
```

## Mysql table backup, restore
```bash
# Create folder
mkdir /home/usero/Www/mysql

# Idź do 
cd /home/usero/Www/mysql

# Backup database
sudo mysqldump --add-drop-database -hlocalhost -uroot -ptoor dbname > dbname-backup.sql

# Backup all databases
sudo mysqldump --all-databases -add-drop-database --single-transaction --quick --lock-tables=false > full-backup-$(date +%F).sql -hlocalhost -uroot -ptoor

# Restore single database
sudo mysql -hlocalhost -uroot -phaslo dbname < dbname-backup.sql

# Restore All databases
sudo mysql -hlocalhost -uroot -phaslo < full-backup.sql
```

## Tar backup Www, mysql, Apache folders
```bash
# Create folder
mkdir /home/usero/Backup

# Idź do 
cd /home/usero/Backup

# Backup gzip
tar -zcvf backup-1.tar.gz /home/usero/Www /etc/apache2

# With ownership add -p
tar -zcvfp backup-1.tar.gz /home/usero/Www /etc/apache2

# Restore backup
sudo tar -xvpzf /path/to/backup.tar.gz -C /tmp/Www --numeric-owner

## Remove folder sample
rm -rf /tmp/dir
```
Po więcej: https://help.ubuntu.com/community/BackupYourSystem/TAR
