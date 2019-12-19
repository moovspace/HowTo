# HaProxy apache

### Install, create certs pem
```bash
# Install
sudo apt install haproxy

# Config
sudo nano /etc/haproxy/haproxy.cfg

# Test config
sudo haproxy -c -V -f /etc/haproxy/haproxy.cfg

# Create .pem file
sudo cat /etc/ssl/certs/ssl-cert-snakeoil.pem /etc/ssl/private/ssl-cert-snakeoil.key | sudo tee /etc/ssl/snakeoil.pem
```

### Show stats on port :1000
```bash
frontend front_stats
	bind *:1000
	stats uri /
	stats realm Haproxy\ Statistics
	stats auth user:pass
```

### Show http on port :1080
```bash
frontend front_http
    bind *:1080
    reqadd X-Forwarded-Proto:\ http

    # Backend	
    default_backend backend_default

    # Subpath
    acl BLOG_URL path_beg /blog
    use_backend backend_default if BLOG_URL

    # Host
    acl FIRST_URL hdr_dom(host) -i first.domain.xx
    use_backend backend_default if FIRST_URL
```

### Show https on port :1443
```bash
frontend front_https
    bind *:1443 ssl crt /etc/ssl/snakeoil.pem
    reqadd X-Forwarded-Proto:\ http

    # Backend	
    default_backend backend_https

global
    # Max connections 
    maxconn 40000
    # Add for ssl
    tune.ssl.default-dh-param 2048
    # Disable ssl verify
    ssl-server-verify none
```

### Set backend
```bash
# Http
backend backend_default
    # Redirect to ssl
    redirect scheme https if !{ ssl_fc }

    # Type: roundrobin, source
    balance roundrobin

    # Set cookie
    cookie SERVERID insert indirect nocache
    cookie PHPSESSIONID prefix nocache
    
    # Add servers
    server serv1 127.0.0.1:8888 check cookie serv1
    server serv2 127.0.0.1:9999 check cookie serv2

# Https
backend backend_https
    # Type: roundrobin, source
    balance roundrobin

    # Set cookie
    cookie SERVERID insert indirect nocache
    cookie PHPSESSIONID prefix nocache

    # Options
    # maxconn 40000
    # option http-keep-alive
    # option forwardfor
    # option ssl-hello-chk
    # option http-server-close
    # option httpchk HEAD / HTTP/1.1\r\nHost:localhost

    # Headers
    http-request set-header X-Forwarded-Port %[dst_port]
    http-request add-header X-Forwarded-Proto https if { ssl_fc }

    # Add servers
    server serv1 127.0.0.1:4443 check ssl verify none cookie serv1
    server serv2 127.0.0.1:4443 check ssl verify none cookie serv2
```

### Smtp
```bash
frontend front_smtp
    bind *:125
    mode tcp
    option	tcplog
	option	dontlognull
    default_backend backend_smtp

backend backend_smtp   
    mode tcp
    option	tcplog
    balance roundrobin
    server smtp1 127.0.0.1:25 check
    server smtp2 127.0.0.1:578 check
```

### Proxy pass through ssl
```bash
frontend front_tcp
    bind *:2080
    bind *:2443
    option tcplog
    mode tcp
    default_backend nodes

backend nodes
    mode tcp
    balance roundrobin   
    
    # Add servers
    server web01 127.0.0.1:4443 check ssl verify none
    server web02 127.0.1.1:4443 check ssl verify none

    # Test cert hello hostname
    # option ssl-hello-chk
```
