# PhpUnit tests
- Na początek: https://phpunit.de/getting-started/phpunit-8.html
- Dokumentacja: https://phpunit.readthedocs.io/en/8.4/assertions.html
- Wideo: https://www.youtube.com/watch?v=V3xrGsUIYis

### Dodaj phpunit do projektu, biblioteki composera (zainstaluj composer)
```bash
# Nowy projekt z composer
mkdir new_proj
mkdir new_proj/src
mkdir new_proj/tests

# Do folderu
cd new_proj

# Utwórz composer.json
composer init

# Dodaj phpunit dla php >= 7.2 (^8 lub ^6.5)
composer require --dev phpunit/phpunit ^8
composer update

# Lub z composer.json
{
    "autoload": {
		"psr-4": {
            "YourPackageNamespace\\": "src/",
            "YourPackageNamespace\\PackageName\\": "src/"
        },
        "classmap": [
            "src/"
        ]
    },
    "require-dev": {
        "phpunit/phpunit": "^8"
    }
}
```

### Przykład klasy
```php
<?php
// Plik klasy: src/Email.php
declare(strict_types=1);

final class Email
{
    private $email;

    private function __construct(string $email)
    {
        $this->ensureIsValidEmail($email);
        $this->email = $email;
    }

    public static function fromString(string $email): self
    {
        return new self($email);
    }

    public function __toString(): string
    {
        return $this->email;
    }

    private function ensureIsValidEmail(string $email): void
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException(sprintf('"%s" is not a valid email address', $email));
        }
    }
}
?>
```

### Przykład testu klasy Email
```php
<?php
// Plik: tests/EmailTest.php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class EmailTest extends TestCase
{
    public function testCanBeCreatedFromValidEmailAddress(): void
    {
        $this->assertInstanceOf(Email::class,Email::fromString('user@example.com'));
    }

    public function testCannotBeCreatedFromInvalidEmailAddress(): void
    {
        $this->expectException(InvalidArgumentException::class);
        Email::fromString('invalid');
    }

    public function testCanBeUsedAsString(): void
    {
        $this->assertEquals('user@example.com', Email::fromString('user@example.com'));
    }
}
?>
```

### Uruchomienie testu klasy
```bash
# Przejście do folderu projojektu
cd new_proj

# Uruchom test
./vendor/bin/phpunit --bootstrap vendor/autoload.php tests/EmailTest
./vendor/bin/phpunit --bootstrap vendor/autoload.php tests

# Lub dodaj do pliku konfiguracyjnego phpunit.xml
<phpunit ... bootstrap="vendor/autoload.php" colors="true" ... >

# Uruchom testy z folderu
./vendor/bin/phpunit tests
```

### PhpUnit config
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="phpunit.xsd"
         bootstrap="tests/bootstrap.php"
         colors="true"
         verbose="true"
		 backupGlobals="false"
         bootstrap="vendor/autoload.php"
         backupStaticAttributes="false"
         convertErrorsToExceptions="true"
         convertNoticesToExceptions="true"
         convertWarningsToExceptions="true"
         processIsolation="false"
         stopOnFailure="false"
         syntaxCheck="false">

    <testsuites>
		<testsuite name="ApplicationTest">
            <directory suffix=".php">./tests/</directory>
        </testsuite>

        <testsuite name="unit">
            <directory suffix=".php">tests/unit</directory>
        </testsuite>

        <testsuite name="end-to-end">
            <directory suffix=".phpt">tests/end-to-end</directory>
            <exclude>tests/end-to-end/_files</exclude>
        </testsuite>
    </testsuites>

    <filter>
        <whitelist processUncoveredFilesFromWhitelist="true">
            <directory suffix=".php">src</directory>
            <exclude>
                <file>src/Framework/Assert/Functions.php</file>
                <file>src/Util/PHP/eval-stdin.php</file>
            </exclude>
        </whitelist>
    </filter>

    <php>
        <const name="PHPUNIT_TESTSUITE" value="true"/>
    </php>
</phpunit>
```
