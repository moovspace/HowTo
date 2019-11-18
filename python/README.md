# Jak uruchomić bash shell command z python3

### Przykład
nano run.py
```python
### Function update
def install_function1():
    import os
    os.system('sudo netstat -tulpn')
    # os.system('sudo apt-get update')

### Function update
def install_function2():
    import subprocess
    subprocess.call("sudo netstat -tulpn", shell=True)
    # subprocess.call("sudo apt-get update", shell=True)

### Function call
install_function1()
install_function2()
```
### Uruchom
```bash
python3 run.py
```

### Prosty przykład podstawowych rzeczy
run-bash-command.py
