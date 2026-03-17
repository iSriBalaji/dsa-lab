## we go deeper as much as possible until we cant anymore and look for same in lateral way
# DFT uses stack to track the nodes - so if we think it uses combination of tree and stack to solve the problem
# Time complexity - O(n) we visit each node
# Space complexity - O(n) we store the elements in stack temporily
# if we use recursion the space is o(1)
# 


class Node:
    def __init__(self, val) -> None:
        self.val = val
        self.left = None
        self.right = None

    # dft direct path
    def dft_traverse(self):
        if not self: return []
        stack = [self]
        list = []

        while len(stack) > 0:
            current = stack.pop()
            list.append(current.val)

            if current.right:
                stack.append(current.right)
            if current.left:
                stack.append(current.left)

        return list
    
    # dft recurive path
def dft_recurcive(node):
    if node is None: return []
    
    #list.append(self.val)
    
    left_side = dft_recurcive(node.left)
    right_side = dft_recurcive(node.right)
    
    print(f"Node {node.val} combined {left_side} and {right_side}")
    
    return [node.val] + left_side + right_side


a = Node("a")
b = Node("b")
c = Node("c")
d = Node("d")
e = Node("e")
f = Node("f")

a.left = b
a.right = c
b.left = d
b.right = e
a.right = c
c.right = f

dft = a.dft_traverse()
#print(dft)
recursive = dft_recurcive(a)
print(recursive)
