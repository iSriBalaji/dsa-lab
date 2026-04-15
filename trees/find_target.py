# binary tree - given a target identify if the target value is in the tree//
# 

from typing import List
from collections import deque

class Node:
    def __init__(self, val)->None:
        self.val = val
        self.left = None
        self.right = None

a = Node('a')
b = Node('b')
c = Node('c')
d = Node('d')
e = Node('e')
f = Node('f')
g = Node('g')

a.left = b
a.right = c
b.left = d
b.right = e
c.right = f

def find_target(root: Node, target: str) -> bool:
    stack = [root]
    
    while len(stack)>0:
        current = stack.pop()
        if current.val == target:
            return True
        
        if current.left: stack.append(current.left)
        if current.right: stack.append(current.right)
    
    return False

result = find_target(a, 'e')
print(f"Result: {result}")

