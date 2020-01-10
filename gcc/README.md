# Programowanie 
 - gcc - C compiler
 - g++ - C++ compiler
 - libc6-dev - C standard library
 - make - GNU make utility

### Instalacja c, c++
```bash
sudo apt update

# Install
sudo apt install build-essential
sudo apt-get install manpages-dev

# Version
gcc --version
```

### Program
nano hello.c
```gcc
#include <stdio.h>
#include <stdlib.h>
int main()
{
  printf ("Hello World!\n");
  return 0;
}
```

### Kompilacja
```bash
gcc hello.c -o hello

# Ostrzeżenia (-Wall, -Wextra)
# Niezgodności ze standardem ANSI C (-pedantic)
gcc hello.c -o hello -Wall -ansi -pedantic -Wextra

# Wymuś c++
gcc -x c++ hello.c -o hello

# Uruchom
./hello
```

### SFML C++
```bash
g++ -c main.cpp
g++ main.o -o sfml-app -lsfml-graphics -lsfml-window -lsfml-system
./sfml-app
```

### Clang
```bash
sudo apt install clang
clang --version
clang++ --version
```

### C++ class
nano hello.cpp
```bash
#include "message.h"
#include <stdio.h>
#include <stdlib.h>

using namespace std;

int main()
{
        message m;
        m.PrintMsg();
	message::PrintMsg();

        return 0;
}
```

nano message.cpp
```bash
#ifndef MESSAGE_H
#define MESSAGE_H

class message
{
        public:
                static void PrintMsg();

	protected:
		static const int MEMBER = 1;
};

#endif // MESSAGE_H
```

nano message.cpp
```bash
#include "message.h"
#include <iostream>
using namespace std;


void message::PrintMsg(){
        cout << "Class print !!!\n";
}
```

### kompilacja
```bash
g++ hello.cpp -o hello message.cpp message.h -Wall -Werror -pedantic
./hello
```
