from typing import List
from collections import deque

class Node:
    def __init__(self, val)->None:
        self.val = val
        self.left = None
        self.right = None

# DFT - Using Stack
def dft_stack(root:Node)->List[str]:
    stack = [root]
    values = []
    
    while len(stack)>0:
        current = stack.pop()
        values.append(current.val)
        
        if current.right: stack.append(current.right)
        if current.left: stack.append(current.left)
    
    return values

# DFT - Using Recursive
def dft_recursive(root: Node)-> List[str]:
    current = root
    if current == None: return []
    #print(f"Current: {current.val}")
    
    left = dft_recursive(root.left)
    right = dft_recursive(root.right)
    
    return [current.val] + left + right

# BFT - Using Queue
def bft_queue(root: Node) -> List[str]:
    queue = deque()
    queue.append(root)
    values = []
    
    while len(queue)>0:
        current = queue.popleft()
        values.append(current.val)
        
        if current.left: queue.append(current.left)
        if current.right: queue.append(current.right)
    
    return values



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


stack_traversal = dft_stack(a)
print("DFT - Using Stack")
print(stack_traversal)

recursive = dft_recursive(a)
print("DFT - Using Recursive")
print(recursive)

queue_traversal = bft_queue(a)
print("BFT - Using Queue")
print(queue_traversal)