# Debian 10 Dns over tls

### Instalacja
```bash
# Instalacja
sudo apt install -y unbound net-tools dnsutils

# Remove avahi-daemon
sudo apt-get remove --auto-remove avahi-daemon
```

### Dns servers
nano /etc/resolv.conf
```bash
# Zmień w pliku /etc/resolv.conf
nameserver 127.0.0.1
# nameserver 1.1.1.1
# nameserver 8.8.8.8

# Dodaj z terminala (nie nadpisuj resolv.conf)
echo 'make_resolv_conf() { :; }' > /etc/dhcp/dhclient-enter-hooks.d/leave_my_resolv_conf_alone
chmod 755 /etc/dhcp/dhclient-enter-hooks.d/leave_my_resolv_conf_alone

### Jak to ddziała
Ustawiam w /etc/resolv.conf namserver na lokalny 127.0.0.1
Wszystko co przyjdzie na port: 53 (unbound) będzie przekiwrowane 
do forward zones czyli na servery na port :853 (tls)

### Konfiguracja
sudo nano /etc/unbound/unbound.conf
```bash
server:
        # Tls
        tls-cert-bundle: /etc/ssl/certs/ca-certificates.crt

	# Tls service
	tls-port: 853	
	tls-service-key: /etc/ssl/private/ssl-cert-snakeoil.key 
	tls-service-pem: /etc/ssl/certs/ssl-cert-snakeoil.pem

        # Na porcie 53
        # port:53

        # Nasłuchuje na tych
        interface: 0.0.0.0
        interface: ::0

        # Pozwala na zapytania z tych ip
        access-control: 192.168.0.0/16 allow
        access-control: 127.0.0.1/24 allow
        access-control: ::1 allow

        verbosity: 1
	hide-version: yes
	hide-identity: yes
	# do-not-query-localhost: no

        # Listen on all interfaces on port 853, answer queries from the local subnet.
        # interface: 0.0.0.0@53
        # interface: ::0@53

forward-zone:
        forward-first: no
        forward-tls-upstream: yes

        # Wszystkie domeny
        name: "."

        # Przekazuje na te servery dns z tls na port 853

        # Cloudflare 
        forward-addr: 2606:4700:4700::1111@853#cloudflare-dns.com
        forward-addr: 1.1.1.1@853#cloudflare-dns.com
        forward-addr: 2606:4700:4700::1001@853#cloudflare-dns.com
        forward-addr: 1.0.0.1@853#cloudflare-dns.com

        # Google
        forward-addr: 2001:4860:4860::8888@853#dns.google
        forward-addr: 2001:4860:4860::8844@853#dns.google
        forward-addr: 8.8.8.8@853#dns.google.com
        forward-addr: 8.8.4.4@853#dns.google.com
```

### Testuj
```bash
# testuj dns tls
host example.com 127.0.0.1

# Podgląd
netstat -anp | grep -i 53

# Zwróci gdy wcześniej coś jak to
tcp        0      0 192.168.0.101:39846     1.0.0.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:39850     1.0.0.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:58392     1.1.1.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:58404     1.1.1.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:39842     1.0.0.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:58388     1.1.1.1:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:45336     8.8.4.4:853             TIME_WAIT   -                   
tcp        0      0 192.168.0.101:45176     8.8.8.8:853             TIME_WAIT   -   
```

### Przetestuj
```bash
# Zainstaluj
apt install -y tcpdump dnsutils

# Uruchom
sudo tcpdump
sudo tcpdump -vv -x -X -s 1500
sudo tcpdump -vv -x -X -s 1500 -i eth1 'port 53'

# Uruchom
sudo nslookup example.com 127.0.0.1
```
