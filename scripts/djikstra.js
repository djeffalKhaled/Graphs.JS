console5 = document.getElementById("Console5");
function getInputValue() {
    // Get the input element by its ID
    var inputElement = document.getElementById('djikstrainpt');
    // Get the value of the input element
    var inputValue = inputElement.value;
    console.log(inputValue);
    return inputValue;
}

function callDjisktra() {
    var r = getInputValue();
    djikstraResults = dijkstra(sommets, EdgeValues, poids, r);
    console.log(djikstraResults[0]);
    console.log(djikstraResults[1]);
    console.log(djikstraResults[2]);

}


function dijkstra(sommets, EdgeValues, poids, r) {
    let n = sommets.length;
    let pi = new Array(n).fill(Infinity); // Initialize distances with Infinity
    let S = new Set(); // Set of vertices which are the terminal extremity of a path starting from r
    let f = new Array(n).fill(null); // Array to store the nodes in the order of their shortest path weight

    pi[r] = 0; // The distance from the source to itself is 0
    S.add(r);
    f[0] = r;

    let k = 1;

    while (k < n && Math.min(...pi.filter((_, idx) => !S.has(idx))) < Infinity) {
        for (let i = 0; i < EdgeValues.length; i += 2) {
            let u_start = EdgeValues[i];
            let u_end = EdgeValues[i + 1];
            if (u_start === f[k - 1] && !S.has(u_end)) {
                let x = u_end;
                if (pi[x] > pi[f[k - 1]] + poids[u_end]) {
                    pi[x] = pi[f[k - 1]] + poids[u_end];
                }
            }
        }

        let minPi = Infinity;
        let minIndex = -1;
        for (let i = 0; i < pi.length; i++) {
            if (!S.has(i) && pi[i] < minPi) {
                minPi = pi[i];
                minIndex = i;
            }
        }

        if (minIndex === -1) break;

        f[k] = minIndex;
        S.add(minIndex);
        k++;
    }
    console.log("pi: ", pi);
    console.log("s: ", S);
    console.log("f:", f);

    return { pi, S, f };
}