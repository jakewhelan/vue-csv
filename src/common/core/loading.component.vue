<script>
  export default {
    name: 'core-loading',
    props: {
      message: {
        type: String,
        default: 'Loading please wait...'
      }
    }
  }
</script>
    
<template>
  <div class="loading">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
    <div class="message">
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $color: #f5da55;

  .loading {
    width: 100%;
  }

  .message {
    width: 100%;
    text-align: center;
    height: 40px;
    display: block;
    color: #323330;
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 36px;
    line-height: 40px;
  }

  .sk-cube-grid {
    width: 200px;
    height: 200px;
    margin: 100px auto;
  }

  .sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: $color;
    float: left;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out; 
  }
  .sk-cube-grid .sk-cube1 {
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube2 {
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube3 {
    animation-delay: 0.4s;
  }
  .sk-cube-grid .sk-cube4 {
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube5 {
    animation-delay: 0.2s;
  }
  .sk-cube-grid .sk-cube6 {
    animation-delay: 0.3s;
  }
  .sk-cube-grid .sk-cube7 {
    animation-delay: 0s;
  }
  .sk-cube-grid .sk-cube8 {
    animation-delay: 0.1s;
  }
  .sk-cube-grid .sk-cube9 {
    animation-delay: 0.2s;
  }

  @keyframes sk-cubeGridScaleDelay {
    0%, 70%, 100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    } 
  }
</style>