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

# Pokaż uprawnienia
SHOW GRANTS FOR 'root'@'localhost';

# Utwórz bazę danych
CREATE DATABASE db_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Wyjście
exit

# Zabezpiecz mysql z terminala
sudo mysql_secure_installation

# Uruchom mysql z hasłem (opcjonalnie)
mysql -u root -p
mariadb -u root -p

# Przykład zmiana uprawnień
# REVOKE ALL ON 'dbname'.'table' FROM 'user'@'host';
# Usuwanie usera
# DROP USER 'user'@'host';
# Zmiana hasła
# SET PASSWORD FOR 'user'@'host' = PASSWORD('pass');
```

### Utwórz folder na pliki stron www (usero - nazwa Twojego usera)
Defaultowo w apache2 to folder: /var/www/html
```bash
mkdir -p /home/usero/Www/html
mkdir -p /home/usero/Www/mysql
mkdir -p /home/usero/Www/virtualhost

# Access denied from browser
echo "Require all denied" > /home/usero/Www/mysql/.htaccess
echo "Require all denied" > /home/usero/Www/virtualhost/.htaccess
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

                <IfModule mod_http2.c>
		            Protocols h2 http/1.1
	            </IfModule>
        </VirtualHost>
</IfModule>
```
Free: tls/ssl certificates: https://certbot.eff.org/lets-encrypt/debianbuster-apache.html

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
a2enmod rewrite ssl deflate headers http2

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
```
Po więcej: https://cwiki.apache.org/confluence/display/httpd/PHP-FPM

### Apache2 headers, http2, ssl module
```bash
a2enmod headers

# <Virtualhost *.443> http2 protocol (only https)
<IfModule mod_http2.c>
    Protocols h2 http/1.1
</IfModule>

# Secure content
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "sameorigin"
    Header always set X-Xss-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    RequestHeader unset Proxy early
</IfModule>

# Ssl/Tls certs
<IfModule mod_ssl.c>
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256
    SSLHonorCipherOrder on
    SSLCompression off
    SSLUseStapling on
    SSLStaplingResponderTimeout 5
    SSLStaplingReturnResponderErrors off
    SSLStaplingCache shmcb:${APACHE_RUN_DIR}/ocsp_scache(128000)
    SSLSessionCache shmcb:${APACHE_RUN_DIR}/ssl_scache(512000)
    SSLSessionCacheTimeout 300
</IfModule>
```

### Apache2 Load balancer
```bash
# sudo a2enmod proxy
# sudo a2enmod proxy_http
# sudo a2enmod proxy_balancer
# sudo a2enmod lbmethod_byrequests
# sudo a2enmod headers

# Add to VirtualHost
ProxyPreserveHost On
<Proxy balancer://mycluster>
    BalancerMember http://127.0.0.1:8888
    BalancerMember http://127.0.0.1:9999
</Proxy>
# Balancer proxy
ProxyPass / balancer://mycluster/
ProxyPassReverse / balancer://mycluster/

# Single proxy
# ProxyPass / http://127.0.0.1:8888/
# ProxyPassReverse / http://127.0.0.1:9999/

### Proxy with session id mod_headers
# Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
# <Proxy "balancer://mycluster">
#    BalancerMember "http://192.168.1.50:80" route=1
#    BalancerMember "http://192.168.1.51:80" route=2
#    ProxySet stickysession=ROUTEID
# </Proxy>
# ProxyPass        "/test" "balancer://mycluster"
# ProxyPassReverse "/test" "balancer://mycluster"
```


### Mysql tuning
```bash
sudo apt install mysqltuner
sudo mysqltuner --user root --pass toor
```

## Mysql config file my.cnf
nano /etc/mysql/my.cnf
```bash
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

# Max mysql connection limit
max_connections = 2000

# Max import file size
max_allowed_packet = 1000000000

# Separate thread for connection
thread_cache_size=4

# Innodb
innodb_log_file_size=32M
innodb_buffer_pool_size=256M

# Dns
skip-name-resolve=1
performance_schema = ON

# Disable cache
query_cache_size=0
query_cache_type=0
query_cache_limit=1M


# Pokaż ustawienia
# mysql> SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';

# Zmień ustawienia
# mysql> SET GLOBAL max_connections=2000;

# Napraw
# mysqlcheck -u root -p --auto-repair --optimize --all-databases
```

## Mysql cache
```bash
mysql> SHOW VARIABLES LIKE '%cache%';

# Gdy cache dostępny
have_query_cache = true

# Rozmiar cache
query_cache_size = 268435456

# Limit wielkości zapytania
query_cache_limit = 1048576

# Włącz cache
query_cache_type = 1

# Wyłącz cache
SET SESSION query_cache_type = 0;

# Globalnie
SET GLOBAL query_cache_size = 0

# Dla bieżącej sesji
SET SESSION query_cache_size = 0

# W zapytaniu
SELECT SQL_NO_CACHE * FROM TABLE
```

## Mysql table backup, restore
```bash
# Import dużych plików .sql
SET GLOBAL max_allowed_packet = 1000000000

# Utwórz folder
mkdir /home/usero/Www/mysql

# Idź do 
cd /home/usero/Www/mysql

# Backup bazy danych
sudo mysqldump --add-drop-database --add-locks --databases dbname1 dbname2 > backup.sql
sudo mysqldump --add-drop-database --add-locks --all-databases > all-backup.sql

# With password
sudo mysqldump -u root -p --add-drop-database --add-locks --databases dbname1 dbname2 > backup.sql
sudo mysqldump -u root -p --add-drop-database --add-locks --all-databases > all-backup.sql

# With hosts and pass
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
# Utwórz folder
mkdir /home/usero/Backup

# Idź do 
cd /home/usero/Backup

# Backup gzip
tar -zcvf backup-1.tar.gz /home/usero/Www /etc/apache2

# With ownership add -p (z uprawniwniami na folderach)
tar -zcvfp backup-1.tar.gz /home/usero/Www /etc/apache2

# Restore backup
sudo tar -xvpzf /path/to/backup.tar.gz -C /tmp/Www --numeric-owner

## Remove folder sample
rm -rf /tmp/dir
```
Po więcej: https://help.ubuntu.com/community/BackupYourSystem/TAR
