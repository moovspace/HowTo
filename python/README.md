# Jak uruchomić bash shell command z python3

### Przykład
nano run.py
```python
### Function 1
def install_function1():
    import os
    os.system('sudo netstat -tulpn')
    # os.system('sudo apt-get update')

### Function 2
def install_function2():
    import subprocess
    subprocess.call("sudo netstat -tulpn", shell=True)
    # subprocess.call("sudo apt-get update", shell=True)

### Function 3
def install_function3():
    import subprocess
    from subprocess import STDOUT
    import os
    proc = subprocess.Popen('sudo netstat -tulpn', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
    # proc = subprocess.Popen('apt-get install -y nano', shell=True, stdin=None, stdout=open('run.txt',"wb"), stderr=STDOUT, executable="/bin/bash")
    proc.wait()

### Function call
install_function1()
install_function2()
install_function3()
```
### Uruchom
```bash
sudo python3 filename.py
```

### Prosty przykład podstawowych rzeczy
sudo python3 run-bash-command.py
