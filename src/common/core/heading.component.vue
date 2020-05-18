<script>
  export default {
    name: 'core-heading',
    props: {
      heading: String,
      subheading: {
        type: String,
        default: ''
      }
    }
  }
</script>
    
<template>
  <div class="root">
    <div class="heading">
      {{ heading }}
    </div>
    <div class="subheading">
      {{ subheading }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .root {
    width: 100%;
    border-bottom: 1px solid #eee;
  }

  .heading {
    font-family: 'Segoe UI Bold', Helvetica, Arial, sans-serif;
    font-size: 36px;
    line-height: 45px;
    margin-top: 40px;
    margin-bottom: 10px;
    text-align: center;
  }

  .subheading {
    font-size: 17px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 15px;
    min-height: 24px;
  }
</style>