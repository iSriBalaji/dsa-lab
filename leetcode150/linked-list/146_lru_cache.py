class Node:
    def __init__(self, key=-1, val=-1, prev=None, next=None):
        self.val = val
        self.key = key
        self.prev = prev
        self.next = next


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.LRUhash = {}
        self.left_dummy = Node()
        self.right_dummy = Node()

        self.left_dummy.next = self.right_dummy
        self.right_dummy.prev = self.left_dummy

    def traverse(self):
        head = self.left_dummy.next
        while head != self.right_dummy:
            print(head.val, end=" ")
            head = head.next
        print(self.LRUhash)
        print()

    def insert(self, node):
        node.prev = self.right_dummy.prev
        node.next = self.right_dummy
        self.right_dummy.prev.next = node
        self.right_dummy.prev = node

    def unlink(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def remove(self):  # auto remove the left most node
        self.left_dummy.next = self.left_dummy.next.next
        self.left_dummy.next.prev = self.left_dummy

    def get(self, key: int) -> int:
        # print("GET - Before")
        # self.traverse()

        if key in self.LRUhash:
            self.unlink(self.LRUhash[key])
            self.insert(self.LRUhash[key])
            # print("GET - After")
            # self.traverse()
            # print("*********")
            # print(f"RETURN: {self.LRUhash[key].val}")
            return self.LRUhash[key].val
        return -1

    def put(self, key: int, value: int) -> None:
        # print("POST - Before")
        # self.traverse()
        length = len(self.LRUhash)

        if key in self.LRUhash:
            self.unlink(self.LRUhash[key])
            # self.LRUhash[key] = Node(key, value)
            # self.insert(self.LRUhash[key])

        elif length == self.capacity:
            left_most_key = self.left_dummy.next.key
            self.remove()
            # print(f"Key to be deleted: {left_most_key}")
            del self.LRUhash[left_most_key]

        self.LRUhash[key] = Node(key, value)
        self.insert(self.LRUhash[key])

        # print("POST - After")
        # self.traverse()
        # print("*********")
