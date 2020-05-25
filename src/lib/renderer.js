function createShader(gl, type, source){
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  //compile success
  if(success){
    return shader;
  }
  
  //compile failed
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader){
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  
  //compile success
  if(success){
    return program;
  }

  //compile failed
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

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

function renderMap(canvas, json){
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      var gl = canvas.getContext('webgl');

      if(!gl){
        alert('webgl not supported'); 
      }

      var test = process(json); 

      const vertexData = new Float32Array(test);
      console.log(vertexData.length);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      //createShader
      const vertexShader = createShader(gl, gl.VERTEX_SHADER, 
        `
        attribute vec3 position;

        void main() {

          gl_Position = vec4(position, 1);

        }
        `);

      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER,
        `
        void main(){

          gl_FragColor = vec4(1, 0, 0, 1);

        }
        `);

      
      const program = createProgram(gl, vertexShader, fragmentShader);

      const positionLocation = gl.getAttribLocation(program, `position`);

      gl.enableVertexAttribArray(positionLocation);

      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      gl.useProgram(program);
      gl.drawArrays(gl.LINES, 0, test.length/3);
}

module.exports = { process, renderMap };
