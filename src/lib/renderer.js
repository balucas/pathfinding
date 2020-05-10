function process(json){
  let nodes = json.nodes;
  let edges = json.edges;

  var res = [];

  edges.forEach(el => {
    res.push(nodes[el[0]].x);
    res.push(nodes[el[0]].y);
    res.push(0);
    res.push(nodes[el[1]].x);
    res.push(nodes[el[1]].y);
    res.push(0);
  })

  return res; 
}

module.exports = process;
