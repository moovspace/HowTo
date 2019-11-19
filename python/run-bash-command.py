### Lists, arrays
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

### Foreach function
def forEach(list, function):
  for i,v in enumerate(list):
    function(v, i, list)

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
        proc = subprocess.Popen('apt-get install -y nano', shell=True, stdin=None, stdout=open(os.devnull,"wb"), stderr=STDOUT, executable="/bin/bash")
        proc = subprocess.Popen('apt-get install -y nano', shell=True, stdin=None, stdout=open('run.txt',"wb"), stderr=STDOUT, executable="/bin/bash")
        proc.wait()

### Function call
install_function1()
install_function2()
install_function3()

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

### Write to file
file = open("test.txt","w+")
file.write("Line 111\r\n")
file.write("Line 222\r\n")
file.write("Line 333\r\n")
file.close()

### Read from file
ff = open("test.txt", "r")
t =  ff.read()
print("All lines: ", t)

### Read lines ["one","two","..."]
f = open("test.txt", "r")
t = f.readlines()
print(t)
for i in t:
	print(i)

# or
file = open("test.txt", "r")
for line in file:
	print("Each line: ", line)
	words = line.split()

### Append to file
f1 = open("test.txt","a+")
f1.write("Hello World Append")
for i in range(2):
     f1.write("Appended line %d\r\n" % (i+1))
