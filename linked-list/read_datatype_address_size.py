"""
we are going to do these 4 things here
1 - value of integer
2 - size of the integer value
3 - address of the interger value
4 - size of the address of the int
"""

# it seems python will not provide the raw memory pointer like C - we already added in one of the notes

import sys
import struct #to work with binary date

#1
val = 23
print(f"value of int: {val}")

#2
# the main thing is python int is not same as C int, here int is a object that takes more memory
print(f"Size of the integer value: {sys.getsizeof(val)} bytes")

#3
# id() gives the object identity - its just a unique number of python objects not memory real one
print(f"id of the int value {id(val)}")
print(f"address id of the int value {hex(id(val))}")

#4
# to see how many bytes it takes to store a address - 'P' is a pointer here - memory address
print(f"Size of the address in python {struct.calcsize('P')} bytes")

"""
Result:
value of int: 23
Size of the integer value: 28 bytes(shows the size of the object)
id of the int value 4354142880
address id of the int value 0x10386f2a0
Size of the address in python 8 bytes
"""