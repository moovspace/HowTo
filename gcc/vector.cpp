#include <iostream>
#include <vector>

int main()
{
    // Tworzy wektor zawierający liczby całkowite
    std::vector<int> v = {7, 5, 16, 8};

    // Dodaje dwie liczby do wektora
    v.push_back(25);
    v.push_back(13);

    // Iteruje po wartościach w wektorze i wypisuje je
    for(int n : v) {
        std::cout << n << '\n';
    }

    // Przydziela pamięć
    char *pBuffer = new char[1024];

    // Zwalnia heap
    delete[] pBuffer;
}

