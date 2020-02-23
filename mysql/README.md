# Backup mysql
```bash
# data and struct
mysqldump -u root -p"passwd" --add-drop-database --databases app  > app-backup.sql

# struct only
mysqldump -u root -p"passwd" --no-data --add-drop-database --databases app  > app-backup-schema.sql

# all databases
mysqldump -u root -p"passwd"  --add-drop-database --all-databases > backup.sql
```
