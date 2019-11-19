<?php
// Parametry z command line
// php -f /path/to/the/file.php first_param second_param
// print_r($argv);
// Nazwa path skryptu to: $argv[0] 
// Pierwszy argument to: $argv[1]
foreach($argv as $a){
    echo "Arg : " . $a . "\r\n";
}

// Uruchom skrypt z argumentami z php
$out = shell_exec('/tmp/myscript.php '.escapeshellarg($my_url).' '.escapeshellarg($my_refer));
$out = shell_exec('/tmp/myscript.php '.escapeshellarg($my_url).' '.escapeshellarg($my_refer));
$out = shell_exec(sprintf('/tmp/my_script.php "%s" "%s"', $my_url, $my_refer));

// exec 
$out = exec("php /var/www/unity/src/emailer.php 123");
$out = exec("/usr/bin/php -f {$fileName} {$options} > /var/www/ztest/log01.txt 2>&1 &");

// zip 
$out = shell_exec("gunzip -c -t $path_to_backup_file 2>&1");

// Przykład z output do pliku
$fileName = '/var/www/html/helloworld.php 123';
$options = 'target=321';
exec("/usr/bin/php -f {$fileName} {$options} > /var/www/ztest/log01.txt 2>&1 &");
echo "Bye bye ..."; 

// putenv('LANG=en_US.UTF-8');
// shell_exec('env -i /home/www/myscript');

// Nie wyświetlaj tekstu
// >/dev/null 2>&1
// Do pliku: command >file 2>&1
// $out = shell_exec("/tmp/myscript.sh 2>&1 | tee -a /tmp/mylog 2>/dev/null >/dev/null &");
// $output = shell_exec('ls file_not_exist 2>&1 1> /dev/null');
?>
