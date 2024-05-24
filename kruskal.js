console4 = document.getElementById("Console4");

function kruskal_CalculateTree() {
    var minimumSpanningTree = kruskal(sommets, EdgeValues, poids);
    var strMST = "";
    minimumSpanningTree.forEach(MSTarray => {
        strMST += '(' + MSTarray.join(',') + ')';
        console.log("MSTarray", MSTarray);
        console.log("strMST", strMST);
    });
    
    console4.textContent = strMST;
    console.log("Calculated Minimum Spanning Tree using Prim:", minimumSpanningTree);
}

class DisjointSet {
    constructor(size) {
        this.parent = Array(size).fill(null).map((_, index) => index);
        this.rank = Array(size).fill(0);
    }

    find(node) {
        if (this.parent[node] !== node) {
            this.parent[node] = this.find(this.parent[node]);
        }
        return this.parent[node];
    }

    union(node1, node2) {
        const root1 = this.find(node1);
        const root2 = this.find(node2);

        if (root1 !== root2) {
            if (this.rank[root1] < this.rank[root2]) {
                this.parent[root1] = root2;
            } else if (this.rank[root1] > this.rank[root2]) {
                this.parent[root2] = root1;
            } else {
                this.parent[root2] = root1;
                this.rank[root1]++;
            }
        }
    }
}

function kruskal(nodes, edges, weights) {
    const numNodes = nodes.size;
    const MST = [];
    const disjointSet = new DisjointSet(numNodes);

    const sortedEdges = [];
    for (let i = 0; i < edges.length; i += 2) {
        sortedEdges.push([edges[i], edges[i + 1], weights[i / 2]]);
    }
    sortedEdges.sort((a, b) => a[2] - b[2]);

    for (const edge of sortedEdges) {
        const [node1, node2, weight] = edge;
        if (disjointSet.find(node1) !== disjointSet.find(node2)) {
            MST.push([node1, node2]);
            disjointSet.union(node1, node2);
        }
    }

    return MST;
}