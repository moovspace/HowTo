### Tworzenie biblioteki z composer
```json
{
    "name": "github-user/package-name",
    "description": "Package with nice stuff",
    "version" : "v1.0.0",
    "type": "library",
    "require" : {
        "php" : ">=7.1",
        "ext-mbstring": "*",
        "ext-curl": "*"
    },
    "license": "MIT",
    "authors": [
        {
            "name": "User Name",
            "email": "user@email.here",
            "homepage": "https://domain.here",
            "role": "Developer"
        }
    ],
    "minimum-stability": "stable",
    "autoload": {
        "psr-4": {
            "YourNamespace\\PackageName\\": "src/"
        }
    },
    "support": {
        "email": "user@email.here",
        "wiki": "https://domain.here",
        "docs": "https://domain.here"
    }	
}
```

### Struktura plików biblioteki composera (folder: /src)

#### User class
```php
<?php
// Klasa w katalogu:
// src/Login/User.php
namespace YourNamespace\PackageName\Login;
// Importuj klasy tutaj
// use Namespace\Folder1\Folder2\ClassName;

class User
{
	function Name($name = ''){
		echo $name;
	}
}
?>
```

#### Register class
```php
<?php
// Klasa w katalogu:
// src/Register/CreateUser.php
namespace YourNamespace\PackageName\Register;
// Importuj klasy tutaj
// use Namespace\Folder1\Folder2\ClassName;

class CreateUser
{
	function AddName($name = ''){
		echo $name;
	}
}
?>
```

#### Wczytaj klasy
```php
<?php
use YourNamespace\PackageName\Login\User;
use YourNamespace\PackageName\Register\CreateUser;

$user = new User();
$create = new CreateUser();
?>
```

### Dodaj pakiety,biblioteki do projektu w composer.json
```json
{
    "name": "acme/blog",
    "repositories": [
        {
            "type": "vcs",
            "url": "https://bitbucket.org/username/hello-world"
        },
		{
            "type": "vcs",
            "url": "https://github.com/username/hello-world"
        }
    ],
    "require": {
        "acme/hello-world": "dev-master",
        "acme/hello-world": "stable",
        "acme/hello-world": "^6.1"
    }
}
```

