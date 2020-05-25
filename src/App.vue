<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<style>
  * { box-sizing: border-box }
  body{ 
    height: 100%;
    width: 100%
  }
  canvas {
    position: absolute;

    width: 100%;
    height: 100%;

    top: 0;
    left: 0;
  }
</style>
<script>
import { renderMap } from './lib/renderer';
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
      renderMap(canvas, json);
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
