cars = ["Ford", "Volvo", "BMW"]
x = len(cars)
cars.append("Honda")

# remove, copy, clear, insert, append
# cars.remove("Volvo")

# delete
# cars.pop(0)

# index
# x = fruits.index("BMW")
for i in cars:
	print(i)

### Arrays
import array as arr
a = arr.array('d', [1.1, 3.5, 4.5])

print("First element:", a[0])
print("Second element:", a[1])
print("Last element:", a[-1])
print(a)

### Foreach loop
for i in a:
	print("Loop ", i)

### Function Foreach
def forEach(list, function):
  for i,v in enumerate(list):
    function(v, i, list)

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

### Strings
str1 = 'Hello'
print(str1)

# multi string in one
str2 = ("Hello " "Hello1 " "Hello2")
print(str2)

str3 = '''Hello'''
print(str3)

# multiple lines in one
str4 = """
Hello, welcome to
the world of Python
"""
print(str4)
