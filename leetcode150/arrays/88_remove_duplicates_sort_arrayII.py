class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        length = len(nums)
        current_count = 0
        left, right = 0, 0
        # l_stack = []
        current_tracking = nums[right]

        while right < length:
            if current_tracking == nums[right]:
                # print("Normal right increase")
                current_count += 1
                right += 1
            else:
                # print(f"Inside left: {left}")
                if current_count >= 2:
                    left += 2
                else:
                    left += 1
                # print(f"Inside left after: {left}")
                while left != right:
                    nums[left] = None
                    # l_stack.append(left)
                    left += 1
                current_tracking = nums[right]
                current_count = 0

            # if right < length:
            #     print(f"Left: {left}|{nums[left]} and Right: {right}|{nums[right]}")
            #     print(f"Nums: {nums}")
            #     print(f"Current Tracking: {current_tracking}")
            #     print(f"Current Count: {current_count}")
            #     print(f'**'*5)

        # print(f"Final: {nums}")

        if (
            current_count >= 2
        ):  # special case for element repeating at the end [1,1,1] or [1,2,2,2]
            left += 2

            while left != right:
                nums[left] = None
                left += 1

        index = 0
        k = 0
        k_stack = []
        while index < length:
            # print(f"Index: {index}")
            if nums[index] == None:
                # print(f"None Index: {nums[index]}")
                k_stack.append(index)
            else:
                # print(f"Element Index: {nums[index]}")
                if len(k_stack) > 0:
                    last_index = k_stack.pop(0)
                    nums[last_index] = nums[index]
                    k_stack.append(index)
                k += 1

            # print(f"NUMS: {nums}")
            # print(f"k_stack: {k_stack}")
            # print("******"*6)
            index += 1

        # print(f"Final2: {nums}")
        # print(k)
        return k
