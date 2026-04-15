# example of the adjacency matric to implement in the logic below
#      A  B  C  D
#    +------------
#  A | 0  1  1  1
#  B | 1  0  1  0
#  C | 1  1  0  0
#  D | 1  0  0  0
# 
# here there is no direction are weight, we just have the data which vertex is connected to which vertex

vertexes = ['A','B','C','D']

adjacency_matrix = [
    [0,1,1,1],
    [1,0,1,0],
    [1,1,0,0],
    [1,0,0,0]
]

def print_matrix(matrix):
    for row in matrix:
        print(row)

def print_connections(matrix, vertexes):
    for i in range(0,len(vertexes)):
        print(vertexes[0], end = ':')
        
        for j in range(0,len(adjacency_matrix)):
            if adjacency_matrix[i][j] == 1:
                print(vertexes[j], end = ',')
        print()
            
            

print(vertexes)
print_matrix(adjacency_matrix)

print_connections(adjacency_matrix, vertexes)
