# class based graph implemetation
# we are using same adjacency matrix here as well
# adjacency_matrix_class_based.png used this graph structure


class Graph:
    def __init__(self, size_of_graph):
        self.adjacency_matrix = [[0]*size_of_graph  for i in range(size_of_graph)]
        self.vertexes = [0] * size_of_graph
        self.size = size_of_graph
    
    def add_vertex(self, index, data):
        if index < self.size and index >=0:
            self.vertexes[index] = data
        
        print("current vertex: ", self.vertexes)
    
    def add_edge(self, u, v):
        if u<self.size and u>=0 and 0<= v < self.size:
            self.adjacency_matrix[u][v] = 1
            self.adjacency_matrix[v][u] = 1
        
        print("current edge: ", self.adjacency_matrix)
    
    def print_connections(self):
        for i in range(0,len(self.vertexes)):
            print(self.vertexes[i], end = ':')
            
            for j in range(0,len(self.adjacency_matrix)):
                if self.adjacency_matrix[i][j] == 1:
                    print(self.vertexes[j], end = ',')
            print()

gp = Graph(5)
gp.add_vertex(0, 'A')
gp.add_vertex(1, 'B')
gp.add_vertex(2, 'C')
gp.add_vertex(3, 'D')
gp.add_vertex(4, 'E')

gp.add_edge(0, 1)
gp.add_edge(0, 4)
gp.add_edge(4, 1)
gp.add_edge(4, 3)
gp.add_edge(1, 3)
gp.add_edge(1, 2)
gp.add_edge(3, 2)

gp.print_connections()