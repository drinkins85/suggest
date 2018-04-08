## Решение в лоб

Самый простой способ перебирать весь массив, в этом случае асимптотическая сложность
 будет O(N).
  
 ##Префиксное дерево
 
 Поиск с использованием префиксного дерева будет иметь сложность O(log N). 
 Поскольку поиск по префиксному дереву начинается с первой буквы, нет возможности искать подстроку.
 
 Я решил совместить эти два способа: при составлении дерева добавить ссылки на индекс в массиве-источнике.
 
 То есть, если у нас есть массив:
``` 
 [0] Улица Академика Королёва
 [1] Улица Академика Янгеля
 ```
 
 То в префиксном дереве будут указатели:
 ```
 Улица --> [0,1]
 Академика --> [0,1]
 Королева --> [0]
 Янгеля --> [1]
 ```
 
 Это позволяет по найденному слову восстановить полное название за O(1)
 
 [Пример]:https://drinkins85.github.io/suggest/