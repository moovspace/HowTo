# Ustawienia php.ini w apache2, nginx, php-fpm

### Typy ustawień
- PHP_INI_ALL Globalnie dostępne ini_set(), .user.ini, .htaccess
- PHP_INI_USER Zmieniamy w ini_set() w php i w plikach .user.ini.
- PHP_INI_PERDIR Zmieniamy w plikach .user.ini.
- PHP_INI_SYSTEM Zmieniamy w pliku php.ini na serwerze

### Ustawienia ini_set() function
Zmieniamy w plikach .php tylko te z typem: PHP_INI_ALL
```php
<?php
set_time_limit(0);
ini_set('memory_limit', '128M'); // -1 unlimited
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
?>
```

### Ustawienia php.ini dla php-fpm
Zmieniamy w pliku .user.ini tylko te z typem: PHP_INI_PERDIR and PHP_INI_USER
```bash
# php config .php.ini
max_execution_time = 3600
max_input_time = 3600
max_input_vars = 3600
upload_max_filesize = 900M
post_max_size = 900M

# Blokada plików konfiguracyjnych z przeglądarki
# virtualhost apache2
<Files ".user.ini">
    Require all denied
</Files>

# virtualhost nginx
location ~ /\.user.ini {
    deny all;
}
```
### Linki
https://support.hypernode.com/knowledgebase/how-to-override-php-settings/
https://www.php.net/manual/en/ini.list.php
https://www.php.net/manual/en/configuration.changes.php
https://www.php.net/manual/en/configuration.file.per-user.php
