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
client_header_buffer_size 1K;
large_client_header_buffers 4 8K;

# Timeouts
client_body_timeout 15;
client_header_timeout 15;
keepalive_timeout 15;
send_timeout 10;

# Gzip
gzip             on;
gzip_comp_level  2;
gzip_min_length  1000;
gzip_proxied     expired no-cache no-store private auth;
gzip_types       text/plain application/x-javascript text/xml text/css application/xml;
```

