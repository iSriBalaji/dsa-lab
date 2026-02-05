## Graph Traversal

### One liner - algorithm to visit each node in the graph

We have 2 ways of traversal
1) Depth first search
2) Breadth first search

## DFS
### Main Idea - you are in a maze, instead of looking at every path we have at once, we pick one direction and keep walking as far as you can until you hit a dead end, when we cant go further we backtrack to last turn or node and from there we explore a different path

#### Reference Video: https://www.youtube.com/watch?v=PMMc4VsIacU

Main moto: instead of checking all connected nodes of a node we select one node and traverse immedicately to it
can be implemented in two ways technically with Recursion and stack
Recursion code is much simplier and Stack implementation is more generalized

### Preorder and Postorder DFS traversal

