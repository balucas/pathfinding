<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<style>
  * { margin: 0; padding: 0; }
  body, html { height: 100%; }
  canvas {
    margin-top: -60px;
    width: 100%;
    height: 891px;
  }
</style>
<script>
import process from './lib/renderer';
import json from './lib/toronto.json';

export default {
  name: 'App',
  components: {
  },
  mounted(){
    this.runWebGL();
  }, 
  methods:
  {
    runWebGL(){
      const canvas = document.querySelector('canvas');
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      var gl = canvas.getContext('webgl');

      if(!gl){
        alert('webgl not supported'); 
      }

      var test = process(json); 

      const vertexData = new Float32Array(test);
      console.log(vertexData);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      const vertexShader = gl.createShader(gl.VERTEX_SHADER)

      gl.shaderSource(vertexShader, `

      attribute vec3 position;

      void main() {

        gl_Position = vec4(position, 1);

      }

      `);

      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

      gl.shaderSource(fragmentShader, `
      
      void main(){

        gl_FragColor = vec4(1, 0.5, 0, 1);

      }

      `);

      gl.compileShader(fragmentShader);
      
      var compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
      if(!compiled){
        console.log(gl.getShaderInfoLog(fragmentShader));
      }
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (!linked) {
        console.log(gl.getProgramInfoLog(program));
      }
      const positionLocation = gl.getAttribLocation(program, `position`);

      gl.enableVertexAttribArray(positionLocation);

      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      gl.useProgram(program);
      gl.drawArrays(gl.LINES, 0, test.length/3);
      console.log(test.length/3);
        
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
