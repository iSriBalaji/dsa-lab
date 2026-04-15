# Definition for singly-linked list.
from modulefinder import test


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def partition(self, head, x: int):
        dummy = ListNode(None, head)
        prev, current = dummy, dummy.next
        flag = False
        temp = None

        while current:
            print("Node: ", current.val)
            if current.val < x:
                prev.next = current
                prev = prev.next
            elif not flag:
                temp = current
                flag = True
            current = current.next

        prev.next = temp
        return dummy.next


# test list with nodes
head = ListNode(1)
head.next = ListNode(4)
head.next.next = ListNode(3)
head.next.next.next = ListNode(2)
head.next.next.next.next = ListNode(5)
head.next.next.next.next.next = ListNode(2)

ls = Solution()
next_ls = ls.partition(head, 3)

# while next_ls:
#     print(next_ls.val)
#     next_ls = next_ls.next
