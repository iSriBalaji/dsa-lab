# C++ + DSA + FAANG Coding Interview Master Plan

**Primary timeline:** August 24, 2026 → January 22, 2027  
**Buffer month:** January 25, 2027 → February 23, 2027  
**Default study days:** Monday–Friday  
**Saturday:** Catch-up only when needed  
**Sunday:** Off  
**Target workload:** ~3 focused hours/day, ~15 hours/week

> **Goal:** Become genuinely fluent in interview-relevant modern C++, master core data structures and algorithms, learn the major coding-interview patterns, complete the LeetCode Top Interview 150 target set, and become capable of handling unfamiliar FAANG-style coding questions with a structured process.

> **Reality check:** No serious plan can guarantee that you will solve *any* possible FAANG problem. The realistic target is stronger: independently solve most standard interview mediums, make meaningful progress on unfamiliar hards, recognize the major patterns, write clean C++, reason about complexity, test edge cases, and explain your solution clearly under time pressure.

---

## 1. What counts as completion

By **January 22, 2027**, aim to have:

- [ ] LearnCpp Chapters **0–22** completed at interview-relevant depth.
- [ ] LearnCpp Chapters **23–28** covered selectively for conceptual fluency.
- [ ] Design Gurus **Grokking Data Structures & Algorithms for Coding Interviews** core curriculum completed.
- [ ] All major pattern families in **Grokking the Coding Interview** completed.
- [ ] **LeetCode Top Interview 150: 150/150 attempted and reviewed in C++**.
- [ ] At least **12 core data structures/algorithms implemented from scratch**.
- [ ] At least **50 important problems re-solved** without looking at the prior solution.
- [ ] At least **15 timed interview-style sessions/mocks** by the end of the buffer month.
- [ ] A concise personal pattern cheat sheet and mistake log.

### Why this is structured this way

Do **not** study in the sequence `finish all C++ → finish all DSA → finish all patterns → finally do LeetCode`. Instead, use:

```text
Learn C++ concept
      ↓
Learn the matching DSA concept
      ↓
Implement it yourself
      ↓
Learn the interview pattern
      ↓
Solve LeetCode in C++
      ↓
Review / re-solve
```

This is the central design of the plan.

---

## 2. Resource rules

### LearnCpp

Primary C++ curriculum: **https://www.learncpp.com/**

Use LearnCpp for language understanding. Do the quizzes and exercises when they reveal a weak concept, but do not turn every lesson into a perfectionist detour.

**Priority:**

1. Chapters 0–12 — foundation, functions, types, references and pointers.
2. Chapters 13–20 — structs/classes, vectors/arrays, iterators, allocation, recursion and lambdas.
3. Chapters 21–22 — copying, move semantics and smart pointers.
4. Chapters 23–28 — important C++ breadth, but lower priority than DSA/LeetCode for this five-month interview project.

### Design Gurus — DSA

Primary DSA curriculum: **https://www.designgurus.io/course/grokking-data-structures-for-coding-interviews**

Complete the course by **topic**, not by blindly following public chapter numbers. The course is updated over time. When this plan says `Linked Lists`, complete the current Linked List module in your enrolled course.

### Design Gurus — Coding Patterns

Primary pattern curriculum: **https://www.designgurus.io/course/grokking-the-coding-interview**

The course is actively updated and its public pages can show different pattern counts. Treat the pattern names in your current enrolled course as canonical. This plan covers the core families you must know for interviews.

### LeetCode

Canonical target: **https://leetcode.com/studyplan/top-interview-150/**

All scheduled LeetCode work in this plan is done in **C++**. If LeetCode changes the official Top Interview 150 list later, prefer the current official LeetCode study plan and use this document's mapping as the study schedule.

---

## 3. Normal weekly operating system

### Monday–Thursday — ~3 hours/day

- **60 min:** LearnCpp / Design Gurus theory.
- **90 min:** LeetCode or course problems in C++.
- **30 min:** implementation, review, notes, or re-solving yesterday's weak problem.

### Friday — interview/review day

- **45 min:** timed problem #1.
- **45 min:** timed problem #2 or re-solve.
- **30 min:** explain both solutions aloud, including brute force and optimized complexity.
- **60 min:** weekly review, mistake log, and unfinished quota.

Starting around Week 8, Friday should increasingly resemble a real interview: no solution, no editorial, no AI, no autocomplete dependency.

### Saturday — buffer, not a normal study day

- If the week is complete: **OFF**.
- If behind by ≤3 hours: use Saturday for 2–4 focused hours.
- If behind by more than one full week: do **not** try to marathon everything. Follow the recovery rules later in this document.

### Sunday

**OFF.** Recovery is part of the plan.

---

## 4. Problem status system

Mark every LeetCode problem:

- **GREEN** — independently solved with a correct/near-optimal approach in ≤30–35 minutes.
- **YELLOW** — solved, but needed a hint, took too long, had implementation trouble, or missed the best approach.
- **RED** — could not derive the solution.

### Review schedule

For **YELLOW**:

`re-solve in 7 days → re-solve again in ~30 days`

For **RED**:

`study solution → close it → reproduce from understanding → next day → 7 days → ~30 days`

> A problem is not mastered because you understood the editorial. It is mastered when you can reconstruct the idea later without seeing the solution.

---

## 5. 22-week primary plan

## Week 1 — Aug 24–28, 2026

### Primary goal: C++ setup and programming foundations

**LearnCpp**

Chapters 0–2: setup, compiling, program structure, variables, I/O, functions, parameters, scope, namespaces, headers, multi-file programs.

**Design Gurus / DSA**

None yet. Protect this week for C++ fundamentals.

**Interview patterns**

None.

**Implementation / hands-on**

- [ ] Calculator, temperature converter, prime checker, Fibonacci, and a small multi-file CLI program.

**LeetCode target: 0 problems**

- No required LeetCode this week. Build the C++ foundation properly.

**Friday checkpoint**

- [ ] Compile from the terminal; create functions without copying syntax; explain declaration vs definition; use headers correctly.

---

## Week 2 — Aug 31–Sep 4, 2026

### Primary goal: Core C++ language fluency

**LearnCpp**

Chapters 3–8: debugging, fundamental types, const/constexpr, strings/string_view, operators, scope/lifetime/linkage, control flow and loops.

**Design Gurus / DSA**

Optional preview: complexity vocabulary only.

**Interview patterns**

None.

**Implementation / hands-on**

- [ ] Number guessing game, string utilities, frequency counter, and 10 short loop/function exercises.

**LeetCode target: 0 problems**

- No required LeetCode this week. Build the C++ foundation properly.

**Friday checkpoint**

- [ ] Use debugger/breakpoints; confidently write loops, conditions, strings, const variables and basic functions.

---

## Week 3 — Sep 7–11, 2026

### Primary goal: Functions/templates + complexity analysis; begin LeetCode

**LearnCpp**

Chapters 9–11: testing/assertions, conversions, type deduction/auto, overloads, default arguments, function templates.

**Design Gurus / DSA**

Complexity / Big-O module. Learn time vs space, common growth rates, amortized analysis, and how to analyze loops.

**Interview patterns**

Basic array scanning and hashing intuition.

**Implementation / hands-on**

- [ ] Write functions using overloads/templates; manually analyze 10 snippets for Big-O.

**LeetCode target: 4 problems**

- [ ] **#1 — Merge Sorted Array**
- [ ] **#2 — Remove Element**
- [ ] **#3 — Remove Duplicates from Sorted Array**
- [ ] **#5 — Majority Element**

**Friday checkpoint**

- [ ] For every solved problem, state brute force, optimized approach, time complexity and space complexity.

---

## Week 4 — Sep 14–18, 2026

### Primary goal: Pointers/references + arrays

**LearnCpp**

Chapter 12 in depth: lvalues/rvalues, references, const references, pointers, nullptr, pointer constness, pass-by-reference/address, return by reference/address, std::optional.

**Design Gurus / DSA**

Arrays module.

**Interview patterns**

Array traversal, in-place modification, greedy basics.

**Implementation / hands-on**

- [ ] Simplified dynamic array; pointer/reference drills; trace addresses and object lifetimes on paper.

**LeetCode target: 6 problems**

- [ ] **#4 — Remove Duplicates from Sorted Array II**
- [ ] **#6 — Rotate Array**
- [ ] **#7 — Best Time to Buy and Sell Stock**
- [ ] **#8 — Best Time to Buy and Sell Stock II**
- [ ] **#9 — Jump Game**
- [ ] **#10 — Jump Game II**

**Friday checkpoint**

- [ ] Explain pointer vs reference, pass-by-value vs const reference, nullptr, and why dangling references/pointers are dangerous.

---

## Week 5 — Sep 21–25, 2026

### Primary goal: Structs/classes + arrays/strings/two pointers

**LearnCpp**

Chapters 13–14: enums/structs, classes, encapsulation, constructors, initializer lists, copy constructor, explicit.

**Design Gurus / DSA**

Arrays and Strings; begin searching/sorting concepts if included in your current course.

**Interview patterns**

Two Pointers, prefix/frequency ideas.

**Implementation / hands-on**

- [ ] Create small class types; write custom comparison helpers; implement two-pointer templates.

**LeetCode target: 8 problems**

- [ ] **#11 — H-Index**
- [ ] **#12 — Insert Delete GetRandom O(1)**
- [ ] **#13 — Product of Array Except Self**
- [ ] **#14 — Gas Station**
- [ ] **#17 — Roman to Integer**
- [ ] **#18 — Integer to Roman**
- [ ] **#25 — Valid Palindrome**
- [ ] **#26 — Is Subsequence**

**Friday checkpoint**

- [ ] Given a sorted-array problem, identify when two pointers are better than nested loops.

---

## Week 6 — Sep 28–Oct 2, 2026

### Primary goal: std::vector + sliding window

**LearnCpp**

Chapters 15–16: destructors/class details and std::vector. Prioritize vector construction, indexing, iteration, resizing/capacity, passing/returning vectors.

**Design Gurus / DSA**

Dynamic arrays / arrays and string problems.

**Interview patterns**

Sliding Window; fixed vs variable windows.

**Implementation / hands-on**

- [ ] Vector-based utility library; implement fixed-size and variable-size sliding-window templates.

**LeetCode target: 8 problems**

- [ ] **#19 — Length of Last Word**
- [ ] **#20 — Longest Common Prefix**
- [ ] **#21 — Reverse Words in a String**
- [ ] **#22 — Zigzag Conversion**
- [ ] **#23 — Find the Index of the First Occurrence in a String**
- [ ] **#27 — Two Sum II - Input Array Is Sorted**
- [ ] **#30 — Minimum Size Subarray Sum**
- [ ] **#31 — Longest Substring Without Repeating Characters**

**Friday checkpoint**

- [ ] Recognize substring/subarray constraints that can be maintained incrementally with a window.

---

## Week 7 — Oct 5–9, 2026

### Primary goal: Arrays/pointer arithmetic + linked lists

**LearnCpp**

Chapter 17: std::array, C-style arrays, array decay, pointer arithmetic, multidimensional arrays. Do not over-invest in C strings.

**Design Gurus / DSA**

Linked Lists module.

**Interview patterns**

Fast & Slow Pointers; In-place Reversal of a Linked List.

**Implementation / hands-on**

- [ ] SinglyLinkedList and DoublyLinkedList: insert, delete, search, reverse.

**LeetCode target: 8 problems**

- [ ] **#57 — Linked List Cycle**
- [ ] **#58 — Add Two Numbers**
- [ ] **#59 — Merge Two Sorted Lists**
- [ ] **#60 — Copy List with Random Pointer**
- [ ] **#61 — Reverse Linked List II**
- [ ] **#63 — Remove Nth Node From End of List**
- [ ] **#64 — Remove Duplicates from Sorted List II**
- [ ] **#66 — Partition List**

**Friday checkpoint**

- [ ] Reverse a linked list from memory and explain every pointer mutation.

---

## Week 8 — Oct 12–16, 2026

### Primary goal: STL algorithms + stacks/queues

**LearnCpp**

Chapter 18 plus practical STL algorithms: iterators, sort, find, lower_bound/upper_bound; learn stack, queue and deque interfaces.

**Design Gurus / DSA**

Stack and Queue modules.

**Interview patterns**

Stack, Monotonic Stack, expression evaluation, linked-list reversal reinforcement.

**Implementation / hands-on**

- [ ] Implement Stack and Queue yourself, then solve equivalent tasks with std::stack/std::queue.

**LeetCode target: 8 problems**

- [ ] **#52 — Valid Parentheses**
- [ ] **#53 — Simplify Path**
- [ ] **#54 — Min Stack**
- [ ] **#55 — Evaluate Reverse Polish Notation**
- [ ] **#56 — Basic Calculator**
- [ ] **#62 — Reverse Nodes in k-Group**
- [ ] **#65 — Rotate List**
- [ ] **#67 — LRU Cache**

**Friday checkpoint**

- [ ] Know when a monotonic stack turns an O(n²) nearest-greater/smaller search into O(n).

---

## Week 9 — Oct 19–23, 2026

### Primary goal: Hash tables and associative STL containers

**LearnCpp**

Practical STL focus: unordered_map, map, unordered_set, set, pair, tuple, custom hash/comparator basics. Use cppreference as needed.

**Design Gurus / DSA**

Hash Table / Hashing module.

**Interview patterns**

Hashing, frequency maps, set membership.

**Implementation / hands-on**

- [ ] Simplified hash table using separate chaining; experiment with collisions and load factor.

**LeetCode target: 8 problems**

- [ ] **#39 — Ransom Note**
- [ ] **#40 — Isomorphic Strings**
- [ ] **#41 — Word Pattern**
- [ ] **#42 — Valid Anagram**
- [ ] **#43 — Group Anagrams**
- [ ] **#44 — Two Sum**
- [ ] **#45 — Happy Number**
- [ ] **#46 — Contains Duplicate II**

**Friday checkpoint**

- [ ] Explain average O(1) vs worst-case behavior and when ordered map/set is worth O(log n).

---

## Week 10 — Oct 26–30, 2026

### Primary goal: Memory + recursion + matrix/interval foundations

**LearnCpp**

Chapters 19–20: new/delete, dynamic arrays, stack vs heap, recursion, lambdas. Understand manual allocation mainly to understand ownership; prefer RAII in real code.

**Design Gurus / DSA**

Recursion plus Matrix/Interval-related lessons available in the DSA/pattern courses.

**Interview patterns**

Recursion, Matrix Traversal, Merge Intervals.

**Implementation / hands-on**

- [ ] Recursive tree-like exercises; matrix traversal helpers; interval merge from scratch.

**LeetCode target: 8 problems**

- [ ] **#34 — Valid Sudoku**
- [ ] **#35 — Spiral Matrix**
- [ ] **#36 — Rotate Image**
- [ ] **#37 — Set Matrix Zeroes**
- [ ] **#38 — Game of Life**
- [ ] **#47 — Longest Consecutive Sequence**
- [ ] **#48 — Summary Ranges**
- [ ] **#49 — Merge Intervals**

**Friday checkpoint**

- [ ] Trace a recursive call stack and explain stack vs heap without hand-waving.

---

## Week 11 — Nov 2–6, 2026

### Primary goal: Binary trees I

**LearnCpp**

Maintenance only: 20–30 min/day reviewing references, pointers, classes and vectors through DSA code.

**Design Gurus / DSA**

Trees / Binary Trees module.

**Interview patterns**

Tree DFS: preorder, inorder, postorder; recursive tree decomposition.

**Implementation / hands-on**

- [ ] BinaryTree with traversals, height, node count and recursive search.

**LeetCode target: 8 problems**

- [ ] **#68 — Maximum Depth of Binary Tree**
- [ ] **#69 — Same Tree**
- [ ] **#70 — Invert Binary Tree**
- [ ] **#71 — Symmetric Tree**
- [ ] **#72 — Construct Binary Tree from Preorder and Inorder Traversal**
- [ ] **#73 — Construct Binary Tree from Inorder and Postorder Traversal**
- [ ] **#74 — Populating Next Right Pointers in Each Node II**
- [ ] **#75 — Flatten Binary Tree to Linked List**

**Friday checkpoint**

- [ ] Write preorder/inorder/postorder recursively without notes; explain O(n) traversal cost.

---

## Week 12 — Nov 9–13, 2026

### Primary goal: Binary trees II + BST

**LearnCpp**

Maintenance: classes, ownership and iterators as they appear in tree code.

**Design Gurus / DSA**

Binary Search Tree module.

**Interview patterns**

BST invariants, Tree DFS, LCA, construction from traversals.

**Implementation / hands-on**

- [ ] BST insert, search, delete, min/max, predecessor/successor.

**LeetCode target: 8 problems**

- [ ] **#76 — Path Sum**
- [ ] **#77 — Sum Root to Leaf Numbers**
- [ ] **#78 — Binary Tree Maximum Path Sum**
- [ ] **#79 — Binary Search Tree Iterator**
- [ ] **#80 — Count Complete Tree Nodes**
- [ ] **#81 — Lowest Common Ancestor of a Binary Tree**
- [ ] **#86 — Minimum Absolute Difference in BST**
- [ ] **#87 — Kth Smallest Element in a BST**

**Friday checkpoint**

- [ ] Explain why inorder traversal of a BST is sorted and derive BST validation correctly.

---

## Week 13 — Nov 16–20, 2026

### Primary goal: Tree BFS + heaps

**LearnCpp**

STL priority_queue and comparator practice.

**Design Gurus / DSA**

Heap / Priority Queue module.

**Interview patterns**

Tree BFS, Top K Elements, Two Heaps.

**Implementation / hands-on**

- [ ] Binary heap with push/pop/heapify; compare against std::priority_queue.

**LeetCode target: 8 problems**

- [ ] **#82 — Binary Tree Right Side View**
- [ ] **#83 — Average of Levels in Binary Tree**
- [ ] **#84 — Binary Tree Level Order Traversal**
- [ ] **#85 — Binary Tree Zigzag Level Order Traversal**
- [ ] **#121 — Kth Largest Element in an Array**
- [ ] **#122 — IPO**
- [ ] **#123 — Find K Pairs with Smallest Sums**
- [ ] **#124 — Find Median from Data Stream**

**Friday checkpoint**

- [ ] Derive heap operation complexities and explain when a heap beats full sorting.

---

## Week 14 — Nov 23–27, 2026

### Primary goal: Graphs I — representation, DFS/BFS, dependencies

**LearnCpp**

Use vector<vector<int>>, unordered_map and queue fluently in graph code.

**Design Gurus / DSA**

Graphs module.

**Interview patterns**

Graph DFS/BFS, Island/Matrix Traversal, Topological Sort.

**Implementation / hands-on**

- [ ] Adjacency list + adjacency matrix; BFS, DFS and topological sort.

**LeetCode target: 8 problems**

- [ ] **#88 — Validate Binary Search Tree**
- [ ] **#89 — Number of Islands**
- [ ] **#90 — Surrounded Regions**
- [ ] **#91 — Clone Graph**
- [ ] **#92 — Evaluate Division**
- [ ] **#93 — Course Schedule**
- [ ] **#94 — Course Schedule II**
- [ ] **#95 — Snakes and Ladders**

**Friday checkpoint**

- [ ] Detect cycles and decide BFS vs DFS based on the problem rather than habit.

---

## Week 15 — Nov 30–Dec 4, 2026

### Primary goal: Graphs II + Trie + Union-Find

**LearnCpp**

No major new chapter; reinforce object ownership and container selection.

**Design Gurus / DSA**

Trie and Disjoint Set/Union-Find material where available; continue graphs.

**Interview patterns**

Union Find, Trie, Graph BFS, K-way Merge / divide-and-conquer exposure.

**Implementation / hands-on**

- [ ] Trie and UnionFind (path compression + union by rank/size).

**LeetCode target: 8 problems**

- [ ] **#96 — Minimum Genetic Mutation**
- [ ] **#97 — Word Ladder**
- [ ] **#98 — Implement Trie (Prefix Tree)**
- [ ] **#99 — Design Add and Search Words Data Structure**
- [ ] **#100 — Word Search II**
- [ ] **#108 — Convert Sorted Array to Binary Search Tree**
- [ ] **#109 — Sort List**
- [ ] **#110 — Construct Quad Tree**

**Friday checkpoint**

- [ ] Implement Union-Find from memory and explain near-constant amortized behavior at interview level.

---

## Week 16 — Dec 7–11, 2026

### Primary goal: Advanced graph algorithms + divide & conquer + greedy/Kadane

**LearnCpp**

C++ maintenance only.

**Design Gurus / DSA**

Sorting/searching/graph algorithm lessons. Learn Dijkstra, shortest-path concepts, MST, Kruskal and Prim at interview depth.

**Interview patterns**

Divide & Conquer, Kadane, Greedy, Merge Intervals reinforcement.

**Implementation / hands-on**

- [ ] Dijkstra, Kruskal or Prim, merge sort, and Kadane from scratch.

**LeetCode target: 8 problems**

- [ ] **#111 — Merge k Sorted Lists**
- [ ] **#112 — Maximum Subarray**
- [ ] **#113 — Maximum Sum Circular Subarray**
- [ ] **#50 — Insert Interval**
- [ ] **#51 — Minimum Number of Arrows to Burst Balloons**
- [ ] **#15 — Candy**
- [ ] **#16 — Trapping Rain Water**
- [ ] **#28 — Container With Most Water**

**Friday checkpoint**

- [ ] Know the preconditions and failure cases of BFS shortest path vs Dijkstra vs Bellman-Ford conceptually.

---

## Week 17 — Dec 14–18, 2026

### Primary goal: Binary search mastery

**LearnCpp**

std::lower_bound, std::upper_bound, custom comparators and iterator arithmetic.

**Design Gurus / DSA**

Binary Search / searching module.

**Interview patterns**

Modified Binary Search; binary search on answer; rotated arrays.

**Implementation / hands-on**

- [ ] Write reusable binary-search templates for exact, lower-bound, upper-bound and answer-space search.

**LeetCode target: 8 problems**

- [ ] **#114 — Search Insert Position**
- [ ] **#115 — Search a 2D Matrix**
- [ ] **#116 — Find Peak Element**
- [ ] **#117 — Search in Rotated Sorted Array**
- [ ] **#118 — Find First and Last Position of Element in Sorted Array**
- [ ] **#119 — Find Minimum in Rotated Sorted Array**
- [ ] **#120 — Median of Two Sorted Arrays**
- [ ] **#29 — 3Sum**

**Friday checkpoint**

- [ ] Derive loop invariants and boundaries instead of memorizing one binary-search template.

---

## Week 18 — Dec 21–25, 2026

### Primary goal: Backtracking

**LearnCpp**

References, vector mutation, recursion and lambdas as used in backtracking.

**Design Gurus / DSA**

Backtracking / Subsets material.

**Interview patterns**

Subsets, combinations, permutations, choose-explore-unchoose.

**Implementation / hands-on**

- [ ] Generic backtracking skeleton; subsets, permutations and combinations from scratch.

**LeetCode target: 8 problems**

- [ ] **#101 — Letter Combinations of a Phone Number**
- [ ] **#102 — Combinations**
- [ ] **#103 — Permutations**
- [ ] **#104 — Combination Sum**
- [ ] **#105 — N-Queens II**
- [ ] **#106 — Generate Parentheses**
- [ ] **#107 — Word Search**
- [ ] **#32 — Substring with Concatenation of All Words**

**Friday checkpoint**

- [ ] Explain state, choices, constraints, base case and undo step for a new backtracking problem.

---

## Week 19 — Dec 28, 2026–Jan 1, 2027

### Primary goal: Dynamic Programming I

**LearnCpp**

No major new language material; write clean vectors/memo tables in C++.

**Design Gurus / DSA**

DP fundamentals / 1D DP material available in your courses.

**Interview patterns**

Memoization, tabulation, Fibonacci-style DP, 0/1-style state thinking.

**Implementation / hands-on**

- [ ] Implement memoized and bottom-up versions of 4 classic DP problems.

**LeetCode target: 7 problems**

- [ ] **#137 — Climbing Stairs**
- [ ] **#138 — House Robber**
- [ ] **#139 — Word Break**
- [ ] **#140 — Coin Change**
- [ ] **#141 — Longest Increasing Subsequence**
- [ ] **#24 — Text Justification**
- [ ] **#33 — Minimum Window Substring**

**Friday checkpoint**

- [ ] For a DP problem, explicitly identify state, transition, base cases and computation order.

---

## Week 20 — Jan 4–8, 2027

### Primary goal: Dynamic Programming II

**LearnCpp**

C++ maintenance; 2D vector and memory-layout awareness.

**Design Gurus / DSA**

2D DP, subsequence/string DP and knapsack-family concepts.

**Interview patterns**

Grid DP, sequence DP, string DP.

**Implementation / hands-on**

- [ ] LCS or edit-distance table, grid DP, LIS variants.

**LeetCode target: 7 problems**

- [ ] **#142 — Triangle**
- [ ] **#143 — Minimum Path Sum**
- [ ] **#144 — Unique Paths II**
- [ ] **#145 — Longest Palindromic Substring**
- [ ] **#146 — Interleaving String**
- [ ] **#147 — Edit Distance**
- [ ] **#148 — Best Time to Buy and Sell Stock III**

**Friday checkpoint**

- [ ] Translate a recursive recurrence into memoization and then tabulation.

---

## Week 21 — Jan 11–15, 2027

### Primary goal: Modern C++ ownership + advanced interview patterns

**LearnCpp**

Chapter 21 selectively; Chapter 22 thoroughly: shallow/deep copy, rvalue references, move constructors/assignment, std::move, unique_ptr, shared_ptr, weak_ptr.

**Design Gurus / DSA**

Finish every remaining core pattern module in your current Grokking course that has not been covered.

**Interview patterns**

Bit manipulation, advanced DP, Two Heaps/Top K/K-way Merge review, weak-pattern repair.

**Implementation / hands-on**

- [ ] Small RAII ownership exercise using unique_ptr; implement move-aware class if time allows.

**LeetCode target: 7 problems**

- [ ] **#149 — Best Time to Buy and Sell Stock IV**
- [ ] **#150 — Maximal Square**
- [ ] **#125 — Add Binary**
- [ ] **#126 — Reverse Bits**
- [ ] **#127 — Number of 1 Bits**
- [ ] **#128 — Single Number**
- [ ] **#129 — Single Number II**

**Friday checkpoint**

- [ ] Explain RAII, ownership, move semantics and why unique_ptr should usually be preferred over shared_ptr.

---

## Week 22 — Jan 18–22, 2027

### Primary goal: Finish syllabus + interview consolidation

**LearnCpp**

Selected Chapters 23–28: composition/relationships, inheritance, virtual functions, templates/classes, exceptions, I/O. Read for conceptual fluency; do not let low-interview-value details crowd out problem review.

**Design Gurus / DSA**

Complete unfinished DSA lessons and pattern lessons; create one-page pattern cue sheet.

**Interview patterns**

Full pattern review; no major new pattern.

**Implementation / hands-on**

- [ ] Re-implement two weak data structures from memory and do at least two timed mock sessions.

**LeetCode target: 7 problems**

- [ ] **#130 — Bitwise AND of Numbers Range**
- [ ] **#131 — Palindrome Number**
- [ ] **#132 — Plus One**
- [ ] **#133 — Factorial Trailing Zeroes**
- [ ] **#134 — Sqrt(x)**
- [ ] **#135 — Pow(x, n)**
- [ ] **#136 — Max Points on a Line**

**Friday checkpoint**

- [ ] 150/150 target complete; explain solutions aloud; identify weak areas for Month 6.

---

## 6. Month 6 — buffer and interview hardening

**Buffer window:** January 25 → February 23, 2027

The buffer month deliberately contains **no required new core syllabus**. Its job is to absorb real life and convert coverage into interview performance.

### Buffer Week 1 — Jan 25–29

- [ ] Finish any missed LearnCpp / Grokking sections.
- [ ] Finish any incomplete Top Interview 150 problems.
- [ ] Rank topics from weakest → strongest.
- [ ] Re-solve 10 RED/YELLOW problems.
- [ ] 2 timed interview sessions.

### Buffer Week 2 — Feb 1–5

- [ ] Repair the two weakest DSA topics.
- [ ] Re-implement 3 weak data structures without notes.
- [ ] Re-solve 10 RED/YELLOW problems.
- [ ] 3 timed interview sessions.
- [ ] Practice explaining brute-force → optimized reasoning aloud.

### Buffer Week 3 — Feb 8–12

- [ ] Pattern-recognition week: mixed unseen problems.
- [ ] Do not sort practice by topic before solving; force yourself to identify the pattern.
- [ ] Re-solve 10 RED/YELLOW problems.
- [ ] 3–4 timed interview sessions.
- [ ] Review C++ STL, ownership, references/pointers, comparators and common syntax.

### Buffer Week 4 — Feb 15–19

- [ ] Company-style mixed mocks.
- [ ] 4 timed interview sessions.
- [ ] Re-solve 10 high-value problems from memory.
- [ ] Review complexity, edge cases and testing habits.
- [ ] Finalize one-page pattern cue sheet.

### Final contingency — Feb 22–23

- [ ] Close any remaining gaps.
- [ ] No panic-grinding.
- [ ] One final mock + light review.

---

## 7. Core implementations you must do yourself

- [ ] Dynamic Array
- [ ] Singly Linked List
- [ ] Doubly Linked List
- [ ] Stack
- [ ] Queue
- [ ] Hash Table
- [ ] Binary Tree traversals
- [ ] Binary Search Tree
- [ ] Binary Heap
- [ ] Trie
- [ ] Graph adjacency list + BFS + DFS
- [ ] Union-Find / Disjoint Set
- [ ] LRU Cache
- [ ] Binary Search templates
- [ ] Merge Sort
- [ ] Dijkstra
- [ ] Kruskal or Prim

The goal is not to use these homemade versions in interviews. The goal is to understand what the STL and common abstractions are doing underneath.

---

## 8. Pattern mastery checklist

- [ ] Two Pointers
- [ ] Sliding Window
- [ ] Fast & Slow Pointers
- [ ] Prefix Sum / Frequency Counting
- [ ] Hashing
- [ ] Merge Intervals
- [ ] Cyclic Sort / index placement
- [ ] In-place Linked List Reversal
- [ ] Stack
- [ ] Monotonic Stack
- [ ] Tree DFS
- [ ] Tree BFS
- [ ] Graph DFS
- [ ] Graph BFS
- [ ] Island / Matrix Traversal
- [ ] Topological Sort
- [ ] Union-Find
- [ ] Trie
- [ ] Top K Elements
- [ ] Two Heaps
- [ ] K-way Merge
- [ ] Modified Binary Search
- [ ] Binary Search on Answer
- [ ] Subsets / Backtracking
- [ ] Divide & Conquer
- [ ] Greedy
- [ ] Kadane's Algorithm
- [ ] Bit Manipulation
- [ ] 1D Dynamic Programming
- [ ] 2D / Grid Dynamic Programming
- [ ] Sequence / String Dynamic Programming
- [ ] Shortest Path / Weighted Graph reasoning

For a pattern to count as mastered, you should be able to answer:

1. What clues suggest this pattern?
2. What invariant/state does the algorithm maintain?
3. What is the typical time/space complexity?
4. What common variations break the naive template?
5. Can I solve a fresh problem without being told the pattern first?

---

## 9. C++ interview-fluency checklist

- [ ] Functions, parameters, return values, overloads
- [ ] References and const references
- [ ] Pointers, nullptr and pointer constness
- [ ] Value semantics and object lifetime
- [ ] Stack vs heap
- [ ] RAII
- [ ] Classes, constructors and destructors
- [ ] Copy constructor / copy assignment concepts
- [ ] Move constructor / move assignment concepts
- [ ] std::move
- [ ] unique_ptr, shared_ptr, weak_ptr
- [ ] vector and array
- [ ] string / string_view basics
- [ ] stack, queue, deque
- [ ] priority_queue
- [ ] map / unordered_map
- [ ] set / unordered_set
- [ ] pair / tuple
- [ ] Iterators and range-based loops
- [ ] sort / find / lower_bound / upper_bound
- [ ] Custom comparators
- [ ] Lambdas
- [ ] Templates basics
- [ ] Recursion
- [ ] Exception/error-handling basics
- [ ] Basic file I/O / streams
- [ ] Inheritance and virtual functions at conceptual level
- [ ] Time/space implications of common STL operations

---

## 10. Interview problem-solving protocol

For every serious practice problem, train this sequence:

```text
1. Clarify the input / constraints
2. Work through a small example
3. State brute force
4. Analyze brute-force complexity
5. Identify structure / likely pattern
6. Derive the optimized algorithm
7. State the invariant or why it is correct
8. Code cleanly in C++
9. Test normal + edge cases
10. State final time and space complexity
```

Do not make silent coding your only practice mode. FAANG-style interviews evaluate how you reason and communicate as well as whether your final code works.

---

## 11. Missed-week recovery rules

### If you miss one weekday

Do not alter the schedule. Split the missed work across the next 2–3 weekdays or use Saturday.

### If you miss 2–3 weekdays

Use Saturday for the highest-value unfinished material. Defer optional LearnCpp details before deferring core DSA or required LeetCode.

### If you fall one full week behind

Do **not** double the next week's workload. Prioritize in this order:

1. Core DSA concept
2. Core C++ concept needed for that DSA
3. Required LeetCode problems
4. Grokking pattern examples
5. Optional/low-value LearnCpp details

Move the remaining material into Month 6.

### If a hard LeetCode problem consumes too much time

Use the 35–45 minute rule. If you have no productive path, study a structured hint/solution, reproduce it from understanding, mark RED/YELLOW, and schedule a re-solve. Spending four hours stuck on one hard problem is usually worse than learning the pattern properly.

---

## 12. Milestones

- [ ] **Sep 18, 2026:** Comfortable with core C++ syntax, references and pointers; LeetCode has begun.
- [ ] **Oct 30, 2026:** Comfortable with vector/string, classes, linked lists, stacks/queues, hashing, recursion and core STL.
- [ ] **Nov 27, 2026:** Comfortable with trees, BSTs, heaps and graph fundamentals.
- [ ] **Dec 18, 2026:** Major graph and binary-search concepts understood; pattern recognition noticeably stronger.
- [ ] **Jan 8, 2027:** Backtracking and dynamic programming are no longer mysterious; can derive states/transitions.
- [ ] **Jan 22, 2027:** Primary curriculum complete; Top Interview 150 target complete; transition to interview hardening.
- [ ] **Feb 23, 2027:** Buffer complete; weak areas repaired; repeated timed practice completed.

---

## 13. What FAANG-ready should mean at the end

You are ready for serious coding interviews when you can usually:

- [ ] Recognize likely patterns without being told the topic.
- [ ] Produce a reasonable brute-force solution quickly.
- [ ] Improve it using the constraints and data-structure properties.
- [ ] Choose vector/map/unordered_map/set/heap/queue/etc. deliberately.
- [ ] Write C++ without fighting basic syntax.
- [ ] Reason correctly about time and space complexity.
- [ ] Handle edge cases and test your code methodically.
- [ ] Explain your algorithm while coding.
- [ ] Solve most familiar-pattern mediums in ~20–35 minutes.
- [ ] Make structured progress on unfamiliar/hard problems rather than freezing.
- [ ] Reconstruct important solutions weeks later instead of memorizing code.

---

## 14. Weekly review template

Copy this at the end of every week:

```markdown
### Week __ Review

- Hours studied:
- LearnCpp completed:
- Design Gurus completed:
- LeetCode solved:
- GREEN:
- YELLOW:
- RED:
- Data structure implemented:
- Strongest topic:
- Weakest topic:
- Biggest mistake pattern:
- Problems to re-solve next week:
- Saturday catch-up needed? Yes / No
```

---

## 15. Source-of-truth links

- LearnCpp tutorial index: https://www.learncpp.com/
- Design Gurus — Grokking Data Structures & Algorithms for Coding Interviews: https://www.designgurus.io/course/grokking-data-structures-for-coding-interviews
- Design Gurus — Grokking the Coding Interview: https://www.designgurus.io/course/grokking-the-coding-interview
- LeetCode — Top Interview 150: https://leetcode.com/studyplan/top-interview-150/
- cppreference (reference, not a linear course): https://en.cppreference.com/

### Maintenance note

Online curricula evolve. If a course changes chapter numbering or adds/removes lessons, preserve this plan's **topic sequence and mastery criteria** rather than forcing an outdated chapter number. For LeetCode, the current official Top Interview 150 study plan should take precedence if its list changes.

---

## Final rule

> **Consistency beats heroic weekends.** The plan is designed around five weekdays. Saturday is insurance; Sunday is recovery. The objective is not merely to finish 150 checkboxes — it is to become able to derive solutions, explain them, implement them cleanly in C++, and reproduce the ideas later.
