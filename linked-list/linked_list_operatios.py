"""
Traversal -1
Inserting -2
Deleting - 3
Sorting - 4
"""

#1
# we traverse for search, read, update, insert, delete
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def traverse(head):
    current_head = head
    while(current_head):
        print(f"{current_head.data} --> ", end = "")
        current_head = current_head.next
    print("null", end="")

def find_lowest_value(head):
    minimum_value = head.data
    current_head = head.next
    while(current_head):
        if(current_head.data < minimum_value):
            minimum_value = current_head.data
        current_head = current_head.next
    return minimum_value


# creating some nodes
node1 = Node(77)
node2 = Node(191)
node3 = Node(34)
node4 = Node(58)
node5 = Node(91)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

traverse(node1)
print()
print(f"Lowest value in the linkedin list is: {find_lowest_value(node1)}")
