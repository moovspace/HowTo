# Nginx web server

### Connection testing tools (n – uruchom n razy, c – jednoczesna ilość żądań): 
ab -n 1000 -c 50 http://domain.xx
```bash
sudo apt-get install apache2-utils
```

### Instalacja
```bash
sudo apt-get install nginx php-fpm php-mysql php-gd php-json php-curl php-mbstring mariadb-server
sudo mysql_secure_installation

# Host folder
mkdir -p /var/www/html/domain.xx

# Permissions
sudo chown -R $USER:$USER /var/www/html
sudo chmod -R 775 /var/www/html
```

### Virtual hosts add to file
nano /etc/nginx/sites-available/default
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

### Enable virtual host domain
```bash
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart server
sudo systemctl reload nginx
```

### Mysql
mysql -u root -p
```sql
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


## Aktywne połączenia (opcjonalnie)
```bash
# Aktywne
netstat -an | grep :80 | wc -l
netstat -an | grep :80 | grep ESTABLISHED | wc -l
netstat -an | grep :80 | grep -v TIME_WAIT | wc -l

# Live
watch -d -n0 "netstat -atnp | grep ESTA"

# Dump tcp: https://danielmiessler.com/study/tcpdump
sudo tcpdump -nnSX port 443
sudo tcpdump -i eth0
sudo tcpdump host 1.1.1.1
```

### System info
```bash
# System ustawienia: /etc/sysctl.conf
sudo sysctl -p

# Zmień ustawienia
sudo sysctl -w fs.file-max=2000000

# Liczba procesorów
grep processor /proc/cpuinfo | wc -l

# Limity połaczeń
ulimit -H -a
ulimit -n
```

### Linux tuning:
sudo nano nano /etc/sysctl.conf
```bash
net.core.somaxconn = 4096
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_max_syn_backlog = 4096
net.ipv4.ip_local_port_range = 1024 65535
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_orphans = 262144
# Max files limit
fs.file-max = 2000000

# Testuj
# sudo sysctl -p
```

### Konfiguracja
sudo nano /etc/nginx/nginx.conf
```bash
worker_processes auto; 
worker_connections 1024;

# Events
events {    
    use epoll;
    epoll_events 4096;
    worker_connections 1024;
    multi_accept on;
    accept_mutex off;   
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
}

# Cache files
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;

# Connections
keepalive_timeout 15;
keepalive_requests 100;

# Limits
# Max upload file size
client_max_body_size 200M;
client_body_buffer_size 16K;
client_header_buffer_size 2K;
client_header_timeout 15;
large_client_header_buffers 4 8K;

# Timeouts
client_body_timeout 15;
client_header_timeout 15;
send_timeout 10;

# Gzip
gzip             on;
gzip_comp_level  6;
gzip_min_length  100;
gzip_proxied     expired no-cache no-store private auth;
gzip_types       text/plain application/x-javascript text/xml text/css application/xml;
gzip_types       text/plain text/css application/x-javascript text/xml application/json application/xml application/xml+rss text/javascript;

# Compress
location / {
    gzip_static on;
}

# Errors
error_page 404             /404.html;
error_page 500 502 503 504 /50x.html;

# Limit rate for files
location ~ \.flv$ {
    flv;
    limit_rate_after 500k;
    limit_rate       50k;
}

# Rewrite
location / {
    rewrite ^/users/(.*)$ /show?user=$1 break;

    rewrite ^(/download/.*)/media/(.*)\..*$ $1/mp3/$2.mp3 last;
    rewrite ^(/download/.*)/audio/(.*)\..*$ $1/mp3/$2.ra  last;
    return  403;
}

# Static files
location ~ \.(mp3|mp4) {
    root /www/media;
}

# If file exists or not
location /images/ {
	try_files $uri /images/default.gif;
}
location / {
    try_files $uri $uri/ $uri.html =404;
}

# Limit
location /mp3 {
    sendfile           on;
    sendfile_max_chunk 1m;
    tcp_nopush on;
    tcp_nodelay       on;
    keepalive_timeout 65;
}

# Cache
http {
	# Allow from ip
	geo $purge_allowed {
		default         0;  # deny from other
		10.0.0.1        1;  # allow from localhost
		192.168.0.0/24  1;  # allow from 10.0.0.0/24
	}
	# Create PURGE methods
	map $request_method $purge_method {
		PURGE $purge_allowed;
		default 0;
	}

    proxy_cache_path /tmp/cache keys_zone=one:10m loader_threshold=300 loader_files=200;

    server {
        proxy_cache mycache;
        proxy_cache_key "$host$request_uri$cookie_user";
        proxy_cache_min_uses 5;
        proxy_cache_methods GET HEAD POST;
        
        proxy_cache_valid 200 302 10m;
		proxy_cache_valid 404      1m;
		proxy_cache_valid any 5m;

		proxy_cache_bypass $cookie_nocache $arg_nocache$arg_comment;
		proxy_no_cache $http_pragma $http_authorization;

        location / {
        	
        	# Clear cache with PURGE
            # curl -X PURGE -D – "https://www.example.com/*"
            proxy_cache_purge $purge_method;

            # Proxy revers
            proxy_set_header Host $host;
    		proxy_set_header X-Real-IP $remote_addr;
    		proxy_set_header X-Original-URI $request_uri;
            proxy_pass https://localhost:8000;

            # Cache
            proxy_cache mycache;            
        }
    }
}

# Tuning system
sudo sysctl -w net.core.somaxconn=4096
```bash
server {
    listen 80 backlog=4096;    
}
```

### Nginx stats
nano /etc/nginx.conf
```bash
    location /nginx_status {
        # Turn on stats
        stub_status on;
        access_log   off;
        # only allow access from ip
        allow 127.0.0.1;
        deny all;
    }

# Restart
# sudo services nginx restart

# Show
# http://ip.address.here/nginx_status
```

- https://docs.nginx.com/nginx/admin-guide/security-controls/securing-http-traffic-upstream/
- https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/
- https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/#
- https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching
- https://wiki.debian.org/Limits
- http://www.tweaked.io/guide/kernel
- https://easyengine.io/tutorials/linux/sysctl-conf
- https://gist.github.com/vongosling/9929680
- https://gist.github.com/voluntas/bc54c60aaa7ad6856e6f6a928b79ab6c
