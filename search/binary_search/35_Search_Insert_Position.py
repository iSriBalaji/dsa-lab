class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:

        length = len(nums)
        left = 0
        right = length-1
        
        print(nums)
        print(target)

        while left<right:

            mid = (left+right)//2
            
            print(f"Left = {left} Right = {right} Mid = {mid}")

            if nums[mid] == target:
                return mid
            
            elif nums[mid] < target:
                left = mid + 1
            
            elif nums[mid] > target:
                right = mid - 1
        
        return mid

s = Solution()
print(s.searchInsert([1,3,5,6], 5))
print(s.searchInsert([1,3,5,6], 4))