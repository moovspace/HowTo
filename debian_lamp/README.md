# Apache2 lamp serwer debian 10 buster

### Instalacja Lamp debian 10
```bash
# Zainstaluj apache, php i mysql server
apt -y install apache2 mariadb-server 
apt -y install php libapache2-mod-php php-mysql php-pdo php-mbstring php-json 
apt -y install php-opcache php-apcu php-imap php-curl

# Development stuff
apt -y install git composer
 
# Dns utile, netstat
apt -y install dnsutils tcpdump unbound

# Zabezpiecz mysql
sudo mysql_secure_installation

# Uruchom mysql
sudo mariadb

# Dodaj usera mysql
GRANT ALL ON *.* TO 'root'@'localhost' IDENTIFIED BY 'toor' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'root'@'127.0.0.1' IDENTIFIED BY 'toor' WITH GRANT OPTION;
FLUSH PRIVILEGES;

# Utwórz bazę danych
CREATE DATABASE bdname CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# wyjście
exit

# uruchom mysql z hasłem
mariadb -u root -p
```

### Utwórz folder na pliki stron www
```bash
mkdir /home/usero/Www
```

### Zmień
sudo nano /etc/apache2/mods-enabled/dir.conf
```bash
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html
</IfModule>
```

### Dodaj virtualhosts
sudo nano /etc/apache2/sites-available/000-default.conf
```bash
# Usuń wszystko z pliku i dodaj:
include /home/usero/Www/virtualhost/*.conf
```

### Przykład virtual hosts
sudo nano /home/usero/Www/virtualhost/pages.conf
```bash
<VirtualHost *:80>
	ServerName localhost
	ServerAdmin webmaster@localhost
	DocumentRoot /home/usero/Www/html
	LogLevel info ssl:warn
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /home/usero/Www/html>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:80>
        ServerName test.xx
    	ServerAlias www.test.xx
        ServerAdmin webmaster@localhost
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
                ServerAdmin webmaster@localhost
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
chown -R usero:www-data /home/usero/Www
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
# Instalacha
apt -y install ufw

# Otwórz porty: 80, 443 (apache2 http, https)
sudo ufw allow in "WWW Full"
# Włącz logi
sudo ufw logging on
# Uruchom na stałe
sudo ufw enable

# Lub
sudo ufw allow www
sudo ufw allow https
```

### Dla domen z lokalnego hosta dodaj
sudo nano /etc/hosts
```bash
127.0.0.1 localhost test.xx www.test.xx your-domain.xx
```

### Konfiguracja apache2 prefork (opcjonalnie)
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

### Mysql table backup, restore
```bash
# Backup database
mysqldump --add-drop-database -hlocalhost -uroot -ptoor dbname > dbname-backup.sql

# Backup all databases
mysqldump --all-databases -add-drop-database --single-transaction --quick --lock-tables=false > full-backup-$(date +%F).sql -hlocalhost -uroot -ptoor

# Restore database
mysql -hlocalhost -uroot -phaslo dbname < dbname-backup.sql
```
