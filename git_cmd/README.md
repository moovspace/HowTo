### Klonowanie repozytorium (pobieranie)
```bash
# Pobieranie repo
git clone https://github.com/<username>/<reponame>.git

# Pobieranie pojedyńczej gałęzi git://repo-url.git
git clone -b <branchname> --single-bramch https://github.com/<username>/<reponame>.git

# Podgląd
git remote -v

# Update
git remote set-url example https://github.com/<username>/<reponame>.git

# Usuwanie
git remote rm REMOTE-NAME
```

### Jeżeli repozytorium istnieje na github.com/<username>/<reponame>.git
```bash
# Utwórz folder lokalnie
mkdir <reponame>
cd <reponame>

# Inicjalizacja gita
git init

# Dodaj url zdalnego repozytorium
git remote add origin https://github.com/<username>/<reponame>.git

# Pobierz to czego nie masz
git pull origin master --allow-unrelated-histories
```

### Dodaj pliki
```bash
# Dodaj pliki
git add .

# Dodaj komentarz
git commit -m "Git test"

# Wyślij na server (pierwszy raz)
git push --set-upstream origin master

# Później (did not exist remotely, it would be created.)
git push -u orgin master
git push orin master
git push
```

### Errors
```bash
# error: src refspec master does not match any.
git add .
git commit -m "initial commit"
git push -u origin master
git push -u origin <branchname>

# fatal: refusing to merge unrelated histories
git pull origin master --allow-unrelated-histories
git pull origin <branchname> --allow-unrelated-histories

# Pull rebase
git pull --rebase origin master
```

### Nowa gałąź (branch)
```bash
# Utwórz gałąź z obecnej
git checkout -b <NewBranch>
git checkout -b <NewBranch> <master>

# Lub w 3 linijki

# Zmień brancha
git checkout master

# Utwórz nowy
git branch <NewBranch>

# Przejdź do nowego brancha
git checkout <NewBranch>
```

### Połącz gałązki
```bash
# Przejdz do brancha
git checkout master

# Dodaj zmiany z innego brancha
git merge --no-ff <NewBranch>
```

### Wyślij zmiany do repozytorium
```bash
git push origin master
git push origin <NewBranch>
```

### Git tags
```bash
# utwórz tag
git tag -a 2.0
git tag -a 2.0 -m "Wersja 2.0"

# Wyślij na repo
git push origin --tags
git push origin :<tagname>

# Zobacz tagi
git tag

# Usuń tag
git tag -d <tagname>
git push origin :refs/tags/<tagname>
```

### Zobacz gałęzie
```bash
git branch --all
```

### Zobacz log zmian
```bash
git log

# Parametry
--pretty=oneline
--max-count=5
--author=<name>
--all
--since='10 minutes ago'
```

### Git konfiguracja
```bash
git config -l

git config --global user.name "User name"
git config --global user.email email@email.xx
git config --global core.autocrlf input
git config --global core.safecrlf false
```

### Git usuwanie, reset
```bash
# Powrót po commit
git revert HEAD

# Reset
git reset --hard v2.0
git reset --hard <commithash>

# Reset file
git reset HEAD <file>
```

### Git status
```bash
git status

## Zobacz pliki
git cat-file -p <hash>
git cat-file -t <hash>
```
