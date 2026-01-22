# Jan 22, 2026
# Link: https://leetcode.com/problems/minimum-pair-removal-to-sort-array-i/?envType=daily-question&envId=2026-01-22
# easy: beacuse the data range is smaller even though there are many possibilities
# I refered the solution, and did this - took more than 30 mins for analysis

"""
Given an array nums, you can perform the following operation any number of times:

    Select the adjacent pair with the minimum sum in nums. If multiple such pairs exist, choose the leftmost one.
    Replace the pair with their sum.

Return the minimum number of operations needed to make the array non-decreasing.

An array is said to be non-decreasing if each element is greater than or equal to its previous element (if it exists).

    1 <= nums.length <= 50
    -1000 <= nums[i] <= 1000

"""

# sorting algorithm
# length of the array will be very less so using my own sorting logic

from typing import List


def check_sort(num: List) -> bool:
    num_length = len(num)
    i = 0

    while i < num_length - 1:
        if not num[i] <= num[i + 1]:
            return False
        i += 1

    return True


# calling
# num = [5, 2, 3, 1]
# num = [5, 4, 23, 45, 35]
num = [1, 2, 2]
#
count = 0

if check_sort(num):
    print("Already asc: ", count)

while len(num) > 1:
    min_sum_pair = float("inf")
    where_to_replace_index = -1

    for i in range(0, len(num) - 1):
        sum_pair = num[i] + num[i + 1]
        if sum_pair < min_sum_pair:
            min_sum_pair = sum_pair
            where_to_replace_index = i

    num[where_to_replace_index] = min_sum_pair
    num.pop(where_to_replace_index + 1)
    count += 1

    if check_sort(num):
        break

print("No of counts needed: ", count)
