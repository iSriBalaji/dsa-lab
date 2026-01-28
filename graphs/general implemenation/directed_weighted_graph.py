# adjacency_matrix_class_based.png used this graph structure
# here we use the same graph structure to implement the directed and weighted graph
# copy pasting the entire code from adjacency matrix and updating the add edge weights logic
#


class Graph:
    def __init__(self, size_of_graph):
        self.adjacency_matrix = [[None] * size_of_graph for i in range(size_of_graph)]
        self.vertexes = [0] * size_of_graph
        self.size = size_of_graph

    def add_vertex(self, index, data):
        if index < self.size and index >= 0:
            self.vertexes[index] = data

        print("current vertex: ", self.vertexes)

    def add_edge(self, u, v, weight):
        if u < self.size and u >= 0 and 0 <= v < self.size:
            self.adjacency_matrix[u][v] = weight

        print("current edge: ", self.adjacency_matrix)

    def print_connections(self):
        for i in range(0, len(self.vertexes)):
            print(self.vertexes[i], end=":")

            for j in range(0, len(self.adjacency_matrix)):
                if self.adjacency_matrix[i][j]:
                    print(f"{self.vertexes[j]}({self.adjacency_matrix[i][j]})", end=",")
            print()


gp = Graph(5)
gp.add_vertex(0, "A")
gp.add_vertex(1, "B")
gp.add_vertex(2, "C")
gp.add_vertex(3, "D")
gp.add_vertex(4, "E")

gp.add_edge(0, 1, 17)
gp.add_edge(0, 4, 5)
gp.add_edge(4, 1, 23)
gp.add_edge(4, 3, 8)
gp.add_edge(1, 3, 7)
gp.add_edge(1, 2, 18)
gp.add_edge(3, 2, 23)

gp.print_connections()
