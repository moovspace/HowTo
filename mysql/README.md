# Backup mysql
```bash
# data and struct
mysqldump -u root -p"passwd" --add-drop-database --databases app  > app-backup.sql

# struct only
mysqldump -u root -p"passwd" --no-data --add-drop-database --databases app  > app-backup-schema.sql

# all databases
mysqldump -u root -p"passwd"  --add-drop-database --all-databases > backup.sql
```

# MariaDb settings
nano /etc/mysql/my.cnf

### Key to long error
```bash
# change index key size to 3072B
innodb_large_prefix=1
innodb_page_size=16KB
```

### Encoding UTF-8
```bash
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

### Cache disable
```bash
# Disable cache
query_cache_size=0
query_cache_type=0
query_cache_limit=1M
```

### Mariadb connection, limits
```bash
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
```

### Cache settings
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

