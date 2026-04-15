## Graph

### Key points
it is a non linear data structure
shows pairs relationships between pairs of object
they have two main components - vertex(node) and the edge
vertex is the fundamental unit it can be a person, place etc. edge is the connection between two nodes

### Other core concepts - Other than Vertex and edge
1. Degree - no of edges connected to a vertex
2. path - sequence of edges connects to a sequence of vertex that forms a path and connection flow
3. cycles - it is a path where the starting and the ending vertices are the same

### Types - graph
1. Directed and undirected:
Directed - edges have a direction eg: twitter or instagram follow, we follow specific people and they might not follow us
Undirected - here the connection is mutual eg: facebook connections are mutual in both sides or linkedin connections

2. Weighted and unweighted
Weighted - edges will have a value, it can represent the cost, distance, time or a metric
Unweighted - doesnt have any weights there

3. Cyclic and Acyclic
Cyclic - as we saw above start and end node are match and its a cycle
Acyclic - this is linear eg: DAG directed acyclic graph that we use in many scheduling, data pipelines like airflow

### Traversing the graph
#### Breadth first search:
It uses Queue
Best for finding the shortest path in a unweighted graph
If its shortest path in the weighted graph we need algorithm like djikstra algorithm, bellman ford etc

#### Depth first search:
It uses Stack or recursion
Best for finding cycles and topological sorting

#### Example:
these are just simple representaion but we need nodes like we do in linked list for complex and large data
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

weighted_graph = {
    'A': [('B', 5), ('C', 2)],
    'B': [('A', 5), ('D', 10)],
    'C': [('A', 2), ('D', 1)],
    'D': [('B', 10), ('C', 1)]
}

Unweighted: Use a list of neighbors: {'A': ['B', 'C']}
Weighted: Use a list of tuples (neighbor, weight): {'A': [('B', 5)]}

## From w3 schools
1. graphs can have objects and relationsips and algorithms can suggestion the potential friends, sortest path, suggestions based on it
2. Some examples are social networks, maps where bus stops and locations are vertices or nodes and the roads are edges there, internet with sites as verticies and the hyperlinks as edges etc,
3. easy way to remember types - weighted, connected, directed, cyclic, loop-self loop
4. adjacency matrix is a easy, basic way to understand the graph, but this cover lot of space have space allocated wven if there is no value there - explaination in the dsa page w3
5. adjacency list graph have only the list of vertices in the graph. it kind of sparse where it saves a lot of memory there
6. 
