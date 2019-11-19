# Bitbucket deploy with ssh, ssh-keys and git
## git clone --depth=1
Disable password logins on ssh user only with ssh-keys.

#### Add username to www-data group (remote - vps - after clone):
```sh
usermod -a -G www-data  username
chown -R www-data:username /var/www
chmod -R 775 /var/www
```

#### Deploy with ssh and git
```sh
ssh -t username@hostname -c "cd /var/www/dir-with-git-repo; git pull"

ssh -t root@hostname -c "cd /var/www/dir-with-git-repo; git pull; chown -R www-data:username /var/www; chmod -R 775 /var/www"

ssh -t username@hostname su -c "cd /var/www; git clone --depth=1 git://repo.org/repo-name.git && rm -rf repo-name/.git;"
```

#### Or with clond --depth=1
```sh
ssh -t username@hostname -c "cd /var/www && git clone --depth=1 git://repo.org/repo-name.git && rm -rf repo-name/.git"

ssh -t username@hostname -c "cd /var/www; git clone --depth=1 git://someserver/somerepo dirformynewrepo; rm -rf !$/.git"

ssh -t username@hostname -c "cd /var/www; git --work-tree=/var/www/ --git-dir=/var/repo checkout -f master"
```

### Download bitbucket repository terminal
```sh
wget https://bitbucket.org/codetube/tronix/get/master.git
wget https://bitbucket.org/codetube/tronix/get/master.tar.gz

# Authentication
curl --digest --user <username>:<password> https://bitbucket.org/<username>/<repository>/get/<branchname>.zip -o <branchname>.zip
curl --digest --user <username>:<password> https://bitbucket.org/<username>/<repository>/get/master.zip -o master.zip
curl --digest --user <username>:<password> https://bitbucket.org/<username>/<repository>/get/master.tar.gz -o master.tar.gz

# Rest APi
curl -X POST "https://${BB_AUTH_STRING}@api.bitbucket.org/2.0/repositories/${BITBUCKET_REPO_OWNER}/${BITBUCKET_REPO_SLUG}/downloads" --form files=@"target/output.jar"
```

### Download repo C#, .NetCore
```csharp
public static void Downloadfiles(string username, string password, string account, string repository, string pathToSave)
{
    var creds = Base64Encode(String.Format("{0}:{1}", username, password));

    // tip.zip, master.zip, master.tar.gz
    var url = String.Format("https://bitbucket.org/{0}/{1}/get/tip.zip", account, repository);

    using (var client = new WebClient())
    {

        client.Headers.Add("Authorization", "Basic " + creds);
        client.Headers.Add("Content-Type", "application/octet-stream");
        client.DownloadFile(url, pathToSave);
    }
}
```
