# GCD Reference: www.youtube.com/watch?v=JUzYl1TYMcU
# Jan 22 2026 - Evening
# Link:https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list/description/?envType=problem-list-v2&envId=linked-list
# Medium: think its medium beacuse its linked list and the constraints they have is little medium level
# My Part: I refered the video on youtube for GCD function
"""
2807. Insert Greatest Common Divisors in Linked List

Given the head of a linked list head, in which each node contains an integer value.

Between every pair of adjacent nodes, insert a new node with a value equal to the greatest common divisor of them.

Return the linked list after insertion.

The greatest common divisor of two numbers is the largest positive integer that evenly divides both numbers.
"""


def get_gcd(num1, num2) -> int:
    bignum, smallnum = num1, num2
    remainder = -1

    # check basic cases as gcd cant be negative or zero
    if num1 == 0:
        return num2
    elif num2 == 0:
        return num1
    # elif num1 > num2: #directly set in the first step
    #     bignum, smallnum = num1, num2
    elif num2 > num1:
        bignum, smallnum = num2, num1

    gcd_value = smallnum

    while remainder != 0:
        quotient = bignum // smallnum
        remainder = bignum % smallnum

        print(f"{bignum} = ({smallnum} * {quotient}) + {remainder}")

        if remainder != 0:
            gcd_value = remainder
        else:
            return gcd_value

        bignum = smallnum
        smallnum = remainder


a, b = 18, 24
print(f"GCD of {a} and {b} is: calculations below")
gcd_num = get_gcd(a, b)
print(gcd_num)


# this is the other code I filled on my own after the gcd logic in the console itself
def insertGreatestCommonDivisors(self, head: Optional[ListNode]) -> Optional[ListNode]:
    start_node = head

    while start_node.next:
        if start_node.next:
            current_gcd_value = self.get_gcd(start_node.val, start_node.next.val)
            new_node = ListNode(val=current_gcd_value, next=start_node.next)
            start_node.next = new_node

            start_node = new_node.next

    return head
