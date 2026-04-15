def countdown(n):
    if n==0:
        print("Calculated all the students numbers")
    else:
        print(f"Prologue - {n}")
        countdown(n-1)
        print(f"Epilogue - {n}")

countdown(10)