console4 = document.getElementById("Console4");

function prim_CalculateTree() {
    var minimumSpanningTree = prim(sommets, EdgeValues, poids);
    var strMST = "";
    minimumSpanningTree.forEach(MSTarray => {
        strMST += '(' + MSTarray.join(',') + ')';
        console.log("MSTarray", MSTarray);
        console.log("strMST", strMST);
    });
    
    console4.textContent = strMST;
    console.log("Calculated Minimum Spanning Tree using Prim:", minimumSpanningTree);
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

function prim(nodes, edges, weights) {
    const numNodes = nodes.size;
    const MST = new Set(); // Minimum Spanning Tree
    const visited = new Set(); // Visited nodes
    const startingNode = nodes.values().next().value; // Start from the first node
    const pq = new PriorityQueue(); // Priority queue for edges

    visited.add(startingNode);

    // Add all edges incident to the starting node to the priority queue
    for (let i = 0; i < edges.length; i += 2) {
        const [node1, node2] = [edges[i], edges[i + 1]];
        if (node1 === startingNode || node2 === startingNode) {
            const weight = weights[i / 2];
            pq.enqueue([node1, node2], weight);
        }
    }

    // Main loop
    while (!pq.isEmpty()) {
        const [node1, node2] = pq.dequeue();
        if (!(visited.has(node1) && visited.has(node2))) {
            MST.add([node1, node2]);
            const newNode = visited.has(node1) ? node2 : node1;
            visited.add(newNode);
            // Add edges incident to the newly visited node to the priority queue
            for (let i = 0; i < edges.length; i += 2) {
                const [edgeNode1, edgeNode2] = [edges[i], edges[i + 1]];
                if (edgeNode1 === newNode || edgeNode2 === newNode) {
                    const weight = weights[i / 2];
                    pq.enqueue([edgeNode1, edgeNode2], weight);
                }
            }
        }
    }

    return MST;
}



