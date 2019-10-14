const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

//Network of raods from a graph

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
      if (graph[from] == null) {
        graph[from] = [to];
      } else {
        graph[from].push(to);
      }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
const roadGraph = buildGraph(roads);
/* 
{ 'Alice\'s House': [ 'Bob\'s House', 'Cabin', 'Post Office' ],
  'Bob\'s House': [ 'Alice\'s House', 'Town Hall' ],
  Cabin: [ 'Alice\'s House' ],
  'Post Office': [ 'Alice\'s House', 'Marketplace' ],
  'Town Hall': [ 'Bob\'s House', 'Daria\'s House', 'Marketplace', 'Shop' ],
  'Daria\'s House': [ 'Ernie\'s House', 'Town Hall' ],
  'Ernie\'s House': [ 'Daria\'s House', 'Grete\'s House' ],
  'Grete\'s House': [ 'Ernie\'s House', 'Farm', 'Shop' ],
  Farm: [ 'Grete\'s House', 'Marketplace' ],
  Shop: [ 'Grete\'s House', 'Marketplace', 'Town Hall' ],
  Marketplace: [ 'Farm', 'Post Office', 'Shop', 'Town Hall' ] }
*/ 


class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    move(destination) {
        //If destination is not one road away we stay still
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else {
          console.log(this.parcels);
        let parcels = this.parcels.map(p => {
          console.log(p);
          //Fail safe? Check later?
          if (p.place != this.place) return p;
          //Changing place to destination
          return {place: destination, address: p.address};
        //Filter, dropping off the parcels
        }).filter(p => {
            console.log(p);
            return p.place != p.address;
        });

        return new VillageState(destination, parcels);
      }
    }
  }

let first = new VillageState(
"Post Office",
[{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office