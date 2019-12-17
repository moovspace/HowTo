# Nginx server virtualhosts

### Konfiguracja
sudo nano /etc/nginx/nginx.conf
```conf
# Procesor:
# grep processor /proc/cpuinfo | wc -l
worker_processes 1;

# Connection limit
# ulimit -n
worker_connections 1024;

# Timeout
keepalive_timeout 70;

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

# Connections
keepalive_timeout 15;
keepalive_requests 100;

# Gzip
gzip             on;
gzip_comp_level  6;
gzip_min_length  1000;
gzip_proxied     expired no-cache no-store private auth;
gzip_types       text/plain application/x-javascript text/xml text/css application/xml;

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

### System tuning 
nano /etc/sysctl.conf
```bash
# NGINX
net.ipv4.ip_local_port_range = 1024 65535
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_max_syn_backlog = 4096
net.ipv4.tcp_syncookies = 1
net.core.somaxconn = 4096
fs.file-max = 200000

net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_orphans = 262144

# Test with
# sysctl -w fs.file-max=200000
# sudo sysctl -p
```
- https://docs.nginx.com/nginx/admin-guide/security-controls/securing-http-traffic-upstream/
- https://docs.nginx.com/nginx/admin-guide/security-controls/configuring-http-basic-authentication/
- https://docs.nginx.com/nginx/admin-guide/security-controls/terminating-ssl-http/#
- https://wiki.debian.org/Limits
- http://www.tweaked.io/guide/kernel
- https://easyengine.io/tutorials/linux/sysctl-conf
- https://gist.github.com/vongosling/9929680
- https://gist.github.com/voluntas/bc54c60aaa7ad6856e6f6a928b79ab6c