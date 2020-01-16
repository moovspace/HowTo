### Instalacja nowejs v9.x Debian 10 32-bit
```bash
# root login
su -

# add packages
# sudo curl -sL https://deb.nodesource.com/setup_9.x | bash -
sudo curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh

# wersja pakietu
sudo apt-cache policy nodejs

# install nodejs wer. 9
sudo apt install -y nodejs=9.11.2-1nodesource1
sudo apt install -y --allow-downgrades nodejs=9.11.2-1nodesource1

# install npm
sudo apt install npm
```

### Instalacja Angular 8
```bash
# instalacja klienta
npm i -g @angular/cli

# nowa aplikacja angular
ng new my-app

# start angular server localhost::4200
cd my-app
ng serv -o
```

### Instalacja Yarn
```bash
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

