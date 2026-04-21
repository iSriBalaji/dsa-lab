def factorial_linear(n):
    if n == 0:
        return 1
    return n * factorial_linear(n-1)

linear = factorial_linear(5)
print(linear)